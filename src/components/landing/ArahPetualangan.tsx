import Image from "next/image";

import { HiasanArah } from "@/components/landing/HiasanArah";
import { SectionLangit, StripPembatas } from "@/components/landing/SectionLangit";
import { JudulSticker } from "@/components/ui/JudulSticker";
import { Muncul } from "@/components/ui/Muncul";

const MATA_ACARA = [
  {
    judul: "Bedah Universitas",
    deskripsi:
      "Sesi gelar wicara bersama alumni UI untuk melihat kehidupan perkuliahan, lingkungan kampus, dan berbagai pilihan langkah setelah lulus.",
  },
  {
    judul: "Bedah Fakultas",
    deskripsi:
      "Jelajahi fakultas UI secara langsung dan kenali fasilitas, suasana belajar, serta komunitas yang membentuk pengalaman mahasiswa.",
  },
  {
    judul: "Bedah Jurusan",
    deskripsi:
      "Temui perwakilan program studi, tanyakan kurikulum dan prospek karier, lalu gali informasi yang membantu menentukan pilihanmu.",
  },
] as const;

/** Tiga kartu mata acara mengikuti Landing Page Figma terbaru, node 776:2747. */
export function ArahPetualangan() {
  return (
    <SectionLangit
      className="min-h-[1148px] pb-32 pt-20 sm:pt-24 lg:pb-44"
      dekorasi={
        <>
          <StripPembatas />
          <HiasanArah />
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
                <article className="relative flex min-h-[285px] h-full flex-col items-center justify-center gap-3 p-8 text-center text-white sm:min-h-[333px] sm:p-10">
                  <Image src="/icon/landing/latest/arah-board.svg" alt="" aria-hidden fill sizes="(min-width: 768px) 48vw, 100vw" className="pointer-events-none -z-10 object-fill" />
                  <h3 className="font-display text-3xl leading-tight [text-shadow:2px_3px_0_#1a2731] [-webkit-text-stroke:1px_#1a2731] sm:text-4xl">
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
