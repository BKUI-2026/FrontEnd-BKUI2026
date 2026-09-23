"use client";

import Image from "next/image";
import type { MouseEvent } from "react";

const INSTAGRAM_DM_URL =
  "https://www.instagram.com/direct/t/17844938015330878/";
const INSTAGRAM_MOBILE_DM_URL = "https://ig.me/m/bkui.official";

export function MinCanButton() {
  const bukaInstagram = (event: MouseEvent<HTMLAnchorElement>) => {
    if (window.matchMedia("(max-width: 767px)").matches) {
      event.preventDefault();
      window.location.href = INSTAGRAM_MOBILE_DM_URL;
    }
  };

  return (
    <a
      href={INSTAGRAM_DM_URL}
      onClick={bukaInstagram}
      target="_blank"
      rel="noreferrer"
      aria-label="Tanya MinCan melalui Instagram"
      className="group fixed bottom-4 right-3 z-[70] flex items-center gap-2 focus-visible:outline-none sm:bottom-7 sm:right-7"
    >
      <span className="relative rounded-2xl border-2 border-bkui-coklat-garis bg-white px-3 py-2 font-ui text-xs font-semibold text-bkui-hijau-tua shadow-[3px_4px_0_#754325] transition-transform duration-200 group-hover:-translate-y-1 group-focus-visible:-translate-y-1 sm:px-4 sm:text-base">
        Tanya MinCan Aja!
        <span
          aria-hidden
          className="absolute -right-[8px] top-1/2 size-4 -translate-y-1/2 rotate-45 border-r-2 border-t-2 border-bkui-coklat-garis bg-white"
        />
      </span>

      <span className="relative size-16 shrink-0 overflow-hidden rounded-full border-[3px] border-bkui-coklat-garis bg-bkui-kuning shadow-[4px_5px_0_#754325] transition-transform duration-200 group-hover:scale-105 group-focus-visible:scale-105 sm:size-20">
        <Image
          src="/image/landing/hero/maskot.webp"
          alt="MinCan"
          width={800}
          height={800}
          className="absolute -top-[19px] left-1/2 h-auto w-[132px] max-w-none -translate-x-1/2 sm:-top-6 sm:w-[164px]"
        />
      </span>
    </a>
  );
}
