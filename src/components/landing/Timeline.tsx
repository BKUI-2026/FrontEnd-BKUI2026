import Image from "next/image";

import { SectionLangit } from "@/components/landing/SectionLangit";
import { BusTimeline, JalurTimeline } from "@/components/landing/JalurTimeline";
import { PilTahap } from "@/components/landing/PilTahap";
import { JudulSticker } from "@/components/ui/JudulSticker";
import { Muncul } from "@/components/ui/Muncul";
import { TAHAP_TIMELINE } from "@/lib/landing-content";

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

export function Timeline({ tergabung = false }: { tergabung?: boolean }) {
  const isi = (
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
          <BusTimeline />

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
                className="group absolute hover:z-10 focus-within:z-10"
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
            <li key={tahap.id} className="group">
              <Muncul jeda={i * 110}>
                <PilTahap tahap={tahap} />
              </Muncul>
            </li>
          ))}
        </ol>
      </div>
  );

  if (tergabung) {
    return <div className="w-full pb-20 pt-16 sm:pb-24 sm:pt-24">{isi}</div>;
  }

  return (
    <SectionLangit className="min-h-[58.53vw] pb-20 pt-[max(48px,5.89vw)] sm:pb-24">
      {isi}
    </SectionLangit>
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
