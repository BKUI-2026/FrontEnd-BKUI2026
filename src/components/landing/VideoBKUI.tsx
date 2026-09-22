import { HiasanVideo } from "@/components/landing/HiasanVideo";
import { DekorBendera, SectionLangit } from "@/components/landing/SectionLangit";
import { JudulSticker } from "@/components/ui/JudulSticker";
import { Muncul } from "@/components/ui/Muncul";
import { VIDEO_LANDING } from "@/lib/landing-content";

const HURUF_COMING_SOON = Array.from("Coming Soon");

function LapisanComingSoon({ className }: { className: string }) {
  return (
    <span aria-hidden className={`col-start-1 row-start-1 ${className}`}>
      {HURUF_COMING_SOON.map((huruf, index) => (
        <span key={`${huruf}-${index}`} className="coming-soon__huruf">
          {huruf === " " ? "\u00a0" : huruf}
        </span>
      ))}
    </span>
  );
}

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
 * tampil sekarang bingkai dengan copy “Coming Soon” — bukan iframe ke URL
 * tebakan.
 */
export function VideoBKUI() {
  return (
    <SectionLangit tanpaAwan className="min-h-[58.53vw] pb-16 pt-[max(150px,10.85vw)] sm:pb-24">
      {/* Bendera di tepi atas, lalu seluruh hiasan ilustrasi dari Figma */}
      <DekorBendera />
      <HiasanVideo />

      <div className="relative mx-auto flex w-full max-w-[1144px] flex-col items-center gap-6 px-5 sm:gap-0 sm:px-8">
        {/* z-10 supaya judulnya tetap di atas bingkai yang menindihnya. */}
        <Muncul className="relative z-10">
          {/* Ukuran "title" (72px), bukan "h2" (48px): di Figma judul ini
              selebar 446px pada frame 1512, dan h2 cuma menghasilkan ~302px. */}
          <JudulSticker as="h2" ukuran="title" className="-mb-15">
            {VIDEO_LANDING.judul}
          </JudulSticker>
        </Muncul>

        {/*
          Bingkai kuning tebal dari Figma. Dibangun dengan border + radius, bukan
          gambar, supaya isinya bisa berupa <video>/<iframe> sungguhan begitu
          URL-nya ada, dan rasionya tetap 16:9 di semua lebar layar.
        */}
        {/*
          Naik sedikit supaya tepi atas bingkai tertindih judulnya, persis
          seperti di Figma. Hanya dari `sm` ke atas — di layar sempit judul
          dan bingkai butuh jarak supaya keduanya tetap terbaca.
        */}
        <Muncul jeda={120} className="w-full max-w-[996px] rounded-xl sm:-mt-[1.8vw] border-[10px] border-bkui-kuning-bingkai shadow-[0_6px_18px_rgba(0,0,0,0.18)] sm:border-[14px]">
          <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-sm bg-bkui-krem-kartu">
            {VIDEO_LANDING.url ? (
              <iframe
                src={VIDEO_LANDING.url}
                title={`Video ${VIDEO_LANDING.judul} BKUI 2026`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full rounded-sm"
              />
            ) : (
              <p className="coming-soon-melayang relative inline-grid whitespace-nowrap px-[0.3em] py-[0.28em] text-center font-display text-4xl leading-[1.4] sm:text-6xl lg:text-7xl">
                {/*
                  Placeholder ini memakai susunan stiker seperti judul section,
                  tetapi paletnya mengikuti pemutar video: oranye sebagai
                  outline luar, kuning dari bingkai, krem sebagai pemisah, dan
                  cokelat sebagai isi agar tetap nyaman di latar krem.
                */}
                <span className="sr-only">Coming Soon</span>
                <LapisanComingSoon className="text-bkui-oranye [-webkit-text-stroke:0.28em_#e8d61b] [paint-order:stroke_fill] [text-shadow:0.077em_0.118em_0.024em_rgb(51_18_1_/_0.28)]" />
                <LapisanComingSoon className="text-bkui-krem [-webkit-text-stroke:0.11em_#fff6e6] [paint-order:stroke_fill]" />
                <LapisanComingSoon className="text-bkui-coklat" />
              </p>
            )}
          </div>
        </Muncul>
      </div>
    </SectionLangit>
  );
}
