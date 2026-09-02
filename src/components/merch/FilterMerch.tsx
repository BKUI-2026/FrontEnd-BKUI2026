"use client";

import Image from "next/image";

import { KATEGORI, type Kategori } from "@/lib/merch-content";

interface FilterMerchProps {
  terpilih: readonly Kategori[];
  onUbah: (kategori: Kategori) => void;
}

/**
 * Panel penyaring kategori merchandise.
 *
 * Pakai `<input type="checkbox">` sungguhan, bukan `<div>` yang digambar mirip
 * kotak centang. Kotak asli sudah membawa perilaku yang benar secara gratis:
 * bisa difokus dan ditekan spasi lewat keyboard, dibacakan screen reader
 * sebagai "tercentang/tidak", dan ikut mode kontras tinggi di OS.
 *
 * Tampilannya diambil alih lewat `appearance-none` + `checked:` supaya tetap
 * sama dengan Figma: kotak 16px bergaris oranye, radius 2px.
 *
 * Beberapa kategori boleh dipilih sekaligus (di Figma memang kotak centang,
 * bukan radio). Tanpa satupun terpilih berarti tampilkan semua — bukan
 * "sembunyikan semua", karena katalog kosong saat halaman dibuka tidak masuk
 * akal.
 */
export function FilterMerch({ terpilih, onUbah }: FilterMerchProps) {
  return (
    <fieldset className="rounded-3xl bg-bkui-krem-kartu px-6 py-7 drop-shadow-[0_4px_2px_rgba(0,0,0,0.1)]">
      <legend className="sr-only">Saring merchandise berdasarkan kategori</legend>

      <div className="flex items-center gap-3">
        <Image
          src="/icon/merch/filter.svg"
          alt=""
          aria-hidden
          width={24}
          height={24}
          className="size-6"
        />
        <span aria-hidden className="font-ui text-2xl font-semibold leading-[1.2] text-bkui-teks lg:text-[28px]">
          Filter
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 px-2 lg:flex-col lg:flex-nowrap">
        {KATEGORI.map((kategori) => (
          <label
            key={kategori}
            className="flex cursor-pointer items-center gap-3 font-ui text-lg font-medium capitalize text-bkui-teks lg:text-xl"
          >
            <input
              type="checkbox"
              checked={terpilih.includes(kategori)}
              onChange={() => onUbah(kategori)}
              className="size-4 shrink-0 cursor-pointer appearance-none rounded-[2px] border-2 border-bkui-oren bg-transparent checked:bg-bkui-oren focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bkui-hijau"
            />
            {kategori}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
