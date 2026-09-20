import Image from "next/image";

import { DekorBendera, SectionLangit } from "@/components/landing/SectionLangit";
import { JudulSticker } from "@/components/ui/JudulSticker";
import { Muncul } from "@/components/ui/Muncul";
import { DAFTAR_TOKOH, type Tokoh } from "@/lib/landing-content";
import { Timeline } from "./Timeline";

/**
 * Section "Tokoh Inspirasi" — Speakers di daftar fitur AGENTS.md bagian 4.
 *
 * Enam narasumber dari dokumen tim ditata tiga kolom x dua baris di desktop;
 * jumlah kartu selalu mengikuti data, tanpa slot tambahan.
 */
export function TokohInspirasi() {
  return (
    <SectionLangit className="pb-16 pt-[max(120px,12vw)]">
      <DekorBendera />

      <div className="relative mx-auto flex w-full max-w-[1360px] flex-col items-center px-5 sm:px-8">
        <Muncul>
          <JudulSticker as="h2" ukuran="h1">
            Previous Speakers
          </JudulSticker>
        </Muncul>

        <ul className="mt-10 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DAFTAR_TOKOH.map((tokoh, i) => (
            <li key={tokoh.id}>
              {/* Jeda dibatasi 3 langkah (sepanjang satu baris grid) lalu
                  berulang — kalau terus bertambah, kartu terakhir baru muncul
                  jauh setelah yang pertama dan malah terasa lambat. */}
              <Muncul jeda={(i % 3) * 90} className="h-full">
                <KartuTokoh tokoh={tokoh} />
              </Muncul>
            </li>
          ))}
        </ul>
      </div>
      <Timeline tergabung />
    </SectionLangit>
  );
}

/**
 * Satu kartu tokoh: foto berbingkai membulat, nama, lalu keterangan singkat.
 *
 * Foto berasal dari dokumen tim. Siluet tetap menjadi fallback jika kelak
 * ada entri yang belum memiliki foto.
 */
function KartuTokoh({ tokoh }: { tokoh: Tokoh }) {
  return (
    <article className="flex h-full flex-col items-center gap-6 rounded-3xl border-2 border-bkui-coklat-garis bg-gradient-to-b from-bkui-kartu-atas to-bkui-kartu-bawah px-6 pb-6 pt-8 transition-transform duration-300 hover:-translate-y-1.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div className="relative aspect-square w-full max-w-[276px]">
        {tokoh.foto ? (
          <Image
            src={tokoh.foto}
            alt=""
            fill
            sizes="276px"
            className="rounded-[22px] object-cover"
          />
        ) : (
          /*
            Siluet placeholder. Dibuat dari dua bentuk sederhana (kepala +
            bahu) yang dipotong bingkai membulat — cukup untuk menandakan
            "foto belum ada" tanpa perlu file gambar tambahan.
          */
          <div
            aria-hidden
            className="absolute inset-0 overflow-hidden rounded-[22px] bg-bkui-kartu-bawah"
          >
            <div className="absolute left-1/2 top-[16%] h-[34%] w-[38%] -translate-x-1/2 rounded-full bg-bkui-coklat" />
            <div className="absolute left-1/2 top-[46%] h-[60%] w-[68%] -translate-x-1/2 rounded-t-[50%] bg-bkui-coklat" />
          </div>
        )}

        {/* Bingkai bergaris dari Figma, ditumpuk di atas foto/siluet */}
        <Image
          src="/icon/landing/bingkai-foto.svg"
          alt=""
          aria-hidden
          fill
          className="pointer-events-none"
        />
      </div>

      <div className="flex flex-col items-center gap-1 text-bkui-coklat">
        <h3 className="text-center font-ui text-2xl font-semibold leading-[1.2] sm:text-[28px]">
          {tokoh.nama}
        </h3>
        <p className="text-center font-body text-base leading-[1.2]">
          {tokoh.keterangan}
        </p>
      </div>
    </article>
  );
}
