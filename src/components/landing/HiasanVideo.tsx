import Image from "next/image";
import type { CSSProperties } from "react";

/**
 * Hiasan ilustrasi section After Movie — bukit, pohon, bunga, jamur, rumput.
 *
 * Semua elemen di sini adalah **komponen asli dari Figma** (SVG hasil ekspor
 * node-nya masing-masing), bukan potongan gambar section. Posisi, ukuran, dan
 * sudut putarnya disalin apa adanya dari `get_design_context` node `100:159`,
 * lalu diubah ke persen terhadap kanvas Figma 1512x885.
 *
 * ---------------------------------------------------------------------------
 * Cara koordinatnya dihitung
 * ---------------------------------------------------------------------------
 * Figma melaporkan kotak pembatas SETELAH elemen diputar, sementara berkas
 * SVG-nya belum diputar. Jadi tiap elemen ditaruh di TITIK TENGAH kotak
 * pembatas itu (`kiri`/`atas`), diberi ukuran artwork aslinya
 * (`lebar`/`tinggi`), lalu diputar dari titik tengahnya. Kalau dipasang pakai
 * pojok kiri-atas, elemen yang diputar akan meleset makin jauh makin besar
 * sudutnya.
 *
 * Semuanya persen terhadap satu pembungkus berasio 1512:885, jadi seluruh
 * komposisi mengecil/membesar sebagai satu kesatuan dan hubungan antar elemen
 * tidak pernah berubah — sama persis seperti di Figma.
 */

interface Hiasan {
  berkas: string;
  /** Titik tengah kotak pembatas, persen terhadap lebar kanvas. */
  kiri: string;
  /** Titik tengah kotak pembatas, persen terhadap tinggi kanvas. */
  atas: string;
  lebar: string;
  tinggi: string;
  putar: string | null;
  /** Ikut tertiup angin. Sudut, durasi, & fase awalnya per elemen. */
  goyang?: { sudut: string; durasi: string; mulai: string };
}

/** Urutan array = urutan layer di Figma (paling awal paling belakang). */
const HIASAN: readonly Hiasan[] = [
  {
    berkas: "bukit-1.svg",
    kiri: "72.026%",
    atas: "83.8408%",
    lebar: "84.5308%",
    tinggi: "57.7201%",
    putar: "rotate(180deg) scaleY(-1)",
  },
  {
    berkas: "bukit-2.svg",
    kiri: "33.5813%",
    atas: "90.9456%",
    lebar: "80.6289%",
    tinggi: "81.4887%",
    putar: "rotate(-151.49deg) scaleY(-1)",
  },
  {
    berkas: "bunga-tengah.svg",
    kiri: "40.3679%",
    atas: "93.6945%",
    lebar: "15.2975%",
    tinggi: "24.7794%",
    putar: "rotate(-43.88deg)",
    goyang: { sudut: "4.2deg", durasi: "3.8s", mulai: "-1.2s" },
  },
  {
    berkas: "bunga-kiri.svg",
    kiri: "5.0434%",
    atas: "73.1103%",
    lebar: "20.9507%",
    tinggi: "33.9367%",
    putar: "rotate(-61.8deg)",
    goyang: { sudut: "4.6deg", durasi: "4.2s", mulai: "-3s" },
  },
  {
    berkas: "bukit-3.svg",
    kiri: "67.7888%",
    atas: "96.3044%",
    lebar: "67.1252%",
    tinggi: "32.6088%",
    putar: null,
  },
  {
    berkas: "bunga-besar.svg",
    kiri: "6.9504%",
    atas: "90.1045%",
    lebar: "37.295%",
    tinggi: "51.2429%",
    putar: "rotate(21.87deg)",
    goyang: { sudut: "2.8deg", durasi: "5.2s", mulai: "-2s" },
  },
  {
    berkas: "pohon.svg",
    kiri: "95.6349%",
    atas: "43.9401%",
    lebar: "53.0503%",
    tinggi: "94.6599%",
    putar: "scaleX(-1)",
    goyang: { sudut: "2.5deg", durasi: "5.6s", mulai: "-3.5s" },
  },
  {
    berkas: "rumput-5.svg",
    kiri: "25.8995%",
    atas: "79.7167%",
    lebar: "3.2564%",
    tinggi: "3.7174%",
    putar: "rotate(-18.76deg)",
    goyang: { sudut: "7deg", durasi: "2.2s", mulai: "-0.6s" },
  },
  {
    berkas: "rumput-1.svg",
    kiri: "62.4075%",
    atas: "94.632%",
    lebar: "3.2564%",
    tinggi: "3.7174%",
    putar: "rotate(-18.76deg)",
    goyang: { sudut: "6.2deg", durasi: "2.5s", mulai: "-1.4s" },
  },
  {
    berkas: "rumput-3.svg",
    kiri: "67.3391%",
    atas: "88.3528%",
    lebar: "2.0685%",
    tinggi: "2.3612%",
    putar: "rotate(-18.76deg)",
    goyang: { sudut: "8deg", durasi: "2s", mulai: "-2s" },
  },
  {
    berkas: "rumput-4.svg",
    kiri: "73.8453%",
    atas: "91.0873%",
    lebar: "3.2564%",
    tinggi: "3.7174%",
    putar: "rotate(-18.76deg)",
    goyang: { sudut: "6.6deg", durasi: "2.8s", mulai: "-0.9s" },
  },
  {
    berkas: "rumput-2.svg",
    kiri: "75.8195%",
    atas: "101.9788%",
    lebar: "3.2564%",
    tinggi: "3.7174%",
    putar: "rotate(-18.76deg)",
    goyang: { sudut: "7.4deg", durasi: "2.3s", mulai: "-2.4s" },
  },
  {
    berkas: "rumput-6.svg",
    kiri: "93.7414%",
    atas: "93.1099%",
    lebar: "3.2564%",
    tinggi: "3.7174%",
    putar: "rotate(-18.76deg)",
    goyang: { sudut: "6.4deg", durasi: "2.6s", mulai: "-1.7s" },
  },
  {
    berkas: "bunga-kanan.svg",
    kiri: "95.854%",
    atas: "91.4668%",
    lebar: "18.5081%",
    tinggi: "29.9802%",
    putar: "rotate(-57.19deg)",
    goyang: { sudut: "4.4deg", durasi: "4s", mulai: "-3.6s" },
  },
  {
    berkas: "jamur-kanan.svg",
    kiri: "80.5718%",
    atas: "88.2279%",
    lebar: "5.1952%",
    tinggi: "13.4163%",
    putar: null,
    goyang: { sudut: "2.1deg", durasi: "4.4s", mulai: "-2.2s" },
  },
  {
    berkas: "bukit-4.svg",
    kiri: "10.9063%",
    atas: "90.5918%",
    lebar: "27.6763%",
    tinggi: "29.2966%",
    putar: null,
  },
  {
    berkas: "bukit-5.svg",
    kiri: "46.2973%",
    atas: "108.9045%",
    lebar: "98.7593%",
    tinggi: "75.6989%",
    putar: "rotate(25.72deg)",
  },
  {
    berkas: "jamur-kiri.svg",
    kiri: "5.9045%",
    atas: "91.6798%",
    lebar: "5.1952%",
    tinggi: "13.4162%",
    putar: null,
    goyang: { sudut: "1.9deg", durasi: "4.8s", mulai: "-4s" },
  },
] as const;

export function HiasanVideo() {
  return (
    <div
      aria-hidden
      // Pembungkus dikunci ke rasio kanvas Figma dan ditempel ke tepi bawah
      // section, supaya garis tanah ilustrasinya selalu duduk di dasar section.
      className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 aspect-[1512/885] w-full min-w-[900px]"
    >
      {HIASAN.map((h) => (
        // Posisi ditaruh di pembungkus, animasi goyang di gambarnya. Keduanya
        // sama-sama memakai `transform`, jadi kalau ditumpuk di satu elemen
        // yang belakangan akan menimpa yang duluan dan posisinya kacau.
        //
        // Penengahan HARUS ikut di `transform` yang sama, bukan lewat class
        // `-translate-x-1/2`. Tailwind v4 menulis itu ke properti `translate`
        // yang TERPISAH dari `transform`, jadi elemen yang diputar kena geser
        // dua kali — sekali dari `translate`, sekali dari `transform` di sini.
        <span
          key={h.berkas}
          className="absolute block"
          style={{
            left: h.kiri,
            top: h.atas,
            width: h.lebar,
            height: h.tinggi,
            transform: `translate(-50%, -50%)${h.putar ? ` ${h.putar}` : ""}`,
          }}
        >
          <Image
            src={`/icon/landing/video/${h.berkas}`}
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

      {/*
        Dua bunga di pojok kiri atas. Ini satu-satunya hiasan di section ini yang
        di Figma memang berupa gambar (fill bitmap), bukan vector — jadi tetap
        dipakai sebagai gambar.
      */}
      <Image
        src="/image/landing/video-bunga-oren.webp"
        alt=""
        width={320}
        height={329}
        className="tertiup-angin absolute"
        style={
          {
            left: "-2.4471%",
            top: "23.5684%",
            width: "10.3836%",
            height: "18.2619%",
            "--goyang": "3.8deg",
            "--goyang-durasi": "4.4s",
            "--goyang-mulai": "-1s",
          } as CSSProperties
        }
      />
      <Image
        src="/image/landing/video-bunga-pink.webp"
        alt=""
        width={240}
        height={244}
        className="tertiup-angin absolute"
        style={
          {
            left: "6.3492%",
            top: "38.1921%",
            width: "7.2551%",
            height: "12.5782%",
            "--goyang": "3.4deg",
            "--goyang-durasi": "3.9s",
            "--goyang-mulai": "-2.8s",
          } as CSSProperties
        }
      />
    </div>
  );
}
