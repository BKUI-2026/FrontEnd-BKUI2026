"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Judul header Explore UI: "Yuk, Intip 14 Fakultas & 1 Pendidikan Vokasi di
 * Universitas Indonesia".
 *
 * Dipakai sebagai GAMBAR, bukan teks HTML — dan itu keputusan sadar, bukan
 * jalan pintas. Di Figma dua baris tengahnya dilengkungkan mengikuti path
 * (`text-path`) lalu diberi outline berlapis; melengkungkan teks HTML di
 * sepanjang kurva tidak bisa dilakukan tanpa membangun ulang seluruh judul
 * sebagai SVG teks, dan hasilnya tetap meleset dari desain.
 *
 * Karena itu judul yang sebenarnya ditulis sebagai `<h1>` khusus screen reader
 * di `HeaderExplore` — halaman tetap punya satu heading level 1 yang benar
 * untuk pembaca layar dan mesin pencari. Pola ini persis mengikuti `Hero` di
 * Landing Page.
 *
 * Berkasnya SVG (teksnya sudah jadi path, jadi tidak bergantung font
 * terpasang), BUKAN WebP. Ekspor PNG/WebP node dari Figma selalu ikut membakar
 * latar langit `#84C2F6` jadi kotak biru pekat, dan kotak itu menutupi
 * lanskapnya. Latar itu tidak bisa dibersihkan dari versi rasternya tanpa
 * merusak bayangan jatuh judul — bayangannya hitam 40% di atas biru, jadi
 * penghapusan warna apa pun akan mengubahnya jadi gumpalan biru gelap. Di SVG
 * latarnya cuma tiga `<rect>` yang tinggal dibuang, dan bayangannya tetap utuh
 * sebagai filter.
 *
 * Posisinya persen terhadap kanvas Figma 1512x885 (x=174, y=166.91,
 * 1163.46x680.85), jadi ikut menyesuaikan lebar layar tanpa breakpoint.
 */
export function JudulExplore() {
  const kurangiGerak = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute"
      style={{ left: "11.508%", top: "18.860%", width: "76.948%", height: "76.932%" }}
      /*
       * Judulnya sudah terlihat sejak halaman dibuka, jadi geraknya dipasang
       * di `animate` (langsung jalan), bukan `whileInView` — menunggu scroll
       * untuk elemen yang sudah ada di layar berarti ia tidak pernah muncul.
       *
       * Skalanya mulai dari 0.96, bukan 0.8: judul ini nyaris selebar layar,
       * dan lompatan skala besar pada elemen sebesar itu terasa seperti
       * halaman yang belum selesai memuat.
       */
      initial={kurangiGerak ? false : { opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Image
        src="/icon/explore/judul.svg"
        alt=""
        width={1164}
        height={681}
        sizes="77vw"
        // Elemen terbesar yang pertama dilihat pengunjung — dimuat lebih dulu
        // supaya tidak ada jeda kosong di puncak halaman.
        priority
        className="h-full w-full"
      />
    </motion.div>
  );
}
