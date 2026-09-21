import Image from "next/image";

import { SectionLangit } from "@/components/landing/SectionLangit";
import { BarisFAQ } from "@/components/landing/BarisFAQ";
import { JudulSticker } from "@/components/ui/JudulSticker";
import { Muncul } from "@/components/ui/Muncul";
import { SponsorCarousel } from "@/components/landing/SponsorCarousel";
import { DAFTAR_FAQ } from "@/lib/landing-content";

/**
 * Section Frequently Asked Questions — accordion.
 *
 * Section ini tetap server component; tiap baris FAQ adalah client component
 * kecil supaya tinggi jawaban dapat dianimasikan tanpa mengirim dekorasi atau
 * daftar konten statis ke browser.
 *
 * Beberapa panel boleh terbuka bersamaan (tidak dikunci satu-satunya) — di
 * Figma tidak ada indikasi panel lain harus tertutup, dan memaksa menutup
 * jawaban yang sedang dibaca orang lebih menjengkelkan daripada membantu.
 */
export function FAQ() {
  return (
    <SectionLangit
      tanpaAwan
      className="pt-[max(48px,4.5vw)]"
      dekorasi={
        <>
          <Image
            src="/image/landing/faq-background.png"
            alt=""
            aria-hidden
            fill
            sizes="100vw"
            className="pointer-events-none -z-10 object-fill"
          />
          <Image
            src="/image/landing/faq-star.png"
            alt=""
            aria-hidden
            width={296}
            height={307}
            className="faq-gap-flower pointer-events-none absolute right-[2%] top-1 z-10 h-auto w-[clamp(108px,12vw,180px)]"
          />
        </>
      }
    >
      <div className="relative mx-auto flex w-full max-w-[1072px] flex-col items-center gap-8 px-5 pb-[max(48px,5vw)] pt-40 sm:gap-10 sm:px-8 sm:pt-44 lg:pt-48">
        <Muncul>
          <JudulSticker as="h2" ukuran="h1" className="text-center">
            Frequently Asked Questions
          </JudulSticker>
        </Muncul>

        <ul className="flex w-full flex-col gap-3 sm:gap-4">
          {DAFTAR_FAQ.slice(0, 6).map((item, i) => (
            <li key={item.id}>
              <Muncul jeda={i * 80}>
                {/* Panel pertama terbuka sejak awal, sama seperti di Figma. */}
                <BarisFAQ item={item} terbukaAwal={i === 0} />
              </Muncul>
            </li>
          ))}
        </ul>
        {DAFTAR_FAQ.length > 6 && (
          <details className="group w-full">
            <summary className="mx-auto flex w-fit cursor-pointer list-none items-center gap-2 rounded-full bg-bkui-hijau px-6 py-3 font-ui text-lg text-white [&::-webkit-details-marker]:hidden">
              Lihat pertanyaan lainnya
              <Image src="/icon/landing/chevron-bawah.svg" alt="" aria-hidden width={24} height={24} className="size-6 brightness-0 invert transition-transform group-open:rotate-180" />
            </summary>
            <ul className="mt-6 flex flex-col gap-3 sm:gap-4">
              {DAFTAR_FAQ.slice(6).map((item) => (
                <li key={item.id}><BarisFAQ item={item} terbukaAwal={false} /></li>
              ))}
            </ul>
          </details>
        )}
      </div>
      <SponsorCarousel tergabung />
    </SectionLangit>
  );
}
