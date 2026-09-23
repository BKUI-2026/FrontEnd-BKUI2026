"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { HiasanTestimoni } from "@/components/landing/HiasanTestimoni";
import { SectionLangit } from "@/components/landing/SectionLangit";
import { JudulSticker } from "@/components/ui/JudulSticker";
import { Muncul } from "@/components/ui/Muncul";

const PENGUMUMAN_CASA = [
  "Nantikan 8 Campus Ambassador BKUI 2026",
  "Nantikan 12 Student Ambassador BKUI 2026",
] as const;

const GERAK_TESTIMONI = {
  masuk: (arah: number) => ({ x: `${arah * 100}%`, opacity: 0 }),
  tampil: { x: "0%", opacity: 1 },
  keluar: (arah: number) => ({ x: `${arah * -100}%`, opacity: 0 }),
};

/**
 * Section "Apa Kata Mereka" — testimoni peserta CASA, ditampilkan satu per satu
 * dengan tombol panah kiri/kanan seperti di Figma.
 *
 * Ukuran diambil dari Figma (node `265:278`): panah 97,5x152, kartu 1001x480,
 * jarak antar keduanya 32 — total 1260. Kartunya SENGAJA tidak dibuat selebar
 * layar; di desain memang ada ruang kosong di kiri-kanan supaya rumpun pohon
 * di belakangnya tetap kelihatan.
 *
 * Client component karena butuh state testimoni mana yang sedang tampil.
 *
 * Perpindahannya sengaja TIDAK otomatis. Konten yang berganti sendiri tanpa
 * diminta menyulitkan orang yang membaca lambat atau memakai screen reader —
 * dan di Figma pun tidak ada indikasi carousel ini berjalan sendiri.
 */
export function TestimoniCASA() {
  const [indeks, setIndeks] = useState(0);
  const [arah, setArah] = useState<1 | -1>(1);
  const jumlah = PENGUMUMAN_CASA.length;
  const pengumuman = PENGUMUMAN_CASA[indeks];

  // Modulo dua arah supaya dari testimoni pertama bisa mundur ke yang terakhir.
  const pindah = (langkah: 1 | -1) => {
    setArah(langkah);
    setIndeks((i) => (i + langkah + jumlah) % jumlah);
  };

  return (
    <SectionLangit className="min-h-[70vw] pb-20 pt-20 sm:pt-28 lg:pt-32">
      <HiasanTestimoni />

      <div className="relative mx-auto flex w-full max-w-[1172px] flex-col items-center px-4 sm:px-8 lg:w-[77.5vw] lg:px-0">
        <Muncul>
          <JudulSticker as="h2" ukuran="h1">
            Apa Kata CASA
          </JudulSticker>
        </Muncul>

        <Muncul jeda={120} className="mt-7 flex w-full items-center gap-2 sm:gap-8">
          <TombolPanah arah="kiri" onClick={() => pindah(-1)} />

          {/*
            `aria-live="polite"` supaya pengguna screen reader diberi tahu isinya
            berganti setelah menekan panah — tanpa ini, tombolnya terasa tidak
            melakukan apa-apa.
          */}
          <div className="relative h-[420px] min-w-0 flex-1 overflow-hidden rounded-3xl sm:h-[500px]">
            <AnimatePresence custom={arah} initial={false}>
              <motion.article
                key={pengumuman}
                custom={arah}
                variants={GERAK_TESTIMONI}
                initial="masuk"
                animate="tampil"
                exit="keluar"
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                aria-live="polite"
                className="absolute inset-0 flex flex-col items-center gap-5 overscroll-contain bg-bkui-krem-kartu p-6 text-bkui-teks will-change-transform sm:gap-7 sm:p-10 lg:flex-row lg:p-[50px]"
              >
                {/* Siluet peserta sebagai placeholder visual hingga foto CASA
                    yang sudah dikurasi tersedia dari Admin. */}
                <div className="relative aspect-square w-full max-w-[200px] shrink-0 lg:max-w-[38.7%]">
                  <Image
                    src="/icon/landing/latest/siluet-orang.png"
                    alt=""
                    aria-hidden
                    fill
                    sizes="(min-width: 1024px) 39vw, 200px"
                    className="object-contain "
                  />
                  <Image
                    src="/icon/landing/bingkai-foto-besar.svg"
                    alt=""
                    aria-hidden
                    fill
                    className="pointer-events-none z-10"
                  />
                </div>

                <div className="flex flex-col items-center gap-5 overflow-y-auto text-center lg:items-start lg:text-left">
                  <div>
                    <h3 className="font-display text-xl leading-[1.4] sm:text-[32px]">
                      {pengumuman}
                    </h3>
                    {/* <p className="font-ui text-xl font-semibold leading-[1.2] sm:text-[28px]">
                      {testimoni.asalSekolah}
                    </p> */}
                  </div>
                  {/* <p className="font-body text-base leading-[1.4] sm:text-xl">
                    {testimoni.isi}
                  </p> */}
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          <TombolPanah arah="kanan" onClick={() => pindah(1)} />
        </Muncul>

        {/* Tetap diumumkan ke pembaca layar tanpa menambah elemen visual di
            luar komposisi Figma. */}
        <p className="sr-only" aria-live="polite">
          Pengumuman {indeks + 1} dari {jumlah}
        </p>
      </div>
    </SectionLangit>
  );
}

function TombolPanah({
  arah,
  onClick,
}: {
  arah: "kiri" | "kanan";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={
        arah === "kiri" ? "Testimoni sebelumnya" : "Testimoni berikutnya"
      }
      className="flex size-11 shrink-0 items-center justify-center rounded-full transition-transform hover:scale-110 focus-visible:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bkui-hijau"
    >
      {/*
        Cuma ada satu file panah (menghadap kanan) — di Figma panah kiri adalah
        salinan yang dicerminkan, bukan gambar terpisah. Dicerminkan lewat CSS
        supaya tidak ada dua file identik yang harus dijaga tetap sinkron.

        Ukuran 97,5x152 diambil dari Figma; di layar sempit dikecilkan supaya
        tidak memakan lebar kartunya.
      */}
      <Image
        src="/icon/landing/panah.svg"
        alt=""
        aria-hidden
        // Ukuran asli berkasnya 92,4862 x 135,27. Kalau diisi angka lain
        // (sebelumnya 98x152) rasionya meleset dan next/image protes, karena
        // lebarnya diatur CSS sementara tingginya ikut rasio asli.
        width={92}
        height={135}
        className={`h-auto w-7 sm:w-[62px] lg:w-[97.5px] ${arah === "kiri" ? "-scale-x-100" : ""}`}
      />
    </button>
  );
}
