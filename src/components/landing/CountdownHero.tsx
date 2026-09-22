"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const TARGET_BAWAAN = "2026-12-19T00:00:00+07:00";
const TARGET_COUNTDOWN = process.env.NEXT_PUBLIC_BKUI_COUNTDOWN_TARGET ?? TARGET_BAWAAN;

const LATAR_COUNTDOWN = [
  "/icon/landing/latest/countdown-bg-1.svg",
  "/icon/landing/latest/countdown-bg-2.svg",
  "/icon/landing/latest/countdown-bg-3.svg",
] as const;

const WARNA_LABEL_COUNTDOWN = ["#FF5C07", "#3570B6", "#FEEC1E"] as const;

interface SisaWaktu {
  hari: number;
  jam: number;
  menit: number;
  detik: number;
}

function hitungSisaWaktu(target: number): SisaWaktu {
  const sisaDetik = Math.max(0, Math.floor((target - Date.now()) / 1000));
  const hari = Math.floor(sisaDetik / 86_400);
  const jam = Math.floor((sisaDetik % 86_400) / 3_600);
  const menit = Math.floor((sisaDetik % 3_600) / 60);
  const detik = sisaDetik % 60;

  return { hari, jam, menit, detik };
}

function formatAngka(angka: number) {
  return String(angka).padStart(2, "0");
}

/**
 * Countdown Hero yang target waktunya dikonfigurasi melalui
 * `NEXT_PUBLIC_BKUI_COUNTDOWN_TARGET` (ISO 8601 dengan timezone).
 *
 * Selama masih satu hari atau lebih, prioritasnya hari–jam–menit. Dalam 24 jam
 * terakhir, prioritas bergeser ke jam–menit–detik agar urgensinya terbaca.
 */
export function CountdownHero() {
  const target = new Date(TARGET_COUNTDOWN).getTime();
  const targetValid = Number.isFinite(target) ? target : new Date(TARGET_BAWAAN).getTime();
  const [sisa, setSisa] = useState<SisaWaktu | null>(null);

  useEffect(() => {
    const perbarui = () => setSisa(hitungSisaWaktu(targetValid));
    perbarui();

    const interval = window.setInterval(perbarui, 1_000);
    return () => window.clearInterval(interval);
  }, [targetValid]);

  const kurangDariSehari = sisa !== null && sisa.hari === 0;
  const unit = kurangDariSehari
    ? [
        { label: "Hours", nilai: sisa?.jam ?? 0 },
        { label: "Minutes", nilai: sisa?.menit ?? 0 },
        { label: "Seconds", nilai: sisa?.detik ?? 0 },
      ]
    : [
        { label: "Days", nilai: sisa?.hari ?? 0 },
        { label: "Hours", nilai: sisa?.jam ?? 0 },
        { label: "Minutes", nilai: sisa?.menit ?? 0 },
      ];

  return (
    <section
      aria-label="Hitung mundur acara BKUI 2026"
      role="timer"
      className="flex items-start justify-center"
    >
      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-start gap-x-2 sm:gap-x-5 lg:gap-x-6">
        {unit.map((item, index) => (
          <div key={item.label} className="contents">
            <UnitCountdown
              nomor={formatAngka(item.nilai)}
              label={item.label}
              latar={LATAR_COUNTDOWN[index]}
              warna={WARNA_LABEL_COUNTDOWN[index]}
              urutan={index}
            />
            {index < unit.length - 1 && (
              <span aria-hidden className="mt-[clamp(27px,3.4vw,52px)] font-display text-[clamp(1.25rem,3.4vw,3.6rem)] leading-none text-bkui-krem [text-shadow:0_0.08em_0_rgb(61_38_9_/_0.28)]">
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function UnitCountdown({
  nomor,
  label,
  latar,
  warna,
  urutan,
}: {
  nomor: string;
  label: string;
  latar: string;
  warna: string;
  urutan: number;
}) {
  return (
    <div className="flex w-[clamp(70px,9.5vw,150px)] flex-col items-center gap-2 sm:gap-4">
      <div className="relative aspect-[682/713] w-full">
        <div
          aria-hidden
          style={{ animationDelay: `${urutan * -10}s` }}
          className="countdown-ornamen-berputar absolute inset-0"
        >
          <Image
            src={latar}
            alt=""
            fill
            sizes="(min-width: 1024px) 150px, 70px"
            className="scale-[1.28] object-contain sm:scale-[1.22]"
          />
        </div>
        <output
          style={{ color: warna }}
          className="absolute inset-0 flex items-center justify-center pb-[4%] font-ui text-[clamp(1.7rem,4vw,4rem)] font-extrabold tracking-[-0.08em] [text-shadow:0_0.07em_0.02em_rgb(61_38_9_/_0.35)]"
        >
          {nomor}
        </output>
      </div>
      <p
        className="font-ui text-amber-50  text-[clamp(1rem,1.5vw,1.5rem)] font-extrabold uppercase tracking-[0.04em] [text-shadow:0_0.1em_0_rgb(61_38_9_/_0.28)]"
      >
        {label}
      </p>
    </div>
  );
}
