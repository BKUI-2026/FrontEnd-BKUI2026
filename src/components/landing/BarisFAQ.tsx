"use client";

import Image from "next/image";
import { useId, useState } from "react";

import type { ItemFAQ } from "@/lib/landing-content";

/** Satu panel FAQ yang mempertahankan isi di DOM agar tinggi jawabannya dapat dianimasikan. */
export function BarisFAQ({
  item,
  terbukaAwal,
}: {
  item: ItemFAQ;
  terbukaAwal: boolean;
}) {
  const [terbuka, setTerbuka] = useState(terbukaAwal);
  const idJawaban = useId();

  return (
    <section className="rounded-3xl border-4 border-bkui-hijau-garis bg-gradient-to-b from-bkui-kartu-atas to-bkui-kartu-bawah px-6 py-5 transition-transform duration-300 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:px-8 sm:py-6">
      <button
        type="button"
        aria-expanded={terbuka}
        aria-controls={idJawaban}
        onClick={() => setTerbuka((sebelumnya) => !sebelumnya)}
        className="flex w-full cursor-pointer items-center justify-between gap-4 text-left font-body text-base font-medium leading-[1.4] text-bkui-hijau-garis transition-colors focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-bkui-kuning sm:text-xl"
      >
        <span className={terbuka ? "font-bold" : undefined}>{item.pertanyaan}</span>
        <Image
          src="/icon/landing/chevron-bawah.svg"
          alt=""
          aria-hidden
          width={28}
          height={28}
          className={`w-6 shrink-0 transition-transform duration-300 ease-out motion-reduce:transition-none sm:w-7 ${terbuka ? "-scale-y-100" : ""}`}
        />
      </button>

      <div
        id={idJawaban}
        aria-hidden={!terbuka}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${terbuka ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="mt-3 font-body text-base font-medium leading-[1.4] text-bkui-hijau-garis sm:text-xl">
            {item.jawaban}
          </p>
        </div>
      </div>
    </section>
  );
}
