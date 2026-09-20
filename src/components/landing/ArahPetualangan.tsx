import Image from "next/image";

import { SectionLangit } from "@/components/landing/SectionLangit";
import { JudulSticker } from "@/components/ui/JudulSticker";
import { Muncul } from "@/components/ui/Muncul";

const MATA_ACARA = [
  {
    judul: "Bedah Universitas",
    deskripsi:
      "Sesi gelar wicara inspiratif yang menghadirkan jajaran alumni UI. Fokus utamanya adalah memberikan gambaran kepada peserta mengenai dinamika kehidupan selama masa perkuliahan.",
  },
  {
    judul: "Bedah Fakultas",
    deskripsi:
      "Kegiatan penjelajahan yang mengajak peserta turun langsung merasakan atmosfer fakultas impian mereka, peserta akan diajak berkeliling UI menggunakan Bis Kuning.",
  },
  {
    judul: "Bedah Jurusan",
    deskripsi:
      "Menghadirkan venue eksibisi di sekitar balairung UI yang diisi dengan perwakilan setiap program studi di UI. Sesi ini menjadi kesempatan bagi para peserta untuk berdiskusi dan menggali informasi sedalam mungkin.",
  },
] as const;

/** Tiga kartu mata acara mengikuti Landing Page Figma terbaru, node 776:2747. */
export function ArahPetualangan() {
  return (
    <SectionLangit
      className="min-h-[1148px] pb-32 pt-20 sm:pt-24 lg:pb-44"
      dekorasi={
        <>
        <Image
          src="/icon/landing/latest/arah-banner-latest.svg"
          alt=""
          aria-hidden
          width={1805}
          height={1007}
          sizes="100vw"
          className="pointer-events-none absolute left-1/2 top-0 -z-10 h-auto w-[119.35%] min-w-[850px] max-w-none -translate-x-1/2"
        />
        <Image
          src="/icon/landing/latest/arah-vector21.svg"
          alt=""
          aria-hidden
          width={2634}
          height={811}
          sizes="100vw"
          className="pointer-events-none absolute bottom-[-80px] left-1/2 -z-10 h-auto w-[174%] min-w-[1200px] max-w-none -translate-x-1/2"
        />
        <Image
          src="/icon/landing/latest/arah-plants.svg"
          alt=""
          aria-hidden
          width={515}
          height={488}
          className="pointer-events-none absolute bottom-0 left-[-110px] -z-10 h-auto w-[360px] sm:w-[515px]"
        />
        </>
      }
    >
      <div className="relative mx-auto flex w-full max-w-[1240px] flex-col items-center px-5 sm:px-8">
        <Muncul className="flex flex-col items-center gap-3">
          <JudulSticker as="h2" ukuran="h1" className="text-center">
            Tentukan Arah Petualanganmu
          </JudulSticker>
          <p className="rounded-full bg-gradient-to-r from-bkui-hijau to-bkui-hijau-tua px-5 py-2 text-center font-ui text-base font-semibold text-white sm:text-xl">
            Mata Acara Bedah Kampus UI 2026
          </p>
        </Muncul>

        <ul className="mt-10 grid w-full grid-cols-1 gap-5 sm:mt-12 md:grid-cols-2 lg:gap-10">
          {MATA_ACARA.map((acara, index) => (
            <li key={acara.judul} className={index === 2 ? "md:col-span-2 md:mx-auto md:w-[calc(50%-1.25rem)]" : ""}>
              <Muncul jeda={100 + index * 100} className="h-full">
                <article className="relative flex min-h-[285px] h-full flex-col items-center justify-center gap-3 rounded-lg border border-[#5d3c2a] bg-[#67432f] p-8 text-center text-white shadow-[0_12px_22px_rgba(25,16,10,0.32)] sm:min-h-[333px] sm:p-10" style={{ backgroundImage: "linear-gradient(rgba(66, 31, 18, .23), rgba(66, 31, 18, .23)), url('/icon/landing/latest/arah-wood-texture.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
                  <h3 className="font-display text-3xl leading-tight [text-shadow:2px_3px_0_#1a2731] [-webkit-text-stroke:1px_#1a2731] sm:text-4xl lg:text-[46px]">
                    {acara.judul}
                  </h3>
                  <p className="max-w-sm font-body text-base leading-[1.4] sm:text-lg">
                    {acara.deskripsi}
                  </p>
                </article>
              </Muncul>
            </li>
          ))}
        </ul>
      </div>
    </SectionLangit>
  );
}
