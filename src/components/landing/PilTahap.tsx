"use client";

import { useId, useState } from "react";

import type { TahapTimeline } from "@/lib/landing-content";

/** Pil timeline: idle polos, hover bercahaya, klik membuka tanggal. */
export function PilTahap({ tahap }: { tahap: TahapTimeline }) {
  const [terbuka, setTerbuka] = useState(false);
  const idDetail = useId();

  return (
    <div
      className={
        terbuka
          ? "-mx-2 -mt-3 rounded-[47px] border-2 border-bkui-hijau-tua bg-gradient-to-b from-bkui-kartu-atas to-bkui-kartu-bawah px-2 pb-3 pt-3"
          : ""
      }
    >
      <button
        type="button"
        aria-expanded={terbuka}
        aria-controls={idDetail}
        onClick={() => setTerbuka((sebelumnya) => !sebelumnya)}
        className="w-full cursor-pointer rounded-full px-6 py-4 text-center font-ui text-lg font-semibold leading-[1.2] text-bkui-terang shadow-[0_2px_10px_rgba(0,0,0,0.25)] transition-shadow duration-300 ease-out group-hover:shadow-[0_0_22px_9px_rgba(255,255,255,0.92),0_0_40px_16px_rgba(169,221,255,0.5),0_2px_10px_rgba(0,0,0,0.25)] focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-bkui-kuning sm:text-[28px]"
        style={{ backgroundImage: "linear-gradient(-57.688deg, #0E4700 9.79%, #018B01 111.06%)" }}
      >
        {tahap.judul}
      </button>
      <div
        id={idDetail}
        aria-hidden={!terbuka}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${terbuka ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="mt-2 text-center font-body text-sm leading-[1.4] text-bkui-teks sm:text-xl">
            {tahap.detail}
          </p>
        </div>
      </div>
    </div>
  );
}
