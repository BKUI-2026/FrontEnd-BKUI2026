/**
 * Jalur putus-putus yang menghubungkan tahap-tahap Timeline.
 *
 * SVG-nya ditulis inline, bukan dimuat sebagai berkas gambar, supaya
 * `stroke-dashoffset`-nya bisa dianimasikan — titik-titiknya berjalan mengikuti
 * arah rangkaian acara. Kalau dimuat sebagai gambar, isi SVG-nya tidak bisa
 * disentuh CSS sama sekali.
 *
 * Data `path`, warna, tebal garis, dan pola putus-putusnya disalin apa adanya
 * dari ekspor Figma (`244:213` dan `258:259`) — tidak ada yang digambar ulang.
 *
 * Bayangan lembut pada jalur kedua (filter Gaussian di Figma) sengaja tidak
 * dibawa: di layar efeknya nyaris tidak terlihat, tapi filter SVG memaksa
 * browser me-render ulang tiap frame animasi dan itu terasa di HP.
 */

/** Pola putus-putus "12 12" → satu siklus penuh bergeser 24. */
const JALUR = {
  satu: {
    lebar: 615.011,
    tinggi: 359.485,
    d: "M353.406 356.316C180.1 363.579 210.407 159.756 387.906 203.816C599.407 256.316 700.407 -25.1836 515.407 12.3164C449.252 25.7261 234.061 28.0994 160.407 12.3164C-42.1027 -31.0785 -16.7923 90.86 56.6259 96.8164C142.907 103.816 102.407 266.317 3.40667 255.816",
  },
  dua: {
    lebar: 376.803,
    tinggi: 424.491,
    d: "M223.109 50.9978C390.994 57.3765 330.109 258.498 204.109 224.722C52.6089 184.111 -18.391 362.997 141.609 373.498",
  },
} as const;

export function JalurTimeline({
  jalur,
  className,
  style,
}: {
  jalur: keyof typeof JALUR;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { lebar, tinggi, d } = JALUR[jalur];

  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${lebar} ${tinggi}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path
        d={d}
        stroke="#134921"
        strokeWidth={6}
        strokeDasharray="12 12"
        className="jalur-mengalir"
      />
    </svg>
  );
}
