"use client";

import { useEffect, useRef, useState } from "react";
import { PRODUK } from "@/lib/merch-content";
import { BATAS_JUMLAH, type IsiKeranjang } from "./keranjang-merch";

interface KeranjangProps {
  isi: readonly IsiKeranjang[];
  onUbahJumlah: (id: string, jumlah: number) => void;
  onHapus: (id: string) => void;
  onTutup: () => void;
}

const KONTROL = "inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-bkui-coklat/30 font-ui text-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bkui-hijau disabled:opacity-40";

export function KeranjangMerch({ isi, onUbahJumlah, onHapus, onTutup }: KeranjangProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [error, setError] = useState(false);
  const jumlah = isi.reduce((total, row) => total + row.jumlah, 0);

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
            {isi.map((row) => {
              const produk = PRODUK.find((p) => p.id === row.id);
              if (!produk) return null;
              return (
                <li key={row.id} className="flex flex-wrap items-center justify-between gap-4 py-5">
                  <div className="min-w-0 flex-1 basis-[200px]">
                    <h3 className="font-ui text-lg font-semibold">{produk.nama}</h3>
                    <p className="mt-1 text-sm">Harga segera diumumkan</p>
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
          <p className="mt-4 font-ui font-semibold">Total menunggu katalog resmi.</p>
          {error && <p role="alert" className="mt-4 rounded-xl border border-bkui-galat/30 bg-white/70 px-4 py-3 font-ui font-semibold text-bkui-galat">7001 Insufficient privileges</p>}
          <button
            type="button"
            onClick={() => setError(true)}
            className="tombol-kertas mt-5 min-h-12 w-full rounded-full bg-gradient-to-b from-bkui-oren to-bkui-oren-muda px-6 py-3 font-ui text-lg font-medium"
          >
            Checkout
          </button>
        </>
      )}
    </dialog>
  );
}
