"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { ApiError, NetworkError, cekPesananMerchandise, pesanMerchandise, type MerchOrder } from "@/lib/api";
import { KolomIsian } from "@/components/auth/KolomIsian";
import { useSesi } from "@/lib/auth-state";
import { rupiah } from "@/lib/katalog";
import { gabungKatalog, linkBayar, namaSku, useKatalogMerch, type DataSku } from "@/lib/merch";
import { kelasTombol } from "@/lib/tombol";
import { kosongkanKeranjangTersimpan, useKeranjangMerch } from "./keranjang-merch";

const KUNCI_PESANAN = "bkui-merch-order-key";
const KATEGORI = ["Siswa SMA/SMK/MA", "Gapyear / Pejuang SNBT", "Mahasiswa UI", "Umum"];
const SESI = ["Day 1 — Pagi", "Day 1 — Siang", "Day 2 — Pagi", "Day 2 — Siang", "Booth Pre-Event"];
const LABEL = "flex w-full flex-col gap-2 font-body text-sm font-medium leading-[1.35] text-bkui-teks";
const PILIHAN = "h-10 w-full min-w-0 rounded-lg border border-bkui-teks bg-transparent px-3 font-body text-sm font-medium text-bkui-teks focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bkui-hijau";
const SUBJUDUL = "font-ui text-[28px] font-semibold leading-[1.2] text-bkui-teks";
const BODY = "font-body text-xl font-medium leading-[1.2] text-bkui-teks";
const KECIL = "font-body text-sm font-medium leading-[1.35] text-bkui-teks";
const PANEL = "mx-auto flex w-full max-w-[900px] flex-col gap-6 rounded-3xl bg-bkui-krem-kartu p-5 text-bkui-teks shadow-md sm:p-8";

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
  const [diwakilkan, setDiwakilkan] = useState(false);

  if (katalog.jenis === "memuat" || !keranjang.siap) {
    return <p role="status" className={`${PANEL} ${BODY}`}>Memuat keranjang…</p>;
  }

  if (katalog.jenis === "galat") {
    return <p role="alert" className={`${PANEL} ${BODY}`}>Belum bisa memuat katalog merchandise. Coba muat ulang halaman.</p>;
  }

  const data = gabungKatalog(katalog.katalog);
  const semuaBaris = keranjang.isi.map((row) => ({ row, sku: data.sku.get(row.id) }));
  const baris = semuaBaris.filter((b): b is { row: (typeof keranjang.isi)[number]; sku: DataSku } => !!b.sku);
  const total = baris.reduce((sum, { row, sku }) => sum + sku.harga * row.jumlah, 0);
  const masalah = !data.dibuka
    ? "Pembelian merchandise belum dibuka."
    : semuaBaris.length === 0
      ? "Keranjangmu masih kosong."
      : baris.length < semuaBaris.length
        ? "Ada produk di keranjang yang sudah tidak tersedia."
        : baris.some(({ row, sku }) => sku.stok < row.jumlah)
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
        items: baris.map(({ row, sku }) => ({ sku: sku.sku, quantity: row.jumlah, expectedUnitPrice: sku.harga })),
        buyerName: kolom("buyerName"),
        buyerEmail: kolom("buyerEmail"),
        buyerPhone: kolom("buyerPhone"),
        buyerCategory: kolom("buyerCategory"),
        institution: kolom("institution") || undefined,
        pickupSession: kolom("pickupSession"),
        pickupName: diwakilkan ? kolom("pickupName") || undefined : undefined,
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
      <div className={`${PANEL} items-start`}>
        <p role="status" className={SUBJUDUL}>{masalah}</p>
        <Link href="/merchandise" className={kelasTombol("sekunder")}>Kembali ke Katalog</Link>
      </div>
    );
  }

  return (
    <form className={PANEL} onSubmit={kirim} aria-label="Checkout merchandise">
      {data.mode === "sandbox" && <p className={`${KECIL} font-semibold`}>Mode simulasi Midtrans · tanpa pembayaran asli</p>}

      <section aria-labelledby="judul-ringkasan" className="flex flex-col gap-4">
        <h2 id="judul-ringkasan" className={SUBJUDUL}>Ringkasan Pesanan</h2>
        <ul className="divide-y divide-bkui-coklat/20">
          {baris.map(({ row, sku }) => (
            <li key={sku.sku} className={`flex flex-wrap justify-between gap-2 py-3 ${BODY}`}>
              <span>{namaSku(sku)} × {row.jumlah}</span>
              <span>{rupiah(sku.harga * row.jumlah)}</span>
            </li>
          ))}
        </ul>
        <p className={`flex justify-between ${SUBJUDUL}`}>
          <span>Total</span>
          <span>{rupiah(total)}</span>
        </p>
        <Link href="/merchandise" className={`${kelasTombol("terang")} self-start`}>Ubah Keranjang</Link>
      </section>

      <section aria-labelledby="judul-pemesan" className="flex flex-col gap-4">
        <h2 id="judul-pemesan" className={SUBJUDUL}>Data Pemesan</h2>
        <p className={BODY}>Bayar dengan QRIS lewat Midtrans dalam 20 menit. Setelah lunas, kamu mendapat QR pengambilan untuk ditunjukkan di booth merch saat main event.</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <KolomIsian label="Nama lengkap" name="buyerName" autoComplete="name" minLength={2} maxLength={50} defaultValue={user?.fullName ?? ""} required />
          <KolomIsian label="Email aktif" name="buyerEmail" type="email" autoComplete="email" maxLength={254} defaultValue={user?.email ?? ""} required />
          <KolomIsian label="Nomor WhatsApp / HP" name="buyerPhone" type="tel" inputMode="tel" autoComplete="tel" placeholder="08… atau +62…" maxLength={16} defaultValue={user?.phoneNumber ?? ""} required />
          <label className={LABEL}>Kategori pemesan
            <select className={PILIHAN} name="buyerCategory" defaultValue="" required>
              <option value="" disabled>Pilih kategori</option>
              {KATEGORI.map((v) => <option key={v}>{v}</option>)}
            </select>
          </label>
          <KolomIsian label="Asal sekolah / instansi (opsional)" name="institution" autoComplete="organization" maxLength={100} defaultValue={user?.institution ?? ""} />
          <label className={LABEL}>Sesi pengambilan
            <select className={PILIHAN} name="pickupSession" defaultValue="" required>
              <option value="" disabled>Pilih sesi</option>
              {SESI.map((v) => <option key={v}>{v}</option>)}
            </select>
          </label>
          <div className="flex flex-col gap-3 sm:col-span-2">
            <label className={`${LABEL} flex-row items-center gap-3`}>
              <input type="checkbox" className="size-5 accent-bkui-oren" checked={diwakilkan} onChange={(e) => setDiwakilkan(e.target.checked)} />
              Pengambilan diwakilkan orang lain
            </label>
            {diwakilkan && (
              <KolomIsian label="Nama pengambil (sesuai identitas)" name="pickupName" autoComplete="off" minLength={2} maxLength={100} required />
            )}
          </div>
          <label className={`${LABEL} sm:col-span-2`}>Catatan (opsional)
            <textarea className={`${PILIHAN} h-auto py-2`} name="notes" maxLength={500} rows={3} />
          </label>
        </div>
      </section>

      {galat && <p role="alert" className={`rounded-xl border border-bkui-galat/30 bg-white/70 px-4 py-3 ${KECIL} font-semibold text-bkui-galat`}>{galat}</p>}
      <button className={`${kelasTombol("sekunder", "besar")} w-full`} type="submit" disabled={mengirim} aria-busy={mengirim}>
        {mengirim ? "Menyiapkan pembayaran…" : `Bayar ${rupiah(total)} dengan QRIS`}
      </button>
    </form>
  );
}
