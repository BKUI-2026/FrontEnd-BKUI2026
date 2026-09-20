import Image from "next/image";

import { SectionLangit, StripPembatas } from "@/components/landing/SectionLangit";
import { Muncul } from "@/components/ui/Muncul";
import { DESKRIPSI_BKUI } from "@/lib/landing-content";

/**
 * Section "Apa itu ... BKUI 2026" — Bikun di kiri, judul
 * bertumpuk dan deskripsi acara di kanan.
 *
 * Judulnya tidak memakai komponen `JudulSticker` karena susunannya khas: baris
 * "Apa itu ..." kecil di atas, "BKUI 2026" besar di bawah memakai
 * Talina, plus tiga tanda tanya miring di kanan. Semua dibangun
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
      // Jarak atas mengikuti posisi judul di frame Figma.
      className="min-h-[58.53vw] pb-14 pt-[max(140px,14.22vw)] sm:pb-20"
      dekorasi={
        /*
          Cabang dan bunga yang membingkai section ini di Figma.

          Kelopak sakura yang di Figma menempel di sini sengaja dihapus dari
          gambarnya: di web kelopaknya sudah jadi animasi (`SakuraBerjatuhan`),
          kalau ikut dibawa jadi dobel.
        */
        <>
          <StripPembatas />
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <Image
              src="/icon/landing/latest/apaitu-branch-left.svg"
              alt=""
              width={587}
              height={329}
              className="absolute -left-16 -top-10 w-[min(48vw,587px)] -rotate-12"
            />
            <Image src="/icon/landing/latest/apaitu-flower-left.svg" alt="" width={226} height={184} className="absolute left-[12%] top-[18%] w-[min(16vw,226px)]" />
            <Image src="/icon/landing/latest/apaitu-flower-right.svg" alt="" width={73} height={84} className="absolute right-[10%] top-[16%] w-[min(8vw,73px)]" />
            <Image src="/icon/landing/latest/apaitu-flower-small.svg" alt="" width={87} height={95} className="absolute bottom-[16%] left-[6%] w-[min(8vw,87px)]" />
          </div>
        </>
      }
    >
      <Muncul className="relative mx-auto flex w-full max-w-[1144px] flex-col items-center gap-8 px-5 sm:px-8 lg:flex-row lg:gap-12">
        {/* Bikun diekstrak dari ilustrasi vektor hero, tanpa foto. */}
        <Image
          src="/icon/landing/bikun-extracted.svg"
          alt=""
          aria-hidden
          width={363}
          height={309}
          // Terdeteksi sebagai LCP di halaman ini — dimuat lebih awal supaya
          // section pertama setelah hero tidak kosong dulu sesaat.
          priority
          sizes="(min-width: 1024px) 395px, 60vw"
          className="naik-turun h-auto w-[min(60vw,320px)] shrink-0 lg:w-[395px]"
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
                  BKUI <span>2026</span>
                </span>
                <span aria-hidden className="judul-sticker__krem">
                  BKUI <span>2026</span>
                </span>
                <span className="judul-sticker__isi">BKUI <span>2026</span></span>
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
                    className="tanda-tanya-hidup inline-block"
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
          <p className="max-w-[543px] text-left font-body text-base leading-[1.4] text-bkui-teks sm:text-justify sm:text-xl">
            {DESKRIPSI_BKUI}
          </p>
        </div>
      </Muncul>
      <div className="relative mx-auto mt-12 grid w-full max-w-[1144px] gap-4 px-5 sm:px-8 lg:grid-cols-3">
        <Sorotan angka="12.000+" teks="Peserta Sudah Ikut Ekspedisi bersama BKUI pada Tahun Sebelumnya" />
        <Sorotan angka="100+" teks="Kunjungan Sekolah sudah Kami Sapa" />
        <Sorotan angka="Lebih dari 10 tahun" teks="telah Hadir Menemani Siswa/i se-Indonesia" />
      </div>
    </SectionLangit>
  );
}

function Sorotan({ angka, teks }: { angka: string; teks: string }) {
  return (
    <Muncul className="rounded-[28px] border-4 border-bkui-hijau-tua bg-bkui-krem-kartu px-6 py-5 text-center shadow-[7px_8px_0_#134921]">
      <p className="font-ui text-3xl font-extrabold leading-none text-bkui-hijau-tua sm:text-4xl">{angka}</p>
      <p className="mt-3 font-body text-sm font-semibold leading-snug text-bkui-teks sm:text-base">{teks}</p>
    </Muncul>
  );
}
