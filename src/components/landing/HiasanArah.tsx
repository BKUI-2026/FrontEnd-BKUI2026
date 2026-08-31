import Image from "next/image";

/**
 * Hiasan ilustrasi section "Arah Petualangan" — tiga lengkung hijau di
 * belakang papan, dan dua semak di dasar section.
 *
 * Komponen asli dari Figma (node `286:871`, `286:872`, `286:873`, `299:1008`,
 * `299:1012`), diposisikan dari koordinat `get_design_context` node `100:647`.
 *
 * Lengkung tengah sengaja tetap dipasang walau sebagian besar tertutup papan —
 * bagian yang mengintip di celah antara kedua papan itu yang bikin ketiganya
 * terbaca sebagai satu garis menerus di belakang papan.
 */

interface Hiasan {
  berkas: string;
  /** Titik tengah kotak pembatas, persen terhadap kanvas 1512x885. */
  kiri: string;
  atas: string;
  lebar: string;
  tinggi: string;
  putar: string;
}

/** Urutan array = urutan layer di Figma (paling awal paling belakang). */
const HIASAN: readonly Hiasan[] = [
  { berkas: "lengkung-tengah.svg", kiri: "50.0%", atas: "54.76%", lebar: "23.08%", tinggi: "18.06%", putar: "rotate(15.44deg)" },
  { berkas: "lengkung-kanan.svg", kiri: "94.57%", atas: "51.5%", lebar: "23.08%", tinggi: "18.06%", putar: "rotate(-32.83deg) scaleX(-1)" },
  { berkas: "lengkung-kiri.svg", kiri: "5.48%", atas: "51.72%", lebar: "23.08%", tinggi: "18.06%", putar: "rotate(32.83deg)" },
  { berkas: "semak-kiri.svg", kiri: "9.95%", atas: "91.52%", lebar: "34.02%", tinggi: "33.63%", putar: "rotate(22.88deg) skewX(0.87deg)" },
  { berkas: "semak-kanan.svg", kiri: "95.07%", atas: "92.54%", lebar: "34.02%", tinggi: "33.63%", putar: "rotate(-22.88deg) skewX(0.87deg) scaleX(-1)" },
] as const;

export function HiasanArah() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 aspect-[1512/885] w-full min-w-[900px]"
    >
      {HIASAN.map((h) => (
        <Image
          key={h.berkas}
          src={`/icon/landing/arah/${h.berkas}`}
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          className="absolute"
          style={{
            left: h.kiri,
            top: h.atas,
            width: h.lebar,
            height: h.tinggi,
            transform: `translate(-50%, -50%) ${h.putar}`,
          }}
        />
      ))}
    </div>
  );
}
