"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { rupiah } from "@/lib/katalog";
import { kelasTombol } from "@/lib/tombol";
import { namaSku, type KatalogTampil } from "@/lib/merch";
import { BATAS_JUMLAH, type IsiKeranjang } from "./keranjang-merch";

interface KeranjangProps {
  katalog: KatalogTampil;
  isi: readonly IsiKeranjang[];
  onCheckout: () => void;
  onUbahJumlah: (id: string, jumlah: number) => void;
  onHapus: (id: string) => void;
  onTutup: () => void;
}

const KONTROL = "inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-bkui-coklat/30 font-ui text-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bkui-hijau disabled:opacity-40";

export function KeranjangMerch({ katalog, isi, onCheckout, onUbahJumlah, onHapus, onTutup }: KeranjangProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const jumlah = isi.reduce((total, row) => total + row.jumlah, 0);
  const dibuka = katalog.dibuka;
  const baris = isi.map((row) => ({ row, data: katalog.sku.get(row.id) }));
  const total = baris.reduce((sum, { row, data }) => sum + (data?.harga ?? 0) * row.jumlah, 0);
  const masalah = !dibuka
    ? "Pembelian merchandise belum dibuka. Pantau Instagram @bkui.official untuk jadwalnya."
    : baris.some(({ data }) => !data)
      ? "Ada produk yang sudah tidak tersedia. Hapus dulu dari keranjang."
      : baris.some(({ row, data }) => (data?.stok ?? 0) < row.jumlah)
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
            {baris.map(({ row, data }) => {
              if (!data) {
                return (
                  <li key={row.id} className="flex items-center justify-between gap-4 py-5">
                    <p className="font-ui font-semibold">Produk {row.id} sudah tidak tersedia</p>
                    <button type="button" className="min-h-11 rounded-full px-3 font-ui text-sm underline" onClick={() => onHapus(row.id)}>Hapus</button>
                  </li>
                );
              }
              const produk = { nama: namaSku(data) };
              const foto = data.produk.foto?.[0];
              return (
                <li key={row.id} className="flex flex-wrap items-center justify-between gap-4 py-5">
                  {foto && <Image src={foto} alt="" width={64} height={64} className="size-16 shrink-0 rounded-xl bg-white object-contain p-1" />}
                  <div className="min-w-0 flex-1 basis-[180px]">
                    <h3 className="font-ui text-lg font-semibold">{produk.nama}</h3>
                    <p className="mt-1 text-sm">
                      {`${rupiah(data.harga)} × ${row.jumlah} = ${rupiah(data.harga * row.jumlah)}`}
                    </p>
                    {data.stok < row.jumlah && (
                      <p className="mt-1 text-sm font-semibold text-bkui-galat">Sisa stok {data.stok}</p>
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
          <p className="mt-4 font-ui text-[28px] font-semibold leading-[1.2]">
            {dibuka && !masalah ? `Total: ${rupiah(total)}` : "Total dihitung saat penjualan dibuka."}
          </p>
          {masalah && <p role="status" className="mt-4 rounded-xl border border-bkui-coklat/20 bg-white/70 px-4 py-3 font-body text-sm font-medium leading-[1.35]">{masalah}</p>}
          <button
            type="button"
            onClick={onCheckout}
            disabled={masalah !== null}
            className={`${kelasTombol("sekunder", "besar")} mt-5 w-full`}
          >
            Checkout
          </button>
        </>
      )}
    </dialog>
  );
}
