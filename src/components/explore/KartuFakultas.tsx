"use client";

import { motion } from "framer-motion";

import type { Fakultas } from "@/lib/explore-content";
import { BERURUTAN, BERURUTAN_RAPAT, MUNCUL, SEKALI_MASUK } from "./gerak";
import { ChipProdi } from "./ChipProdi";
import { KaruselFoto } from "./KaruselFoto";

/**
 * Satu blok fakultas: nama, panel deskripsi + chip prodi, dan carousel foto.
 *
 * Di Figma blok ini BERSELANG-SELING — fakultas ganjil panelnya di kiri dan
 * fotonya di kanan, fakultas genap kebalikannya. Yang dibalik cuma urutan
 * visual (`lg:flex-row-reverse`), BUKAN urutan di HTML: pembaca layar dan
 * navigasi keyboard tetap membaca deskripsi lalu foto untuk setiap fakultas,
 * konsisten dari atas ke bawah. Membalik urutan DOM cuma demi tampilan akan
 * membuat urutan fokus melompat-lompat.
 *
 * Di bawah `lg` keduanya ditumpuk satu kolom dan selang-selingnya hilang —
 * pada layar sempit pola zig-zag tidak terbaca sama sekali, yang tersisa
 * cuma panel 880px yang dipaksa muat.
 */
export function KartuFakultas({ fakultas, terbalik }: { fakultas: Fakultas; terbalik: boolean }) {
  return (
    <motion.article
      variants={BERURUTAN}
      initial="sembunyi"
      whileInView="tampil"
      viewport={SEKALI_MASUK}
      className="flex w-full flex-col items-center gap-4"
    >
      <motion.h2
        variants={MUNCUL}
        className="text-center font-display text-2xl leading-[1.4] text-bkui-hijau [text-shadow:0.9px_3.54px_1.508px_rgba(0,0,0,0.4)] sm:text-3xl lg:text-5xl"
      >
        {fakultas.nama}
      </motion.h2>

      <div
        className={`flex w-full flex-col items-center gap-8 lg:flex-row lg:items-center ${
          terbalik ? "lg:flex-row-reverse" : ""
        }`}
      >
        <motion.div
          variants={MUNCUL}
          /*
           * Panel diangkat sedikit saat disentuh. Bukan sekadar manis: kartunya
           * lebar dan berdempetan ke bawah, dan terangkatnya panel yang sedang
           * ditunjuk membantu mata memisahkan satu fakultas dari tetangganya.
           */
          whileHover={{ y: -6 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
/*
           * `lg:flex-1` + `lg:max-w-[880px]`, bukan `lg:w-[880px]` mati.
           * Di Figma panel 880px dan kolom foto 400px pas di kanvas 1512px,
           * tapi di layar yang sedikit lebih sempit dua lebar mati itu tidak
           * muat berdampingan — yang mengalah kolom fotonya, dan bingkainya
           * kolaps sampai tinggal selebar deretan titik. Sekarang panelnya
           * yang menyusut, fotonya tetap 400px.
           */
          className="flex w-full flex-col gap-5 rounded-3xl bg-bkui-krem-kartu p-6 sm:p-10 lg:max-w-[880px] lg:flex-1 lg:p-14"
        >
          <p className="text-justify font-body text-base font-medium leading-[1.4] text-bkui-teks lg:text-xl">
            {fakultas.ringkasan}
          </p>

          <motion.ul
            variants={BERURUTAN_RAPAT}
            className="flex flex-wrap items-center justify-center gap-3 py-2 lg:gap-7 lg:px-12 lg:py-6"
          >
            {fakultas.prodi.map((nama) => (
              <ChipProdi key={nama} nama={nama} />
            ))}
          </motion.ul>

          <motion.div variants={MUNCUL} className="flex flex-col gap-2.5 text-bkui-teks">
            <h3 className="text-center font-ui text-xl font-semibold leading-[1.2] lg:text-[28px]">
              {fakultas.sorotanJudul}
            </h3>
            <p className="text-justify font-body text-base font-medium leading-[1.4] lg:text-xl">
              {fakultas.sorotanIsi}
            </p>
          </motion.div>
        </motion.div>

        <motion.div variants={MUNCUL} className="flex w-full justify-center lg:w-[400px] lg:shrink-0">
          <KaruselFoto jumlah={fakultas.jumlahFoto} namaFakultas={fakultas.nama} />
        </motion.div>
      </div>
    </motion.article>
  );
}
