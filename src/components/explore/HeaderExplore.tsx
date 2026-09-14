"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Header halaman Explore UI — ilustrasi perkemahan pada Figma node 729:6531.
 *
 * Rasionya dikunci ke 1512:885 (ukuran frame Figma) supaya ilustrasinya tidak
 * pernah terpotong. Asset yang dipakai adalah ekspor SVG utuh dari frame Figma,
 * sehingga seluruh ornamen kecil, maskot, serta outline judul ikut terbawa tanpa
 * mengubahnya menjadi screenshot raster. Animasi per kelompok elemen disimpan
 * langsung di dalam SVG agar susunan layer tetap identik dengan desain sumber.
 */
export function HeaderExplore() {
  const kurangiGerak = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden">
      <h1 className="sr-only">
        Yuk, intip 14 fakultas dan 1 pendidikan vokasi di Universitas Indonesia
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
