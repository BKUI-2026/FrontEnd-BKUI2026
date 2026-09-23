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
          ? "-mx-1 -mt-1 rounded-[47px] border border-bkui-hijau-tua bg-gradient-to-b from-bkui-kartu-atas to-bkui-kartu-bawah px-1 pb-1 pt-1 sm:-mx-2 sm:-mt-3 sm:border-2 sm:px-2 sm:pb-3 sm:pt-3"
          : ""
      }
    >
      <button
        type="button"
        aria-expanded={terbuka}
        aria-controls={idDetail}
        onClick={() => setTerbuka((sebelumnya) => !sebelumnya)}
        className="flex h-[clamp(1.65rem,6.9vw,6.5rem)] w-full cursor-pointer items-center justify-center overflow-hidden rounded-full px-[clamp(0.2rem,1.6vw,1.5rem)] py-0 text-center font-ui text-[clamp(0.375rem,1.85vw,1.75rem)] font-semibold leading-[1.08] text-bkui-terang shadow-[0_2px_10px_rgba(0,0,0,0.25)] transition-shadow duration-300 ease-out [-webkit-text-size-adjust:none] [text-size-adjust:none] group-hover:shadow-[0_0_22px_9px_rgba(255,255,255,0.92),0_0_40px_16px_rgba(169,221,255,0.5),0_2px_10px_rgba(0,0,0,0.25)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bkui-kuning sm:leading-[1.15] sm:focus-visible:outline-4 sm:focus-visible:outline-offset-4"
        style={{ backgroundImage: "linear-gradient(-57.688deg, #0E4700 9.79%, #018B01 111.06%)" }}
      >
        {tahap.judul.endsWith("2026") ? (
          <>
            {tahap.judul.slice(0, -4)}
            <span className="font-extrabold">2026</span>
          </>
        ) : (
          tahap.judul
        )}
      </button>
      <div
        id={idDetail}
        aria-hidden={!terbuka}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${terbuka ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="mt-1 text-center font-body text-[clamp(0.45rem,1.32vw,1.25rem)] leading-[1.3] text-bkui-teks sm:mt-2 sm:leading-[1.4]">
            {tahap.detail}
          </p>
        </div>
      </div>
    </div>
  );
}
