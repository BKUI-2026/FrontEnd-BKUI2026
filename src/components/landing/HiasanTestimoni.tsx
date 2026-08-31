import Image from "next/image";
import type { CSSProperties } from "react";

/**
 * Hiasan ilustrasi section "Apa Kata Mereka" — rimbun pohon cemara di kiri &
 * kanan, plus gunung/tanah di dasar section.
 *
 * Semuanya komponen asli dari Figma (SVG hasil ekspor node `296:883`,
 * `299:947`, `299:1005`, `299:1007`), bukan potongan gambar section.
 *
 * Koordinatnya diambil dari `get_design_context` node `100:695`. Figma menulis
 * posisinya sebagai `inset` persen, lalu diubah ke kiri/atas/lebar/tinggi
 * terhadap kanvas 1512x885.
 *
 * Catatan penting soal ukuran: rumpun pohon di Figma lebih lebar dari kanvasnya
 * (yang kanan mulai di x=1091 dengan lebar 655, jadi meluber 234px ke kanan).
 * Figma mengekspor SVG-nya SUDAH terpotong di batas kanvas — 421x788 dan
 * 443x657. Jadi angka di bawah memakai ukuran hasil potong itu, bukan ukuran
 * grup aslinya; kalau pakai ukuran grup, pohonnya jadi mengecil dan bergeser.
 */

interface Hiasan {
  berkas: string;
  kiri: string;
  atas: string;
  lebar: string;
  tinggi: string;
  cermin?: boolean;
  /** Ikut bergoyang tertiup angin. */
  goyang?: { sudut: string; durasi: string; mulai: string };
}

/**
 * Urutan array = urutan layer di Figma (paling awal paling belakang).
 *
 * Kedua rumpun pohon diberi sudut, durasi, dan jeda mulai yang berbeda supaya
 * tidak bergerak berbarengan. Sudutnya lebih kecil daripada pohon tunggal di
 * After Movie karena di sini yang bergoyang serumpun sekaligus — kalau
 * sudutnya sama besar, sepetak hutan terlihat miring bersamaan.
 */
const HIASAN: readonly Hiasan[] = [
  // Tanah & gunung di dasar section
  { berkas: "tanah-1.svg", kiri: "-36.4418%", atas: "77.6271%", lebar: "115.3439%", tinggi: "48.7006%" },
  { berkas: "tanah-2.svg", kiri: "28.8426%", atas: "91.5254%", lebar: "102.1164%", tinggi: "28.2486%", cermin: true },
  // Rumpun pohon cemara
  { berkas: "pohon-kanan.svg", kiri: "72.2%", atas: "10.9605%", lebar: "27.8439%", tinggi: "89.0395%", goyang: { sudut: "1.7deg", durasi: "6.4s", mulai: "-2s" } },
  { berkas: "pohon-kiri.svg", kiri: "0%", atas: "25.7627%", lebar: "29.2989%", tinggi: "74.2373%", goyang: { sudut: "1.4deg", durasi: "7.4s", mulai: "-5s" } },
] as const;

export function HiasanTestimoni() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 aspect-[1512/885] w-full min-w-[900px]"
    >
      {HIASAN.map((h) => (
        // Posisi di pembungkus, animasi goyang di gambarnya — keduanya sama-sama
        // memakai `transform`, jadi tidak boleh ditumpuk di satu elemen.
        <span
          key={h.berkas}
          className="absolute block"
          style={{
            left: h.kiri,
            top: h.atas,
            width: h.lebar,
            height: h.tinggi,
            transform: h.cermin ? "scaleX(-1)" : undefined,
          }}
        >
          <Image
            src={`/icon/landing/testi/${h.berkas}`}
            alt=""
            width={0}
            height={0}
            sizes="100vw"
            className={`h-full w-full${h.goyang ? " tertiup-angin" : ""}`}
            style={
              h.goyang
                ? ({
                    "--goyang": h.goyang.sudut,
                    "--goyang-durasi": h.goyang.durasi,
                    "--goyang-mulai": h.goyang.mulai,
                  } as CSSProperties)
                : undefined
            }
          />
        </span>
      ))}
    </div>
  );
}
