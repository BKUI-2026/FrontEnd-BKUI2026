"use client";

import { motion, useReducedMotion } from "framer-motion";

import { FILTER_RUMPUN, type FilterRumpun as Filter } from "@/lib/explore-content";
import { SENTUHAN } from "./gerak";

interface FilterRumpunProps {
  aktif: Filter;
  onPilih: (filter: Filter) => void;
}

/**
 * Bilah penyaring fakultas per rumpun: Semua / Saintek / Soshum / Vokasi.
 *
 * ---------------------------------------------------------------------------
 * Kenapa tombol biasa, bukan `role="tablist"`
 * ---------------------------------------------------------------------------
 * Pola tab ARIA menjanjikan satu panel per tab dan navigasi panah kiri-kanan.
 * Yang terjadi di sini bukan itu: satu daftar yang isinya disaring. Memakai
 * peran tab berarti menjanjikan perilaku yang tidak ada. Jadi ini sekelompok
 * tombol dengan `aria-pressed` — screen reader membacanya sebagai "tertekan"
 * atau tidak, yang memang persis keadaannya.
 *
 * ---------------------------------------------------------------------------
 * Pil oranye yang bergeser
 * ---------------------------------------------------------------------------
 * Latar tombol aktif bukan kelas yang dipindah-pindah, melainkan SATU elemen
 * ber-`layoutId` yang dipindahkan Framer Motion dari tombol lama ke tombol
 * baru. Hasilnya pilnya meluncur, dan luncuran itu membawa informasi: mata
 * mengikuti dari pilihan sebelumnya ke pilihan sekarang, bukan kehilangan
 * jejak karena warnanya tiba-tiba pindah tempat.
 */
export function FilterRumpun({ aktif, onPilih }: FilterRumpunProps) {
  const kurangiGerak = useReducedMotion();

  return (
    <div
      role="group"
      aria-label="Saring fakultas berdasarkan rumpun"
      className="flex w-full items-center gap-2 rounded-2xl bg-gradient-to-b from-bkui-kartu-atas to-bkui-kartu-bawah p-2 sm:gap-4 sm:rounded-3xl sm:px-8 sm:py-4"
    >
      {FILTER_RUMPUN.map((rumpun) => {
        const dipilih = rumpun === aktif;

        return (
          <motion.button
            key={rumpun}
            type="button"
            aria-pressed={dipilih}
            onClick={() => onPilih(rumpun)}
            // Sentuhan kecil saja: tombol yang mengembang besar saat disentuh
            // terasa seperti mainan, bukan kontrol.
            whileHover={kurangiGerak ? undefined : { scale: 1.03 }}
            whileTap={kurangiGerak ? undefined : { scale: 0.97 }}
            transition={SENTUHAN}
            className="relative flex flex-1 cursor-pointer items-center justify-center rounded-xl px-2 py-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bkui-hijau sm:px-4 sm:py-5"
          >
            {dipilih && (
              <motion.span
                aria-hidden
                layoutId="pil-rumpun-aktif"
                className="absolute inset-0 rounded-xl bg-bkui-oren-muda"
                transition={kurangiGerak ? { duration: 0 } : SENTUHAN}
              />
            )}
            <span className="relative font-ui text-sm font-medium capitalize text-black sm:text-lg lg:text-xl">
              {rumpun}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
