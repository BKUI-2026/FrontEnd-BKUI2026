"use client";

import { useEffect, useState } from "react";
import { PRODUK } from "@/lib/merch-content";

const STORAGE_KEY = "bkui-merch-cart-preview";
export const BATAS_JUMLAH = 99;
export interface IsiKeranjang { id: string; jumlah: number }

function bacaKeranjang(): IsiKeranjang[] {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    if (!Array.isArray(saved)) return [];
    const seen = new Set<string>();
    return saved.filter((row): row is IsiKeranjang => {
      if (!row || typeof row !== "object" ||
          typeof row.id !== "string" || seen.has(row.id) ||
          !PRODUK.some((p) => p.id === row.id) ||
          !Number.isInteger(row.jumlah) || row.jumlah < 1 || row.jumlah > BATAS_JUMLAH) return false;
      seen.add(row.id);
      return true;
    }).map(({ id, jumlah }) => ({ id, jumlah }));
  } catch {
    return [];
  }
}

export function useKeranjangMerch() {
  const [isi, setIsi] = useState<IsiKeranjang[]>([]);
  const [siap, setSiap] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsi(bacaKeranjang());
      setSiap(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!siap) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(isi));
    } catch {
      // Keranjang tetap dapat dipakai selama halaman terbuka.
    }
  }, [isi, siap]);

  const tambah = (id: string) => {
    setIsi((lama) => {
      const ada = lama.some((row) => row.id === id);
      return ada
        ? lama.map((row) => row.id === id ? { ...row, jumlah: Math.min(BATAS_JUMLAH, row.jumlah + 1) } : row)
        : [...lama, { id, jumlah: 1 }];
    });
  };

  const ubahJumlah = (id: string, jumlah: number) => {
    setIsi((lama) => lama.map((row) => row.id === id
      ? { ...row, jumlah: Math.max(1, Math.min(BATAS_JUMLAH, jumlah)) }
      : row));
  };

  const hapus = (id: string) => setIsi((lama) => lama.filter((row) => row.id !== id));
  return { isi, siap, tambah, ubahJumlah, hapus };
}
