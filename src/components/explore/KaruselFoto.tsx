"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { SENTUHAN } from "./gerak";

/**
 * Carousel foto fakultas — bingkai persegi + titik navigasi di bawahnya.
 *
 * Fotonya belum ada, jadi untuk sementara area visual ini menampilkan logo
 * fakultas dari Drive. Jika logo belum tersedia, fallback placeholder tetap
 * dipakai supaya kotak tidak terbaca sebagai gambar gagal dimuat.
 *
 * ---------------------------------------------------------------------------
 * Kenapa bingkainya SVG, bukan `border` CSS
 * ---------------------------------------------------------------------------
 * Garis tepinya di Figma bukan garis rata: tebalnya berubah dan sudutnya
 * digambar tangan (`Rectangle 797 (Stroke)`). `border` CSS selalu rata, jadi
 * hasilnya akan kehilangan karakter gambar tangan yang jadi ciri desain ini.
 */
export function KaruselFoto({
  jumlah,
  logoSrc,
  namaFakultas,
}: {
  jumlah: number;
  logoSrc: string | null;
  namaFakultas: string;
}) {
  const [aktif, setAktif] = useState(0);
  const kurangiGerak = useReducedMotion();
  const logoBesar =
    logoSrc?.includes("/fk-") ||
    logoSrc?.includes("/fh-") ||
    logoSrc?.includes("/ff-") ||
    logoSrc?.includes("/fisip-");

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
            {logoSrc ? (
              <div className={`relative ${logoBesar ? "h-[76%] w-[76%]" : "h-[62%] w-[62%]"}`}>
                <Image
                  src={logoSrc}
                  alt={`Logo ${namaFakultas}`}
                  fill
                  sizes="(min-width: 1024px) 248px, 56vw"
                  className="object-contain drop-shadow-[0_10px_16px_rgba(70,50,27,0.18)]"
                  priority={aktif === 0}
                />
              </div>
            ) : (
              <span className="px-5 text-center font-ui text-sm text-bkui-teks/55">
                Logo {namaFakultas} segera hadir
              </span>
            )}
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

      <div className="flex min-h-11 items-center justify-center gap-1">
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
               * Visual titik tetap 16/54px seperti desain, tetapi tombol luarnya
               * minimal 44px supaya nyaman disentuh di HP. Yang dianimasikan
               * adalah visual dan ruang tombolnya secara bersamaan, sehingga
               * fokus keyboard serta target sentuh tidak pernah mengecil.
               */
              animate={{ width: dipilih ? 62 : 44 }}
              transition={kurangiGerak ? { duration: 0 } : SENTUHAN}
              className="flex h-11 shrink-0 cursor-pointer items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bkui-hijau"
            >
              <motion.span
                aria-hidden
                animate={{ width: dipilih ? 54 : 16 }}
                transition={kurangiGerak ? { duration: 0 } : SENTUHAN}
                className="h-4 rounded-full bg-gradient-to-b from-bkui-coklat-garis to-bkui-coklat-tua"
              />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
