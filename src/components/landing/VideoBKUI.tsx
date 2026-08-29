import Image from "next/image";

import { DekorBendera, SectionLangit } from "@/components/landing/SectionLangit";
import { JudulSticker } from "@/components/ui/JudulSticker";
import { VIDEO_LANDING } from "@/lib/landing-content";

/**
 * Section video Landing Page (Teaser / Trailer / After Movie).
 *
 * Judul section-nya ikut dari data, bukan hardcode "After Movie": AGENTS.md
 * bagian 7 menyebut video di Landing Page berganti sepanjang rangkaian acara
 * (Teaser → Trailer → After Movie) dan diatur dari Admin, jadi labelnya juga
 * ikut berubah.
 *
 * BELUM ADA PEMUTAR VIDEO SUNGGUHAN. `VIDEO_LANDING.url` masih null karena
 * endpoint Content di BE belum ada dan URL videonya belum diberikan. Yang
 * tampil sekarang bingkai kosong dengan keterangan — bukan iframe ke URL
 * tebakan.
 */
export function VideoBKUI() {
  return (
    <SectionLangit className="pb-16 pt-[max(180px,12vw)] sm:pb-24">
      {/* Dekorasi: bendera di atas, pohon di kanan bawah */}
      <DekorBendera />
      <Image
        src="/image/landing/pohon-aftermovie.webp"
        alt=""
        aria-hidden
        width={700}
        height={1210}
        className="pointer-events-none absolute -right-16 bottom-0 -z-10 hidden w-[340px] lg:block"
      />

      <div className="relative mx-auto flex w-full max-w-[1144px] flex-col items-center gap-6 px-5 sm:px-8">
        <JudulSticker as="h2" ukuran="h2">
          {VIDEO_LANDING.judul}
        </JudulSticker>

        {/*
          Bingkai kuning tebal dari Figma. Dibangun dengan border + radius, bukan
          gambar, supaya isinya bisa berupa <video>/<iframe> sungguhan begitu
          URL-nya ada, dan rasionya tetap 16:9 di semua lebar layar.
        */}
        <div className="w-full max-w-[996px] rounded-xl border-[10px] border-bkui-kuning-bingkai bg-bkui-krem-kartu p-2 shadow-[0_6px_18px_rgba(0,0,0,0.18)] sm:border-[14px] sm:p-3">
          <div className="flex aspect-video w-full items-center justify-center rounded-sm bg-bkui-krem-kartu">
            {VIDEO_LANDING.url ? (
              <iframe
                src={VIDEO_LANDING.url}
                title={`Video ${VIDEO_LANDING.judul} BKUI 2026`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full rounded-sm"
              />
            ) : (
              <p className="px-6 text-center font-ui text-base font-semibold text-bkui-coklat/70 sm:text-xl">
                Video {VIDEO_LANDING.judul} belum tersedia
              </p>
            )}
          </div>
        </div>
      </div>
    </SectionLangit>
  );
}
