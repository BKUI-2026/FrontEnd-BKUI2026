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
      className="pt-[max(48px,4.5vw)]"
      dekorasi={
        <>
          {/* <Image src="/icon/landing/latest/faq-decoration.svg" alt="" aria-hidden width={965} height={424} className="pointer-events-none absolute left-1/2 top-0 -z-10 h-auto w-[max(100%,965px)] max-w-none -translate-x-1/2" />
          <Image src="/image/landing/faq-star.png" alt="" aria-hidden width={296} height={307} className="pointer-events-none absolute -left-[3%] top-[2%] w-[clamp(100px,17vw,260px)] rotate-[-7deg]" />
          <Image src="/icon/landing/latest/faq-grass-back.svg" alt="" aria-hidden width={2634} height={811} className="pointer-events-none absolute bottom-[10%] left-1/2 -z-10 h-auto w-[max(120%,1512px)] max-w-none -translate-x-1/2" />
          <div aria-hidden className="pointer-events-none absolute bottom-[10%] -left-[12%] -z-10 h-[28%] w-[65%] bg-[#064618] [clip-path:polygon(0_0,65%_8%,100%_100%,0_100%)]" />
          <Image src="/icon/landing/latest/faq-grass-front.svg" alt="" aria-hidden width={2576} height={482} className="pointer-events-none absolute bottom-[10%] left-1/2 -z-10 h-auto w-[max(120%,1512px)] max-w-none -translate-x-1/2" /> */}

           <Image
            src="/icon/landing/latest/testi-faq-transition.webp"
            alt=""
            width={1700}
            height={1300}
            className="absolute top-0 left-0 h-[45vw] w-full max-w-none object-cover object-bottom sm:h-auto sm:object-contain"
          ></Image>



        </>
      }
    >
      <div className="relative mx-auto flex w-full max-w-[1072px] flex-col items-center gap-8 px-5 pb-[max(48px,5vw)] sm:gap-10 sm:px-8 pt-30">
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
