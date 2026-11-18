"use client";

import Image from "next/image";
import type { CSSProperties } from "react";

import { HiasanTestimoni } from "@/components/landing/HiasanTestimoni";
import { SectionLangit } from "@/components/landing/SectionLangit";
import { JudulSticker } from "@/components/ui/JudulSticker";
import { Muncul } from "@/components/ui/Muncul";

import { DAFTAR_TESTIMONI, type Testimoni } from "@/lib/landing-content";

const KELOMPOK_CASA = [
  { id: "campus-ambassador", peran: "Campus Ambassador" },
  { id: "student-ambassador", peran: "Student Ambassador" },
].map(({ id, peran }) => ({
  id,
  peran,
  anggota: DAFTAR_TESTIMONI.filter((casa) => casa.peran === peran),
}));

/** Detik per anggota: pita 12 orang butuh ~48 detik untuk satu putaran. */
const DETIK_PER_ANGGOTA = 4;

/**
 * Meet The CASA: dua pita foto yang terus berjalan. Campus Ambassador bergerak
 * ke kanan, Student Ambassador ke kiri, supaya keduanya terbaca sebagai dua
 * kelompok berbeda.
 */
export function TestimoniCASA() {
  return (
    <SectionLangit className="min-h-[70vw] pb-20 pt-20 sm:pt-28 lg:pt-32">
      <HiasanTestimoni />

      <div className="relative mx-auto flex w-full flex-col items-center">
        <Muncul>
          <JudulSticker as="h2" ukuran="h1" className="text-center">
            Meet The CASA
          </JudulSticker>
        </Muncul>

        <div className="mt-7 grid w-full grid-cols-1 gap-10 sm:gap-12">
          {KELOMPOK_CASA.map(({ id, peran, anggota }, i) => (
            <PitaCASA key={id} id={id} peran={peran} anggota={anggota} arah={i === 0 ? "kanan" : "kiri"} />
          ))}
        </div>
      </div>
    </SectionLangit>
  );
}

/**
 * Daftarnya dirender dua kali: salinan kedua hanya untuk menyambung putaran,
 * jadi disembunyikan dari pembaca layar dan tidak bisa difokus. Saat pengguna
 * meminta gerak dikurangi, animasi mati dan pita bisa digeser manual.
 */
function PitaCASA({ id, peran, anggota, arah }: {
  id: string;
  peran: string;
  anggota: readonly Testimoni[];
  arah: "kiri" | "kanan";
}) {
  if (anggota.length === 0) return null;
  return (
    <section aria-labelledby={id} className="min-w-0">
      <Muncul className="flex flex-col items-center gap-5">
        <h3 id={id} className="rounded-full bg-bkui-hijau-tua px-5 py-2 text-center font-ui text-base font-extrabold text-bkui-krem sm:text-xl">
          {peran}
        </h3>
        <div className="pita-casa-bingkai w-full overflow-hidden motion-reduce:overflow-x-auto [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <div
            className="pita-casa flex w-max"
            data-arah={arah}
            style={{ "--durasi": `${anggota.length * DETIK_PER_ANGGOTA}s` } as CSSProperties}
          >
            <DaftarCASA anggota={anggota} />
            <DaftarCASA anggota={anggota} salinan />
          </div>
        </div>
      </Muncul>
    </section>
  );
}

function DaftarCASA({ anggota, salinan = false }: { anggota: readonly Testimoni[]; salinan?: boolean }) {
  return (
    <ul className="flex shrink-0 gap-4 pr-4 sm:gap-6 sm:pr-6" aria-hidden={salinan || undefined}>
      {anggota.map((casa) => (
        <li
          key={casa.id}
          className="flex w-40 shrink-0 flex-col items-center gap-3 rounded-3xl bg-bkui-krem-kartu px-3 pb-5 pt-4 text-center text-bkui-teks sm:w-52 lg:w-60"
        >
          <div className="relative aspect-square w-full">
            <div className="absolute inset-[6%] overflow-hidden rounded-xl bg-bkui-krem">
              <Image
                src={casa.foto}
                alt={salinan ? "" : `Foto ${casa.nama}`}
                fill
                sizes="(min-width: 1024px) 216px, (min-width: 640px) 184px, 136px"
                className="object-contain"
              />
            </div>
            <Image
              src="/icon/landing/bingkai-foto-besar.svg"
              alt=""
              aria-hidden
              fill
              className="pointer-events-none z-10"
            />
          </div>
          <div className="min-w-0 wrap-break-word">
            <p className="font-ui text-base font-extrabold leading-snug sm:text-xl">{casa.nama}</p>
            <p className="mt-1 font-ui text-xs font-semibold leading-snug sm:text-sm">{casa.asalSekolah}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
