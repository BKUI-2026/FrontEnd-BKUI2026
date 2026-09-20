"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Header halaman Explore UI — ilustrasi perkemahan pada Figma node 729:6531.
 *
 * Rasionya dikunci ke 1512:885 (ukuran frame Figma) supaya ilustrasinya tidak
 * pernah terpotong. Aset SVG mempertahankan ornamen, maskot, dan baris judul
 * lain. Baris lama "1 Pendidikan Vokasi" disembunyikan dan diganti "Sekolah
 * Vokasi" dengan font, outline, serta shadow yang senada dengan ekspor Figma.
 * Animasi elemen tetap disimpan di SVG.
 */
export function HeaderExplore() {
  const kurangiGerak = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden">
      <h1 className="sr-only">
        Yuk, intip 14 fakultas dan Sekolah Vokasi di Universitas Indonesia
      </h1>

      <motion.div
        className="relative aspect-[1512/885] w-full origin-center overflow-hidden bg-[#bfe7f8]"
        initial={kurangiGerak ? false : { opacity: 0, scale: 1.015 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src="/icon/explore/hero/explore-hero-complete.svg"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          priority
          unoptimized
          className="object-contain"
        />
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 -rotate-3 whitespace-nowrap">
          <span className="judul-sticker font-display text-[clamp(1.2rem,6.5vw,6.1rem)]" style={{ filter: "drop-shadow(0.06em 0.09em 0.01em rgb(0 0 0 / 0.4))" }}>
            <span className="judul-sticker__pink">Sekolah Vokasi</span>
            <span className="judul-sticker__krem">Sekolah Vokasi</span>
            <span className="judul-sticker__isi">Sekolah Vokasi</span>
          </span>
        </div>
      </motion.div>

      {/*
        `Rectangle 815` di Figma: strip krem 24px yang memisahkan header dari
        daftar fakultas. Dibuat sebagai kotak CSS, bukan ikut dilebur ke
        gambar — cuma satu warna solid, tidak ada alasan jadi bitmap.
      */}
      <div aria-hidden className="h-6 w-full bg-bkui-strip" />
    </section>
  );
}
