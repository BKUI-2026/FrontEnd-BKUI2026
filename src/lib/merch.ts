"use client";

import { useEffect, useState } from "react";

import { ambilMerchandise, type MerchCatalog, type MerchOrder } from "@/lib/api";
import { PRODUK, SEMUA_VARIAN, type ProdukMerch } from "@/lib/merch-content";

export const STATUS_PESANAN = {
  PENDING: "Menunggu pembayaran",
  PAID: "Lunas · siap diambil",
  CLAIMED: "Sudah diambil",
  EXPIRED: "Kedaluwarsa",
  CANCELLED: "Dibatalkan",
  FAILED: "Gagal",
} satisfies Record<MerchOrder["status"], string>;

export const JAM_WIB = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Jakarta",
});

export type KeadaanKatalog =
  | { jenis: "memuat" }
  | { jenis: "galat" }
  | { jenis: "siap"; katalog: MerchCatalog };

export function useKatalogMerch() {
  const [keadaan, setKeadaan] = useState<KeadaanKatalog>({ jenis: "memuat" });

  useEffect(() => {
    let aktif = true;
    ambilMerchandise().then(
      (katalog) => aktif && setKeadaan({ jenis: "siap", katalog }),
      () => aktif && setKeadaan({ jenis: "galat" }),
    );
    return () => {
      aktif = false;
    };
  }, []);

  return keadaan;
}

/** Satu SKU yang bisa masuk keranjang, sudah digabung dengan data BE. */
export interface DataSku {
  sku: string;
  produk: ProdukMerch;
  /** Label varian, mis. "Pink · L"; kosong untuk produk tanpa varian. */
  label: string;
  harga: number;
  stok: number;
}

export interface KatalogTampil {
  /** Checkout bisa dipakai: Midtrans aktif DAN toko dibuka panitia. */
  dibuka: boolean;
  mode: MerchCatalog["mode"];
  produk: readonly ProdukMerch[];
  sku: ReadonlyMap<string, DataSku>;
}

/**
 * Menggabungkan katalog statis (nama, foto, varian) dengan data BE (harga,
 * stok, aktif). SKU yang tidak dikirim BE dianggap tidak dijual. Produk BE yang
 * tidak dikenal FE, mis. produk uji, tetap ditampilkan tanpa foto.
 */
export function gabungKatalog(katalog: MerchCatalog | null): KatalogTampil {
  const mode = katalog?.mode ?? "disabled";
  const dariBe = new Map((katalog?.products ?? []).map((p) => [p.sku, p]));
  const sku = new Map<string, DataSku>();

  for (const [kode, varian] of SEMUA_VARIAN) {
    const data = dariBe.get(kode);
    if (data) sku.set(kode, { ...varian, harga: data.price, stok: data.stock });
  }

  const produk: ProdukMerch[] = PRODUK.map((p) => {
    const milik = [...sku.values()].filter((s) => s.produk.id === p.id);
    if (milik.length === 0) return { ...p, stok: katalog ? 0 : null };
    return {
      ...p,
      harga: Math.min(...milik.map((s) => s.harga)),
      stok: milik.reduce((total, s) => total + s.stok, 0),
    };
  });

  for (const data of dariBe.values()) {
    if (SEMUA_VARIAN.has(data.sku)) continue;
    const tambahan: ProdukMerch = {
      id: data.sku,
      skuDasar: data.sku,
      nama: data.name,
      harga: data.price,
      stok: data.stock,
      deskripsi: data.testOnly ? "Produk simulasi untuk menguji pembayaran." : "",
      jumlahFoto: 1,
      varian: [],
    };
    produk.push(tambahan);
    sku.set(data.sku, { sku: data.sku, produk: tambahan, label: "", harga: data.price, stok: data.stock });
  }

  return { dibuka: mode !== "disabled" && !!katalog?.saleOpen, mode, produk, sku };
}

export function alasanTidakBisaDibeli(produk: ProdukMerch, katalog: KatalogTampil): string | null {
  if (!katalog.dibuka) return "Segera dibuka";
  if (produk.harga === null) return "Belum tersedia";
  if ((produk.stok ?? 0) <= 0) return "Stok habis";
  return null;
}

/** Nama yang ditampilkan di keranjang, checkout, dan riwayat. */
export function namaSku(data: Pick<DataSku, "produk" | "label">): string {
  return data.label ? `${data.produk.nama} · ${data.label}` : data.produk.nama;
}

export function linkBayar(order: MerchOrder): string | null {
  if (order.status !== "PENDING" || !order.paymentUrl || Date.now() >= Date.parse(order.expiresAt)) return null;
  try {
    const url = new URL(order.paymentUrl);
    const host = order.mode === "production" ? "app.midtrans.com" : "app.sandbox.midtrans.com";
    return url.protocol === "https:" && url.host === host && url.pathname.startsWith("/snap/") ? url.href : null;
  } catch {
    return null;
  }
}
