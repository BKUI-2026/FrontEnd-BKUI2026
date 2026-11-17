"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { ApiError, NetworkError, cekPesananMerchandise, pesanMerchandise, type MerchOrder } from "@/lib/api";
import { useSesi } from "@/lib/auth-state";
import { rupiah } from "@/lib/katalog";
import { gabungKatalog, linkBayar, useKatalogMerch } from "@/lib/merch";
import { kosongkanKeranjangTersimpan, useKeranjangMerch } from "./keranjang-merch";

const KUNCI_PESANAN = "bkui-merch-order-key";
const KATEGORI = ["Siswa SMA/SMK/MA", "Gapyear / Pejuang SNBT", "Mahasiswa UI", "Umum"];
const SESI = ["Day 1 — Pagi", "Day 1 — Siang", "Day 2 — Pagi", "Day 2 — Siang", "Booth Pre-Event"];
const INPUT = "mt-1 w-full min-w-0 rounded-xl border border-bkui-hijau-tua/40 bg-white px-3 py-2.5 text-base text-bkui-teks";
const TOMBOL = "tombol-kertas inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-b from-bkui-oren to-bkui-oren-muda px-6 py-3 text-center font-ui text-lg font-medium text-bkui-coklat disabled:cursor-wait disabled:opacity-60";
const PANEL = "mx-auto w-full max-w-[900px] rounded-3xl bg-bkui-krem-kartu p-5 text-bkui-teks shadow-md sm:p-8";

function pesanGalat(error: unknown) {
  if (error instanceof ApiError) return error.messages.join(" ");
  if (error instanceof NetworkError) return error.message;
  return "Belum bisa membuat pesanan. Coba lagi.";
}

function ambilKunci(): string | null {
  try {
    const kunci = localStorage.getItem(KUNCI_PESANAN) ?? crypto.randomUUID();
    localStorage.setItem(KUNCI_PESANAN, kunci);
    return kunci;
  } catch {
    return null;
  }
}

function lupakanKunci() {
  try {
    localStorage.removeItem(KUNCI_PESANAN);
  } catch {
    // Kunci akan dibuat ulang di percobaan berikutnya.
  }
}

export function CheckoutMerch() {
  const router = useRouter();
  const { user } = useSesi();
  const katalog = useKatalogMerch();
  const keranjang = useKeranjangMerch();
  const [mengirim, setMengirim] = useState(false);
  const [galat, setGalat] = useState("");

  if (katalog.jenis === "memuat" || !keranjang.siap) {
    return <p role="status" className={PANEL}>Memuat keranjang…</p>;
  }

  if (katalog.jenis === "galat") {
    return <p role="alert" className={PANEL}>Belum bisa memuat katalog merchandise. Coba muat ulang halaman.</p>;
  }

  const data = katalog.katalog;
  const produk = gabungKatalog(data);
  const semuaBaris = keranjang.isi.map((row) => ({ row, produk: produk.find((p) => p.id === row.id) }));
  const baris = semuaBaris.filter((b): b is { row: (typeof keranjang.isi)[number]; produk: (typeof produk)[number] } => !!b.produk);
  const total = baris.reduce((sum, { row, produk: p }) => sum + (p.harga ?? 0) * row.jumlah, 0);
  const masalah = data.mode === "disabled"
    ? "Pembelian merchandise belum dibuka."
    : semuaBaris.length === 0
      ? "Keranjangmu masih kosong."
      : baris.length < semuaBaris.length
        ? "Ada produk di keranjang yang sudah tidak tersedia."
      : baris.some(({ produk: p }) => p.harga === null)
        ? "Ada produk yang belum punya harga."
        : baris.some(({ row, produk: p }) => (p.stok ?? 0) < row.jumlah)
          ? "Ada produk yang stoknya kurang dari jumlah di keranjang."
          : null;

  function selesai(order: MerchOrder) {
    lupakanKunci();
    kosongkanKeranjangTersimpan();
    keranjang.kosongkan();
    const url = linkBayar(order);
    if (url) window.location.assign(url);
    else router.push(`/pesanan?id=${encodeURIComponent(order.id)}`);
  }

  async function kirim(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (masalah || mengirim) return;

    const kunci = ambilKunci();
    if (!kunci) {
      setGalat("Aktifkan penyimpanan browser sebelum membuat pesanan.");
      return;
    }

    const isian = new FormData(event.currentTarget);
    const kolom = (nama: string) => String(isian.get(nama) ?? "").trim();

    setMengirim(true);
    setGalat("");
    try {
      selesai(await pesanMerchandise(kunci, {
        items: baris.map(({ row, produk: p }) => ({ sku: p.id, quantity: row.jumlah, expectedUnitPrice: p.harga ?? 0 })),
        buyerName: kolom("buyerName"),
        buyerEmail: kolom("buyerEmail"),
        buyerPhone: kolom("buyerPhone"),
        buyerCategory: kolom("buyerCategory"),
        institution: kolom("institution") || undefined,
        pickupSession: kolom("pickupSession"),
        pickupName: kolom("pickupName") || undefined,
        notes: kolom("notes") || undefined,
      }));
      return;
    } catch (error) {
      try {
        selesai(await cekPesananMerchandise(kunci));
        return;
      } catch (cekError) {
        if (cekError instanceof ApiError && cekError.status === 404) lupakanKunci();
      }
      setGalat(pesanGalat(error));
    }
    setMengirim(false);
  }

  if (masalah) {
    return (
      <div className={PANEL}>
        <p role="status" className="font-ui text-lg font-semibold">{masalah}</p>
        <Link href="/merchandise" className={`${TOMBOL} mt-5`}>Kembali ke katalog</Link>
      </div>
    );
  }

  return (
    <form className={PANEL} onSubmit={kirim} aria-label="Checkout merchandise">
      {data.mode === "sandbox" && <p className="mb-2 text-sm font-bold">Mode simulasi Midtrans · tanpa pembayaran asli</p>}

      <h2 className="font-ui text-2xl font-extrabold">Ringkasan Pesanan</h2>
      <ul className="mt-4 divide-y divide-bkui-coklat/20">
        {baris.map(({ row, produk: p }) => (
          <li key={p.id} className="flex flex-wrap justify-between gap-2 py-3">
            <span className="font-ui font-semibold">{p.nama} × {row.jumlah}</span>
            <span>{rupiah((p.harga ?? 0) * row.jumlah)}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 flex justify-between font-ui text-xl font-bold">
        <span>Total</span>
        <span>{rupiah(total)}</span>
      </p>
      <Link href="/merchandise" className="mt-2 inline-block font-ui text-sm underline">Ubah keranjang</Link>

      <h2 className="mt-8 font-ui text-2xl font-extrabold">Data Pemesan</h2>
      <p className="mt-2">Bayar dengan QRIS lewat Midtrans dalam 20 menit, lalu ambil pesanan di booth BKUI.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label>Nama lengkap
          <input className={INPUT} name="buyerName" autoComplete="name" minLength={2} maxLength={50} defaultValue={user?.fullName ?? ""} required />
        </label>
        <label>Email aktif
          <input className={INPUT} name="buyerEmail" type="email" autoComplete="email" maxLength={254} defaultValue={user?.email ?? ""} required />
        </label>
        <label>Nomor WhatsApp / HP
          <input className={INPUT} name="buyerPhone" type="tel" autoComplete="tel" placeholder="08… atau +62…" maxLength={16} defaultValue={user?.phoneNumber ?? ""} required />
        </label>
        <label>Kategori pemesan
          <select className={INPUT} name="buyerCategory" defaultValue="" required>
            <option value="" disabled>Pilih kategori</option>
            {KATEGORI.map((v) => <option key={v}>{v}</option>)}
          </select>
        </label>
        <label>Asal sekolah / instansi (opsional)
          <input className={INPUT} name="institution" autoComplete="organization" maxLength={100} defaultValue={user?.institution ?? ""} />
        </label>
        <label>Sesi pengambilan
          <select className={INPUT} name="pickupSession" defaultValue="" required>
            <option value="" disabled>Pilih sesi</option>
            {SESI.map((v) => <option key={v}>{v}</option>)}
          </select>
        </label>
        <label className="sm:col-span-2">Nama pengambil jika diwakilkan (opsional)
          <input className={INPUT} name="pickupName" maxLength={100} />
        </label>
        <label className="sm:col-span-2">Catatan (opsional)
          <textarea className={INPUT} name="notes" maxLength={500} rows={2} />
        </label>
      </div>

      {galat && <p role="alert" className="mt-4 rounded-xl border border-bkui-galat/30 bg-white/70 px-4 py-3 font-ui font-semibold text-bkui-galat">{galat}</p>}
      <button className={`${TOMBOL} mt-6 w-full`} type="submit" disabled={mengirim} aria-busy={mengirim}>
        {mengirim ? "Menyiapkan pembayaran…" : `Bayar ${rupiah(total)} dengan QRIS`}
      </button>
    </form>
  );
}
