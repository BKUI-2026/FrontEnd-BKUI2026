"use client";

import { useEffect, useState } from "react";

import { ambilMerchandise, type MerchCatalog, type MerchOrder } from "@/lib/api";
import { PRODUK, type Produk } from "@/lib/merch-content";

export const STATUS_PESANAN = {
  PENDING: "Menunggu pembayaran",
  PAID: "Lunas",
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

export function gabungKatalog(katalog: MerchCatalog | null): readonly Produk[] {
  if (!katalog || katalog.mode === "disabled") return PRODUK;
  return PRODUK.map((produk) => {
    const data = katalog.products.find((p) => p.sku === produk.id);
    return data ? { ...produk, harga: data.price, stok: data.stock } : produk;
  });
}

export function bisaDibeli(produk: Produk, katalog: MerchCatalog | null): boolean {
  return !!katalog && katalog.mode !== "disabled" && produk.harga !== null && (produk.stok ?? 0) > 0;
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
