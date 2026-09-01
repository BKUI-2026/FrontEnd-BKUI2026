"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { SENTUHAN } from "./gerak";

/**
 * Carousel foto fakultas — bingkai persegi + titik navigasi di bawahnya.
 *
 * FOTONYA BELUM ADA. Di Figma pun bingkainya masih kosong, dan foto fakultas
 * termasuk konten yang dikelola Admin (endpoint `Content` belum tersedia).
 * Jadi yang dibangun di sini kerangkanya: jumlah slide, perpindahan, dan
 * titik navigasinya sudah jalan, tinggal isinya diganti `<Image>` sungguhan
 * begitu datanya turun.
 *
 * Slide kosongnya diberi label "Foto menyusul" — kotak yang benar-benar kosong
 * terbaca sebagai gambar gagal dimuat, bukan sebagai konten yang belum ada.
 *
 * ---------------------------------------------------------------------------
 * Kenapa bingkainya SVG, bukan `border` CSS
 * ---------------------------------------------------------------------------
 * Garis tepinya di Figma bukan garis rata: tebalnya berubah dan sudutnya
 * digambar tangan (`Rectangle 797 (Stroke)`). `border` CSS selalu rata, jadi
 * hasilnya akan kehilangan karakter gambar tangan yang jadi ciri desain ini.
 */
export function KaruselFoto({ jumlah, namaFakultas }: { jumlah: number; namaFakultas: string }) {
  const [aktif, setAktif] = useState(0);
  const kurangiGerak = useReducedMotion();

  return (
    <div className="flex w-full max-w-[400px] flex-col items-center gap-4">
      {/*
        `aspect-square` memesan ruangnya lebih dulu, jadi bingkai dan titiknya
        tidak melompat saat slide berganti — perpindahan slide di dalam kotak
        yang ukurannya sudah pasti tidak menggeser apapun di sekitarnya.
      */}
      <div
        className="relative aspect-square w-full overflow-hidden rounded-3xl"
        aria-live="polite"
        aria-label={`Foto ${namaFakultas}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={aktif}
            className="absolute inset-0 flex items-center justify-center"
            initial={kurangiGerak ? false : { opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={kurangiGerak ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <span className="font-ui text-sm text-bkui-teks/45">Foto menyusul</span>
          </motion.div>
        </AnimatePresence>

        {/* Bingkai digambar di atas isinya supaya garisnya tidak ikut terpotong. */}
        <Image
          src="/icon/explore/bingkai-foto.svg"
          alt=""
          aria-hidden
          fill
          sizes="(min-width: 1024px) 400px, 90vw"
          className="pointer-events-none"
        />
      </div>

      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: jumlah }, (_, i) => {
          const dipilih = i === aktif;

          return (
            <motion.button
              key={i}
              type="button"
              onClick={() => setAktif(i)}
              aria-label={`Foto ke-${i + 1} dari ${jumlah}`}
              aria-current={dipilih}
              whileTap={kurangiGerak ? undefined : { scale: 0.85 }}
              /*
               * Titik aktif MELEBAR, bukan berganti warna. Lebar terbaca
               * sekilas tanpa perlu membedakan dua nuansa cokelat yang mirip,
               * termasuk oleh mata yang sulit membedakan warna.
               *
               * Ini SATU-SATUNYA animasi `width` di halaman ini, dan sengaja.
               * Aturan umumnya cuma menganimasi transform/opacity supaya tidak
               * memicu layout tiap frame — tapi di sini justru perubahan
               * bentuknya yang membawa informasi, dan `scaleX` akan menggepengkan
               * ujung pilnya jadi lonjong. Ongkosnya kecil dan terkurung: empat
               * elemen 16px di dalam kolom yang lebarnya sudah pasti, jadi tidak
               * ada apapun di luar barisan titik ini yang ikut dihitung ulang.
               */
              animate={{ width: dipilih ? 54 : 16 }}
              transition={kurangiGerak ? { duration: 0 } : SENTUHAN}
              className="h-4 shrink-0 cursor-pointer rounded-full bg-gradient-to-b from-bkui-coklat-garis to-bkui-coklat-tua focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bkui-hijau"
            />
          );
        })}
      </div>
    </div>
  );
}
