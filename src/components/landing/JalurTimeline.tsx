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
    durasi: "12s",
    mulai: "3s",
  },
  dua: {
    lebar: 376.803,
    tinggi: 424.491,
    d: "M223.109 50.9978C390.994 57.3765 330.109 258.498 204.109 224.722C52.6089 184.111 -18.391 362.997 141.609 373.498",
    durasi: "8s",
    mulai: "0s",
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
      overflow="visible"
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

/*
 * Satu lintasan gerak utuh pada koordinat frame Timeline 1512x885.
 * Dua path Figma di atas tetap dipakai untuk gambar garisnya, sedangkan path
 * ini menyambungkan keduanya agar hanya ada satu bus dari Roadshow ke Puncak.
 */
const JALUR_BUS_UTUH = [
  "M461.55 299.25",
  "C629.44 305.63 568.55 506.75 442.55 472.97",
  "C291.05 432.36 220.05 611.25 380.05 621.75",
  "L733.1 610.5",
  "C832.1 621 872.61 458.5 786.33 451.5",
  "C712.91 445.55 687.79 323.61 890.99 367",
  "C964.64 382.78 1179.83 380.41 1245.99 367",
  "C1430.99 329.5 1329.99 611 1118.49 558.5",
  "C940.99 514.44 910.69 718.26 1083.99 711",
].join(" ");

export function BusTimeline() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1512 885"
      fill="none"
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      overflow="visible"
    >
      <image
        href="/icon/landing/bikun-extracted.svg"
        width="84"
        height="72"
        x="-42"
        y="-36"
        className="bikun-di-jalur"
      >
        <animate
          attributeName="opacity"
          dur="32s"
          repeatCount="indefinite"
          calcMode="linear"
          keyTimes="0;0.035;0.29;0.32;0.35;0.39;0.53;0.57;0.73;0.77;0.94;0.98;1"
          values="0;1;1;0;0;1;1;0;0;1;1;0;0"
        />
        <animate
          attributeName="width"
          dur="32s"
          repeatCount="indefinite"
          calcMode="linear"
          keyTimes="0;0.035;0.29;0.32;0.35;0.39;0.53;0.57;0.73;0.77;0.94;0.98;1"
          values="10;84;84;10;10;84;84;10;10;84;84;10;10"
        />
        <animate
          attributeName="height"
          dur="32s"
          repeatCount="indefinite"
          calcMode="linear"
          keyTimes="0;0.035;0.29;0.32;0.35;0.39;0.53;0.57;0.73;0.77;0.94;0.98;1"
          values="9;72;72;9;9;72;72;9;9;72;72;9;9"
        />
        <animate
          attributeName="x"
          dur="32s"
          repeatCount="indefinite"
          calcMode="linear"
          keyTimes="0;0.035;0.29;0.32;0.35;0.39;0.53;0.57;0.73;0.77;0.94;0.98;1"
          values="-5;-42;-42;-5;-5;-42;-42;-5;-5;-42;-42;-5;-5"
        />
        <animate
          attributeName="y"
          dur="32s"
          repeatCount="indefinite"
          calcMode="linear"
          keyTimes="0;0.035;0.29;0.32;0.35;0.39;0.53;0.57;0.73;0.77;0.94;0.98;1"
          values="-4.5;-36;-36;-4.5;-4.5;-36;-36;-4.5;-4.5;-36;-36;-4.5;-4.5"
        />
        <animateMotion
          path={JALUR_BUS_UTUH}
          dur="32s"
          repeatCount="indefinite"
          rotate="0"
          calcMode="paced"
        />
      </image>
    </svg>
  );
}
