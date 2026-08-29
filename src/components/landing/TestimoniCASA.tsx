"use client";

import Image from "next/image";
import { useState } from "react";

import { DekorBendera, SectionLangit } from "@/components/landing/SectionLangit";
import { JudulSticker } from "@/components/ui/JudulSticker";
import { DAFTAR_TESTIMONI } from "@/lib/landing-content";

/**
 * Section "Apa Kata Mereka" — testimoni peserta CASA, ditampilkan satu per satu
 * dengan tombol panah kiri/kanan seperti di Figma.
 *
 * Client component karena butuh state testimoni mana yang sedang tampil.
 *
 * Perpindahannya sengaja TIDAK otomatis. Konten yang berganti sendiri tanpa
 * diminta menyulitkan orang yang membaca lambat atau memakai screen reader —
 * dan di Figma pun tidak ada indikasi carousel ini berjalan sendiri.
 */
export function TestimoniCASA() {
  const [indeks, setIndeks] = useState(0);
  const jumlah = DAFTAR_TESTIMONI.length;
  const testimoni = DAFTAR_TESTIMONI[indeks];

  // Modulo dua arah supaya dari testimoni pertama bisa mundur ke yang terakhir.
  const pindah = (langkah: number) =>
    setIndeks((i) => (i + langkah + jumlah) % jumlah);

  return (
    <SectionLangit className="pb-24 pt-[max(195px,12.5vw)]">
      <DekorBendera />

      {/* Pohon cemara kiri & kanan, hanya muat di layar lebar */}
      <Image
        src="/image/landing/pohon-kiri.webp"
        alt=""
        aria-hidden
        width={620}
        height={921}
        className="pointer-events-none absolute -left-10 bottom-0 -z-10 hidden w-[300px] xl:block"
      />
      <Image
        src="/image/landing/pohon-kanan.webp"
        alt=""
        aria-hidden
        width={620}
        height={1161}
        className="pointer-events-none absolute -right-10 bottom-0 -z-10 hidden w-[300px] xl:block"
      />

      <div className="relative mx-auto flex w-full max-w-[1260px] flex-col items-center px-5 sm:px-8">
        <JudulSticker as="h2" ukuran="h1">
          Apa Kata Mereka
        </JudulSticker>

        <div className="mt-8 flex w-full items-center gap-2 sm:gap-4">
          <TombolPanah arah="kiri" onClick={() => pindah(-1)} />

          {/*
            `aria-live="polite"` supaya pengguna screen reader diberi tahu isinya
            berganti setelah menekan panah — tanpa ini, tombolnya terasa tidak
            melakukan apa-apa.
          */}
          <article
            aria-live="polite"
            className="flex flex-1 flex-col items-center gap-7 rounded-3xl bg-bkui-krem-kartu p-6 text-bkui-teks sm:p-10 lg:flex-row"
          >
            {/* Foto testimoni — placeholder selama fotonya belum ada */}
            <div className="relative aspect-square w-full max-w-[348px] shrink-0">
              {testimoni.foto ? (
                <Image
                  src={testimoni.foto}
                  alt=""
                  fill
                  sizes="348px"
                  className="rounded-[28px] object-cover"
                />
              ) : null}
              <Image
                src="/icon/landing/bingkai-foto-besar.svg"
                alt=""
                aria-hidden
                fill
                className="pointer-events-none"
              />
            </div>

            <div className="flex flex-col gap-5">
              <div>
                <h3 className="font-display text-2xl leading-[1.4] sm:text-[32px]">
                  {testimoni.nama}
                </h3>
                <p className="font-ui text-xl font-semibold leading-[1.2] sm:text-[28px]">
                  {testimoni.asalSekolah}
                </p>
              </div>
              <p className="font-body text-base leading-[1.4] sm:text-xl">
                {testimoni.isi}
              </p>
            </div>
          </article>

          <TombolPanah arah="kanan" onClick={() => pindah(1)} />
        </div>

        {/* Penanda posisi — tidak ada di Figma, tapi tanpa ini pengunjung tidak
            tahu ada berapa testimoni dan sedang di nomor berapa. */}
        <p className="mt-4 font-body text-sm text-bkui-teks">
          Testimoni {indeks + 1} dari {jumlah}
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
      className="shrink-0 rounded-full p-1 transition-transform hover:scale-110 focus-visible:scale-110"
    >
      {/*
        Cuma ada satu file panah (menghadap kanan) — di Figma panah kiri adalah
        salinan yang dicerminkan, bukan gambar terpisah. Dicerminkan lewat CSS
        supaya tidak ada dua file identik yang harus dijaga tetap sinkron.
      */}
      <Image
        src="/icon/landing/panah.svg"
        alt=""
        aria-hidden
        width={92}
        height={135}
        className={`h-auto w-6 sm:w-[62px] ${arah === "kiri" ? "-scale-x-100" : ""}`}
      />
    </button>
  );
}
