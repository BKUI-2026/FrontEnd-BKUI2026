"use client";

import { useEffect, useRef } from "react";
import { rupiah } from "@/lib/katalog";
import type { Produk } from "@/lib/merch-content";
import { BATAS_JUMLAH, type IsiKeranjang } from "./keranjang-merch";

interface KeranjangProps {
  produk: readonly Produk[];
  dibuka: boolean;
  isi: readonly IsiKeranjang[];
  onCheckout: () => void;
  onUbahJumlah: (id: string, jumlah: number) => void;
  onHapus: (id: string) => void;
  onTutup: () => void;
}

const KONTROL = "inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-bkui-coklat/30 font-ui text-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bkui-hijau disabled:opacity-40";

export function KeranjangMerch({ produk: daftarProduk, dibuka, isi, onCheckout, onUbahJumlah, onHapus, onTutup }: KeranjangProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const jumlah = isi.reduce((total, row) => total + row.jumlah, 0);
  const baris = isi.map((row) => ({ row, produk: daftarProduk.find((p) => p.id === row.id) }));
  const total = baris.reduce((sum, { row, produk }) => sum + (produk?.harga ?? 0) * row.jumlah, 0);
  const masalah = !dibuka
    ? "Pembelian merchandise belum dibuka."
    : baris.some(({ produk }) => produk?.harga == null)
      ? "Ada produk yang belum punya harga. Hapus dulu dari keranjang."
      : baris.some(({ row, produk }) => (produk?.stok ?? 0) < row.jumlah)
        ? "Ada produk yang stoknya kurang dari jumlah di keranjang."
        : null;

  useEffect(() => {
    const node = dialog.current;
    node?.showModal();
    return () => node?.close();
  }, []);

  return (
    <dialog
      ref={dialog}
      aria-labelledby="judul-keranjang"
      onClose={() => { if (!dialog.current?.open) onTutup(); }}
      onCancel={onTutup}
      onClick={(event) => { if (event.target === event.currentTarget) onTutup(); }}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-[720px] overflow-y-auto overscroll-contain rounded-3xl bg-bkui-krem-kartu p-5 text-bkui-coklat shadow-xl backdrop:bg-black/50 sm:p-8"
    >
      <div className="flex items-center justify-between gap-3">
        <h2 id="judul-keranjang" className="font-display text-2xl sm:text-3xl">Keranjang ({jumlah})</h2>
        <button type="button" className={KONTROL} onClick={onTutup} aria-label="Tutup keranjang">×</button>
      </div>

      {isi.length === 0 ? (
        <p className="py-10 text-center font-body">Keranjang masih kosong.</p>
      ) : (
        <>
          <ul className="mt-6 divide-y divide-bkui-coklat/20">
            {baris.map(({ row, produk }) => {
              if (!produk) return null;
              return (
                <li key={row.id} className="flex flex-wrap items-center justify-between gap-4 py-5">
                  <div className="min-w-0 flex-1 basis-[200px]">
                    <h3 className="font-ui text-lg font-semibold">{produk.nama}</h3>
                    <p className="mt-1 text-sm">
                      {produk.harga === null ? "Harga segera diumumkan" : `${rupiah(produk.harga)} × ${row.jumlah} = ${rupiah(produk.harga * row.jumlah)}`}
                    </p>
                    {produk.stok !== null && produk.stok < row.jumlah && (
                      <p className="mt-1 text-sm font-semibold text-bkui-galat">Sisa stok {produk.stok}</p>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button type="button" className={KONTROL} disabled={row.jumlah === 1} aria-label={`Kurangi ${produk.nama}`} onClick={() => onUbahJumlah(row.id, row.jumlah - 1)}>−</button>
                    <output aria-label={`Jumlah ${produk.nama}`} className="min-w-6 text-center font-ui font-semibold">{row.jumlah}</output>
                    <button type="button" className={KONTROL} disabled={row.jumlah >= BATAS_JUMLAH} aria-label={`Tambah jumlah ${produk.nama}`} onClick={() => onUbahJumlah(row.id, row.jumlah + 1)}>+</button>
                    <button type="button" className="min-h-11 rounded-full px-3 font-ui text-sm underline" aria-label={`Hapus ${produk.nama}`} onClick={() => onHapus(row.id)}>Hapus</button>
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="mt-4 font-ui text-lg font-semibold">
            {dibuka && !masalah ? `Total: ${rupiah(total)}` : "Total menyusul setelah harga tersedia."}
          </p>
          {masalah && <p role="status" className="mt-4 rounded-xl border border-bkui-coklat/20 bg-white/70 px-4 py-3 font-ui font-semibold">{masalah}</p>}
          <button
            type="button"
            onClick={onCheckout}
            disabled={masalah !== null}
            className="tombol-kertas mt-5 min-h-12 w-full rounded-full bg-gradient-to-b from-bkui-oren to-bkui-oren-muda px-6 py-3 font-ui text-lg font-medium disabled:cursor-not-allowed disabled:opacity-60"
          >
            Checkout
          </button>
        </>
      )}
    </dialog>
  );
}
