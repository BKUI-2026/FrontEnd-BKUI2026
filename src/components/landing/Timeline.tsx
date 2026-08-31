import Image from "next/image";

import { SectionLangit } from "@/components/landing/SectionLangit";
import { JalurTimeline } from "@/components/landing/JalurTimeline";
import { JudulSticker } from "@/components/ui/JudulSticker";
import { Muncul } from "@/components/ui/Muncul";
import { TAHAP_TIMELINE, type TahapTimeline } from "@/lib/landing-content";

/**
 * Section Timeline — rangkaian acara BKUI 2026 dari Roadshow sampai Puncak Acara.
 *
 * Ini satu-satunya bagian Landing Page yang isinya benar-benar berurutan, jadi
 * dirender sebagai <ol> supaya urutannya ikut terbaca screen reader, bukan cuma
 * terlihat dari posisi pil di layar.
 *
 * Ada DUA susunan yang isinya sama:
 * - **lg ke atas** — jalur berkelok seperti di Figma, pil ditempatkan absolut
 *   pada kotak berasio 1512:885. Semua posisi dinyatakan dalam persen hasil
 *   bagi koordinat Figma, jadi seluruh komposisi ikut mengecil utuh.
 * - **di bawah lg** — daftar vertikal dengan garis putus-putus di kiri. Jalur
 *   berkelok tidak dipaksakan ke layar sempit: pil-nya akan jadi terlalu kecil
 *   untuk dibaca.
 *
 * Keduanya membaca `TAHAP_TIMELINE` yang sama; yang tidak dipakai disembunyikan
 * dengan `hidden`, dan hanya satu yang punya <ol> semantik supaya isinya tidak
 * terbaca dua kali.
 */

/** Posisi tiap tahap di jalur berkelok, dalam persen terhadap frame Figma. */
const POSISI: Record<string, { kiri: string; atas: string; lebar: string }> = {
  roadshow: { kiri: "6.81%", atas: "30.06%", lebar: "25.93%" },
  ambassador: { kiri: "23.08%", atas: "62.60%", lebar: "25.93%" },
  mentoring: { kiri: "56.68%", atas: "36.38%", lebar: "28.04%" },
  puncak: { kiri: "66.87%", atas: "73.56%", lebar: "25.93%" },
};

/**
 * Gradien pil hijau, disalin dari Figma (Gradient/11).
 * Ditulis sekali di sini karena dipakai di dua susunan sekaligus.
 */
const GRADIEN_PIL =
  "linear-gradient(-57.688deg, #0E4700 9.79%, #018B01 111.06%)";

export function Timeline() {
  return (
    <SectionLangit className="min-h-[58.53vw] pb-20 pt-[max(48px,5.89vw)] sm:pb-24">
      <div className="relative mx-auto w-full max-w-[1512px] px-5 sm:px-8">
        <div className="flex justify-center">
          <Muncul>
            <JudulSticker as="h2" ukuran="h1">
              Timeline
            </JudulSticker>
          </Muncul>
        </div>

        {/* ---------- Susunan berkelok (lg ke atas) ---------- */}
        <ol className="relative mx-auto hidden aspect-[1512/885] w-full lg:block">
          {/* Jalur putus-putus penghubung antar tahap */}
          <JalurTimeline
            jalur="dua"
            className="absolute left-[15.77%] top-[28.05%] w-[24.87%]"
          />
          <JalurTimeline
            jalur="satu"
            className="absolute left-[48.26%] top-[40.08%] w-[40.67%]"
          />

          {/* Bunga dekoratif */}
          <Bunga src="bunga-besar" kiri="6.04%" atas="67.2%" lebar="10.12%" />
          <Bunga src="bunga-besar" kiri="83.08%" atas="5.79%" lebar="10.12%" />
          <Bunga src="bunga-kecil" kiri="75.6%" atas="17.0%" lebar="6.43%" />
          <Bunga src="bunga-kecil" kiri="14.94%" atas="92.2%" lebar="6.43%" />

          {TAHAP_TIMELINE.map((tahap) => {
            const posisi = POSISI[tahap.id];
            return (
              <li
                key={tahap.id}
                className="absolute"
                style={{
                  left: posisi?.kiri,
                  top: posisi?.atas,
                  width: posisi?.lebar,
                }}
              >
                <PilTahap tahap={tahap} />
              </li>
            );
          })}
        </ol>

        {/* ---------- Susunan vertikal (di bawah lg) ---------- */}
        <ol
          className="mx-auto mt-8 flex max-w-lg flex-col gap-6 border-l-4 border-dashed border-bkui-hijau-tua pl-6 lg:hidden"
          // Daftar berkelok di atas sudah membawa <ol> semantiknya sendiri, tapi
          // hanya satu dari keduanya yang pernah tampil sekaligus — keduanya
          // dibedakan lewat `hidden`, bukan dirender bersamaan.
        >
          {TAHAP_TIMELINE.map((tahap, i) => (
            <li key={tahap.id}>
              <Muncul jeda={i * 110}>
                <PilTahap tahap={tahap} />
              </Muncul>
            </li>
          ))}
        </ol>
      </div>
    </SectionLangit>
  );
}

/**
 * Satu tahap: pil hijau berisi judul, plus kartu krem berisi tanggal kalau ada.
 *
 * Kartu tanggalnya di Figma menyembul di belakang pil (lebih lebar dan lebih
 * tinggi), jadi di sini pil ditaruh DI DALAM kartu dengan margin negatif —
 * bukan dua elemen bertumpuk absolut, supaya tingginya tetap ikut isi teks.
 */
function PilTahap({ tahap }: { tahap: TahapTimeline }) {
  const pil = (
    <p
      className="rounded-full px-6 py-4 text-center font-ui text-lg font-semibold leading-[1.2] text-bkui-terang shadow-[0_2px_10px_rgba(0,0,0,0.25)] sm:text-[28px]"
      style={{ backgroundImage: GRADIEN_PIL }}
    >
      {tahap.judul}
    </p>
  );

  if (!tahap.detail) return pil;

  return (
    <div className="rounded-[47px] border-2 border-bkui-hijau-tua bg-gradient-to-b from-bkui-kartu-atas to-bkui-kartu-bawah p-2 pb-3">
      {/* Pil sedikit lebih sempit dari kartunya, sesuai Figma (392 vs 424). */}
      <div className="-mx-1 -mt-3">{pil}</div>
      <p className="mt-2 text-center font-body text-sm leading-[1.4] text-bkui-teks sm:text-xl">
        {tahap.detail}
      </p>
    </div>
  );
}

function Bunga({
  src,
  kiri,
  atas,
  lebar,
}: {
  src: "bunga-besar" | "bunga-kecil";
  kiri: string;
  atas: string;
  lebar: string;
}) {
  return (
    <Image
      src={`/icon/landing/${src}.svg`}
      alt=""
      aria-hidden
      width={153}
      height={160}
      className="absolute"
      style={{ left: kiri, top: atas, width: lebar, height: "auto" }}
    />
  );
}
