"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

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

const GERAK_TESTIMONI = {
  masuk: (arah: number) => ({ x: `${arah * 100}%`, opacity: 0 }),
  tampil: { x: "0%", opacity: 1 },
  keluar: (arah: number) => ({ x: `${arah * -100}%`, opacity: 0 }),
};

/** Meet The CASA: Campus Ambassador di atas, Student Ambassador di bawah. */
export function TestimoniCASA() {
  return (
    <SectionLangit className="min-h-[70vw] pb-20 pt-20 sm:pt-28 lg:pt-32">
      <HiasanTestimoni />

      <div className="relative mx-auto flex w-full max-w-[1172px] flex-col items-center px-4 sm:px-8 lg:w-[77.5vw] lg:px-0">
        <Muncul>
          <JudulSticker as="h2" ukuran="h1" className="text-center">
            Meet The CASA
          </JudulSticker>
        </Muncul>

        <div className="mt-7 grid w-full gap-10 sm:gap-12">
          {KELOMPOK_CASA.map(({ id, peran, anggota }) => (
            <KaruselCASA key={id} id={id} peran={peran} anggota={anggota} />
          ))}
        </div>
      </div>
    </SectionLangit>
  );
}

function KaruselCASA({ id, peran, anggota }: {
  id: string;
  peran: string;
  anggota: readonly Testimoni[];
}) {
  const [indeks, setIndeks] = useState(0);
  const [arah, setArah] = useState<1 | -1>(1);
  const kurangiGerak = useReducedMotion();
  const jumlah = anggota.length;
  const casa = anggota[indeks];
  if (!casa) return null;

  const pindah = (langkah: 1 | -1) => {
    setArah(langkah);
    setIndeks((i) => (i + langkah + jumlah) % jumlah);
  };

  return (
    <section aria-labelledby={id}>
      <Muncul className="flex flex-col items-center gap-4">
        <h3 id={id} className="rounded-full bg-bkui-hijau-tua px-5 py-2 text-center font-ui text-base font-extrabold text-bkui-krem sm:text-xl">
          {peran}
        </h3>
        <div className="flex w-full items-center gap-2 sm:gap-8">
          {jumlah > 1 && <TombolPanah arah="kiri" peran={peran} onClick={() => pindah(-1)} />}
          <div className="grid min-w-0 flex-1 overflow-hidden rounded-3xl bg-bkui-krem-kartu">
            <AnimatePresence custom={arah} initial={false}>
              <motion.article
                key={casa.id}
                custom={arah}
                variants={GERAK_TESTIMONI}
                initial="masuk"
                animate="tampil"
                exit="keluar"
                transition={{ duration: kurangiGerak ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="col-start-1 row-start-1 flex min-w-0 flex-col items-center justify-center gap-3 px-4 py-5 text-bkui-teks sm:gap-6 sm:p-8 lg:flex-row lg:justify-start lg:px-12"
              >
                <div className="relative aspect-square w-full max-w-40 shrink-0 sm:max-w-48 lg:max-w-52">
                  <div className="absolute inset-[6%] overflow-hidden rounded-xl bg-bkui-krem">
                    <Image
                      src={casa.foto}
                      alt={`Foto ${casa.nama}`}
                      fill
                      sizes="(min-width: 1024px) 184px, (min-width: 640px) 169px, 141px"
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

                <div className="min-w-0 text-center wrap-break-word lg:text-left">
                  <h4 className="font-ui text-xl font-extrabold leading-snug sm:text-[32px]">
                    {casa.nama}
                  </h4>
                  <p className="mt-2 font-ui text-sm font-semibold leading-snug sm:text-lg">
                    {casa.asalSekolah}
                  </p>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          {jumlah > 1 && <TombolPanah arah="kanan" peran={peran} onClick={() => pindah(1)} />}
        </div>
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {casa.nama}, {casa.asalSekolah}. {indeks + 1} dari {jumlah}.
        </p>
      </Muncul>
    </section>
  );
}

function TombolPanah({
  arah,
  peran,
  onClick,
}: {
  arah: "kiri" | "kanan";
  peran: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${peran} ${arah === "kiri" ? "sebelumnya" : "berikutnya"}`}
      className="flex size-11 shrink-0 items-center justify-center rounded-full transition-transform hover:scale-110 focus-visible:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bkui-hijau"
    >
      {/* Panah kiri memakai aset yang sama dengan arah dicerminkan. */}
      <Image
        src="/icon/landing/panah.svg"
        alt=""
        aria-hidden
        width={92}
        height={135}
        className={`h-auto w-7 sm:w-10 ${arah === "kiri" ? "-scale-x-100" : ""}`}
      />
    </button>
  );
}
