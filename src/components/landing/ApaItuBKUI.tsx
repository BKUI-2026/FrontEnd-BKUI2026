import Image from "next/image";
import type { CSSProperties } from "react";

import { SectionLangit, StripPembatas } from "@/components/landing/SectionLangit";
import { Muncul } from "@/components/ui/Muncul";
import { DESKRIPSI_BKUI } from "@/lib/landing-content";

/**
 * Section "Apa itu ... BKUI 2026" — ilustrasi tenda maskot di kiri, judul
 * bertumpuk dan deskripsi acara di kanan.
 *
 * Judulnya tidak memakai komponen `JudulSticker` karena susunannya khas: baris
 * "Apa itu ..." kecil di atas, "BKUI 2026" besar di bawah dengan angka memakai
 * Delight Extra Bold, plus tiga tanda tanya miring di kanan. Semua dibangun
 * dari teks sungguhan, bukan gambar.
 */

/**
 * Tanda tanya dekoratif di kanan judul. Ukuran & sudut putarnya diambil dari
 * Figma, lalu diubah ke satuan `em` supaya ikut mengecil bersama judulnya.
 *
 * `atas` menggeser tiap tanda tanya secara vertikal — di Figma ketiganya tidak
 * sejajar, yang paling besar duduk paling bawah.
 */
const TANDA_TANYA = [
  { ukuran: "1.44em", putar: "9.48deg", turun: "-0.12em", tumpuk: "0" },
  { ukuran: "1.94em", putar: "13.5deg", turun: "0.06em", tumpuk: "-0.42em" },
  { ukuran: "0.93em", putar: "28.49deg", turun: "0.42em", tumpuk: "-0.36em" },
] as const;

export function ApaItuBKUI() {
  return (
    <SectionLangit
      id="apa-itu-bkui"
      // Jarak atas mengikuti Figma: judul mulai di y=215 dari 1512 lebar frame
      // (≈14vw). Ini yang bikin isinya lewat di BAWAH balok kayu mendatar,
      // bukan ketabrak — sama seperti di desain.
      className="min-h-[58.53vw] pb-14 pt-[max(140px,14.22vw)] sm:pb-20"
      dekorasi={
        /*
          Rangka kayu + dedaunan & bunga yang membingkai section ini di Figma.
          Menggantung dari tepi atas, jadi balok mendatarnya melintasi seluruh
          lebar layar dan balok tegaknya turun di sisi kiri.

          `min-w-[900px]` menahan gambarnya supaya tidak ikut mengecil habis di
          layar sempit — kalau dibiarkan menyusut, baloknya jadi setipis garis
          dan dedaunannya tidak terbaca lagi. Kelebihannya dibiarkan meluber ke
          kanan lalu terpotong oleh `overflow-hidden` milik section.

          Kelopak sakura yang di Figma menempel di sini sengaja dihapus dari
          gambarnya: di web kelopaknya sudah jadi animasi (`SakuraBerjatuhan`),
          kalau ikut dibawa jadi dobel.
        */
        <>
          <StripPembatas />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 overflow-hidden"
          >
            <Image
              src="/image/landing/dekor-apaitu.webp"
              alt=""
              width={1512}
              height={885}
              sizes="100vw"
              className="h-auto w-full min-w-[900px]"
            />
          </div>
        </>
      }
    >
      <Muncul className="relative mx-auto flex w-full max-w-[1144px] flex-col items-center gap-8 px-5 sm:px-8 lg:flex-row lg:gap-12">
        {/* Ilustrasi tenda + maskot */}
        <Image
          src="/image/landing/tenda-maskot.webp"
          alt=""
          aria-hidden
          width={800}
          height={792}
          // Terdeteksi sebagai LCP di halaman ini — dimuat lebih awal supaya
          // section pertama setelah hero tidak kosong dulu sesaat.
          priority
          sizes="(min-width: 1024px) 395px, 60vw"
          className="naik-turun h-auto w-[min(60vw,320px)] shrink-0 lg:w-[395px]"
          style={{ "--naik": "12px", "--naik-durasi": "2.8s" } as CSSProperties}
        />

        <div className="flex w-full flex-col gap-5">
          {/* --- Judul --- */}
          {/*
            `whitespace-nowrap` wajib di sini: tiga lapis judul stiker harus
            memutus baris di titik yang persis sama, dan "BKUI 2026" di Figma
            memang satu baris. Tanpa ini, di lebar tertentu lapisan outline dan
            lapisan isinya bisa membungkus berbeda lalu saling meleset.
          */}
          <div className="font-display whitespace-nowrap text-bkui-hijau">
            <p className="judul-sticker text-[clamp(1.25rem,3.4vw,4rem)]">
              <span aria-hidden className="judul-sticker__pink">
                Apa itu ...
              </span>
              <span aria-hidden className="judul-sticker__krem">
                Apa itu ...
              </span>
              <span className="judul-sticker__isi">Apa itu ...</span>
            </p>

            <div className="-mt-[0.35em] flex items-center text-[clamp(1.7rem,4.6vw,5.34rem)]">
              <h2 className="judul-sticker text-[inherit]">
                <span aria-hidden className="judul-sticker__pink">
                  BKUI 2026
                </span>
                <span aria-hidden className="judul-sticker__krem">
                  BKUI 2026
                </span>
                <span className="judul-sticker__isi">BKUI 2026</span>
              </h2>

              {/*
                Tanda tanya sengaja saling menumpuk (margin kiri negatif) dan
                tidak sejajar, meniru susunannya di Figma. Diberi outline krem
                tipis seperti judulnya, tapi tanpa outline pink — di desain
                memang cuma satu lapis.
              */}
              <span
                aria-hidden
                className="-ml-[0.04em] flex shrink-0 select-none items-center font-ui font-extrabold leading-none text-bkui-hijau [paint-order:stroke_fill] [text-shadow:0.026em_0.1em_0.043em_rgb(0_0_0_/_0.4)] [-webkit-text-stroke:0.09em_var(--color-bkui-terang)]"
              >
                {TANDA_TANYA.map((t) => (
                  <span
                    key={t.putar}
                    className="inline-block"
                    style={{
                      fontSize: t.ukuran,
                      transform: `translateY(${t.turun}) rotate(${t.putar})`,
                      marginLeft: t.tumpuk,
                    }}
                  >
                    ?
                  </span>
                ))}
              </span>
            </div>
          </div>

          {/* --- Deskripsi --- */}
          <p className="max-w-[543px] text-justify font-body text-base leading-[1.4] text-bkui-teks sm:text-xl">
            {DESKRIPSI_BKUI}
          </p>
        </div>
      </Muncul>
    </SectionLangit>
  );
}
