import Image from "next/image";

import { DekorBendera, SectionLangit } from "@/components/landing/SectionLangit";
import { JudulSticker } from "@/components/ui/JudulSticker";
import { DAFTAR_TOKOH, type Tokoh } from "@/lib/landing-content";

/**
 * Section "Tokoh Inspirasi" — Speakers di daftar fitur AGENTS.md bagian 4.
 *
 * Di Figma grid-nya 4 kolom x 2 baris. Di sini kolomnya turun bertahap
 * (1 → 2 → 3 → 4) mengikuti lebar layar; jumlah kartunya sendiri ikut data,
 * bukan dipatok delapan.
 */
export function TokohInspirasi() {
  return (
    <SectionLangit className="min-h-[58.53vw] pb-20 pt-[max(200px,15.34vw)]">
      <DekorBendera />

      <div className="relative mx-auto flex w-full max-w-[1360px] flex-col items-center px-5 sm:px-8">
        <JudulSticker as="h2" ukuran="h1">
          Tokoh Inspirasi
        </JudulSticker>

        <ul className="mt-10 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {DAFTAR_TOKOH.map((tokoh) => (
            <li key={tokoh.id}>
              <KartuTokoh tokoh={tokoh} />
            </li>
          ))}
        </ul>
      </div>
    </SectionLangit>
  );
}

/**
 * Satu kartu tokoh: foto berbingkai membulat, nama, lalu keterangan singkat.
 *
 * Selama `foto` masih null, yang tampil siluet cokelat polos — sama seperti
 * placeholder di Figma. Foto asli nanti datang dari Admin (AGENTS.md bagian 7),
 * jadi jangan taruh file foto siapa pun di repo ini.
 */
function KartuTokoh({ tokoh }: { tokoh: Tokoh }) {
  return (
    <article className="flex h-full flex-col items-center gap-6 rounded-3xl border-2 border-bkui-coklat-garis bg-gradient-to-b from-bkui-kartu-atas to-bkui-kartu-bawah px-6 pb-6 pt-8">
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
