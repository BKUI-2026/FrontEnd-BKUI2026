"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import {
  ApiError,
  ambilMerchandise,
  cekPesananMerchandise,
  pesanMerchandise,
  type MerchCatalog,
  type MerchOrder,
} from "@/lib/api";
import { rupiah } from "@/lib/katalog";
import { KatalogMerch } from "./KatalogMerch";

const STORAGE_KEY = "bkui-merch-order-key";
const KATEGORI = ["Siswa SMA/SMK/MA", "Gapyear / Pejuang SNBT", "Mahasiswa UI", "Umum"];
const SESI = ["Day 1 — Pagi", "Day 1 — Siang", "Day 2 — Pagi", "Day 2 — Siang", "Booth Pre-Event"];
const STATUS = {
  PENDING: "Menunggu pembayaran",
  PAID: "Pembayaran lunas",
  EXPIRED: "Pesanan kedaluwarsa",
  CANCELLED: "Pesanan dibatalkan",
  FAILED: "Pembayaran gagal",
} satisfies Record<MerchOrder["status"], string>;
const JAM_WIB = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Jakarta",
});
const INPUT = "mt-1 w-full min-w-0 rounded-xl border border-bkui-hijau-tua/40 bg-white px-3 py-2.5 text-base text-bkui-teks";
const TOMBOL = "inline-flex min-h-11 items-center justify-center rounded-full bg-bkui-hijau-tua px-5 py-2.5 text-center font-ui font-semibold text-white disabled:opacity-60";
const PANEL = "mx-auto w-full max-w-[900px] rounded-3xl bg-bkui-krem-kartu p-5 text-bkui-teks sm:p-8";

function pesanGalat(error: unknown, fallback: string) {
  return error instanceof ApiError ? error.messages.join(" ") : fallback;
}

function linkBayar(order: MerchOrder, mode: MerchCatalog["mode"]) {
  if (order.status !== "PENDING" || !order.paymentUrl || mode === "disabled" || Date.now() >= Date.parse(order.expiresAt)) return null;
  try {
    const url = new URL(order.paymentUrl);
    const host = mode === "production" ? "app.midtrans.com" : "app.sandbox.midtrans.com";
    return url.protocol === "https:" && url.host === host && url.pathname.startsWith("/snap/") ? url.href : null;
  } catch {
    return null;
  }
}

export function CheckoutMerch() {
  const [catalog, setCatalog] = useState<MerchCatalog | null>(null);
  const [order, setOrder] = useState<MerchOrder | null>(null);
  const [key, setKey] = useState<string | null>(null);
  const [sku, setSku] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await ambilMerchandise();
      if (data.mode !== "disabled") {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          try {
            const current = await cekPesananMerchandise(saved);
            setOrder(current);
            setKey(saved);
          } catch (e) {
            if (!(e instanceof ApiError && e.status === 404)) throw e;
            localStorage.removeItem(STORAGE_KEY);
          }
        }
      }
      setCatalog(data);
    } catch {
      setCatalog(null);
      setError("Belum bisa memuat merchandise. Coba muat ulang.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Defer until after mount so the saved order is only read in the browser.
    const timer = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(timer);
  }, [load]);

  useEffect(() => {
    if (!key || order?.status !== "PENDING") return;
    let active = true;
    const timer = window.setInterval(() => {
      void cekPesananMerchandise(key).then((current) => {
        if (active) setOrder(current);
      }, () => {
        // Keep the last verified status while the connection recovers.
      });
    }, 5000);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, [key, order?.status]);

  const product = catalog?.products.find((p) => p.sku === sku && p.stock > 0)
    ?? catalog?.products.find((p) => p.stock > 0);
  const maxQuantity = Math.min(10, product?.stock ?? 0);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!catalog || !product || submitting || quantity < 1 || quantity > maxQuantity) return;

    const values = new FormData(event.currentTarget);
    const field = (name: string) => String(values.get(name) ?? "").trim();
    let checkoutKey: string;
    try {
      checkoutKey = localStorage.getItem(STORAGE_KEY) ?? crypto.randomUUID();
      localStorage.setItem(STORAGE_KEY, checkoutKey);
    } catch {
      setError("Aktifkan penyimpanan browser sebelum membuat pesanan.");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      const created = await pesanMerchandise(checkoutKey, {
        sku: product.sku, quantity, expectedUnitPrice: product.price,
        buyerName: field("buyerName"), buyerEmail: field("buyerEmail"),
        buyerPhone: field("buyerPhone"), buyerCategory: field("buyerCategory"),
        institution: field("institution") || undefined,
        pickupSession: field("pickupSession"), pickupName: field("pickupName") || undefined,
        notes: field("notes") || undefined,
      });
      setOrder(created);
      setKey(checkoutKey);
      const url = linkBayar(created, catalog.mode);
      if (url) window.location.assign(url);
    } catch (e) {
      // If the request reached the backend but the response was lost, reuse
      // the stored key and recover the original reservation.
      try {
        setOrder(await cekPesananMerchandise(checkoutKey));
        setKey(checkoutKey);
      } catch (statusError) {
        if (statusError instanceof ApiError && statusError.status === 404 &&
            e instanceof ApiError && [400, 404, 409, 429].includes(e.status)) {
          localStorage.removeItem(STORAGE_KEY);
          if (e.status === 409) void ambilMerchandise().then(setCatalog, () => {});
        }
      }
      setError(pesanGalat(e, "Belum bisa membuat pesanan. Coba lagi untuk memeriksa pesanan yang sama."));
    } finally {
      setSubmitting(false);
    }
  }

  async function pesananBaru() {
    localStorage.removeItem(STORAGE_KEY);
    setOrder(null);
    setKey(null);
    setSku("");
    setQuantity(1);
    await load();
  }

  if (loading) return <p role="status" className={PANEL}>Memuat merchandise…</p>;
  if (catalog?.mode === "disabled") return <KatalogMerch />;
  if (!catalog) {
    return (
      <div className={PANEL}>
        <p role="alert">{error}</p>
        <button type="button" className={`${TOMBOL} mt-4`} onClick={() => void load()}>Muat ulang</button>
      </div>
    );
  }

  if (order) {
    const url = linkBayar(order, catalog.mode);
    return (
      <section className={PANEL} aria-label="Status pesanan merchandise">
        {catalog.mode === "sandbox" && <p className="mb-2 text-sm font-bold">Simulasi Midtrans · tanpa pembayaran asli</p>}
        <h2 className="font-ui text-2xl font-extrabold" aria-live="polite">{STATUS[order.status]}</h2>
        <p className="mt-2">{order.productName} × {order.quantity} · {rupiah(order.grossAmount)}</p>
        <p className="mt-1 break-all text-sm">Nomor pesanan: {order.id}</p>
        <p className="mt-1 text-sm">Pengambilan: {order.pickupSession}</p>
        {order.status === "PENDING" && (
          <p className="mt-3">
            Batas bayar: {JAM_WIB.format(new Date(order.expiresAt))} WIB.
            {!url && " Sistem sedang memeriksa status pembayaran."}
          </p>
        )}
        {error && <p role="alert" className="mt-3 text-bkui-galat">{error}</p>}
        {url && <a className={`${TOMBOL} mt-5`} href={url}>Lanjut bayar QRIS</a>}
        {order.status !== "PENDING" && (
          <button type="button" className={`${TOMBOL} mt-5`} onClick={() => void pesananBaru()}>Buat pesanan baru</button>
        )}
      </section>
    );
  }

  if (!product) {
    return (
      <div className={PANEL}>
        <p>{catalog.products.length ? "Stok merchandise sedang habis." : "Katalog merchandise belum tersedia."}</p>
        <button type="button" className={`${TOMBOL} mt-4`} onClick={() => void load()}>Muat ulang katalog</button>
      </div>
    );
  }

  return (
    <form className={PANEL} onSubmit={submit} aria-label="Checkout merchandise">
      {catalog.mode === "sandbox" && <p className="mb-2 text-sm font-bold">Simulasi Midtrans · tanpa pembayaran asli</p>}
      <h2 className="font-ui text-2xl font-extrabold">Pesan Merchandise</h2>
      <p className="mt-2">Bayar dengan QRIS lewat Midtrans dalam 20 menit. Ambil pesanan di booth BKUI.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label>Produk
          <select className={INPUT} value={product.sku} onChange={(e) => { setSku(e.target.value); setQuantity(1); }}>
            {catalog.products.map((p) => <option key={p.sku} value={p.sku} disabled={!p.stock}>{p.name} · {rupiah(p.price)}{p.stock ? "" : " (habis)"}</option>)}
          </select>
        </label>
        <label>Jumlah
          <input className={INPUT} type="number" min={1} max={maxQuantity} value={quantity || ""} onChange={(e) => setQuantity(Number(e.target.value))} required />
        </label>
        <label>Nama lengkap
          <input className={INPUT} name="buyerName" autoComplete="name" minLength={2} maxLength={50} required />
        </label>
        <label>Email aktif
          <input className={INPUT} name="buyerEmail" type="email" autoComplete="email" maxLength={254} required />
        </label>
        <label>Nomor WhatsApp / HP
          <input className={INPUT} name="buyerPhone" type="tel" autoComplete="tel" placeholder="08… atau +62…" maxLength={16} required />
        </label>
        <label>Kategori pemesan
          <select className={INPUT} name="buyerCategory" defaultValue="" required>
            <option value="" disabled>Pilih kategori</option>
            {KATEGORI.map((v) => <option key={v}>{v}</option>)}
          </select>
        </label>
        <label>Asal sekolah / instansi (opsional)
          <input className={INPUT} name="institution" autoComplete="organization" maxLength={100} />
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
      <p className="mt-6 font-ui text-xl font-bold">Total: {rupiah(product.price * quantity)}</p>
      {error && <p role="alert" className="mt-3 text-bkui-galat">{error}</p>}
      <button className={`${TOMBOL} mt-4`} type="submit" disabled={submitting || !maxQuantity}>
        {submitting ? "Menyiapkan pembayaran…" : "Bayar dengan QRIS"}
      </button>
    </form>
  );
}
