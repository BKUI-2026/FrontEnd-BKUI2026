"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Lapisan hiasan yang bergerak di atas ilustrasi header Explore UI.
 *
 * Di Figma header ini bukan satu gambar utuh, melainkan tumpukan layer: lanskap
 * (gunung, pohon, bukit, semak sakura), dua matahari di kanan atas, lalu tenda
 * dan maskot di bukit tengah. Layer-nya sengaja diekspor terpisah supaya tiap
 * benda bisa punya gerakannya sendiri — kalau diekspor jadi satu gambar,
 * satu-satunya animasi yang mungkin cuma menggeser seluruh pemandangan.
 *
 * ---------------------------------------------------------------------------
 * Cara menempatkan layer
 * ---------------------------------------------------------------------------
 * Semua posisi ditulis dalam PERSEN terhadap kanvas Figma 1512x885, bukan px.
 * Pembungkusnya mengunci rasio yang sama, jadi satu set angka ini benar di
 * lebar layar berapa pun dan tidak perlu breakpoint sendiri.
 *
 * Angkanya diturunkan langsung dari koordinat Figma, mis. matahari besar ada di
 * x=1279.28 → 1279.28 / 1512 = 84.608%.
 *
 * ---------------------------------------------------------------------------
 * Aset diambil dari gambar SUMBER, bukan dari ekspor node
 * ---------------------------------------------------------------------------
 * Ekspor node Figma selalu ikut membakar latar langit `#84C2F6` jadi kotak
 * biru pekat. Di matahari kotak itu kebetulan tidak kelihatan karena duduk di
 * atas langit yang sewarna, tapi maskot langsung tampil sebagai kotak biru di
 * atas bukit hijau. Jadi yang dipakai di sini gambar sumber yang diunggah
 * desainer (`rawImages`), yang latarnya memang transparan.
 *
 * Dua mataharinya memakai SATU berkas yang sama, cuma beda ukuran — di Figma
 * pun keduanya isian gambar yang identik.
 *
 * CATATAN: dua elipsis kecil di dekat tenda (`Ellipse 2`/`Ellipse 3`, masing-
 * masing < 50px) belum dibawa. Keduanya diputar di Figma sementara SVG hasil
 * ekspornya lurus, dan sudut putarnya tidak terbaca dari metadata — menaruhnya
 * dengan sudut tebakan lebih merusak daripada melewatkannya. Perlu ditanyakan
 * ke desainer.
 */

/** Satu layer hiasan: posisi & ukuran dalam persen kanvas 1512x885. */
interface Layer {
  berkas: string;
  lebarAsli: number;
  tinggiAsli: number;
  kiri: string;
  atas: string;
  lebar: string;
  tinggi: string;
  /** Dibalik mendatar. Dipakai kalau flip di Figma tidak ikut terekspor. */
  cermin?: boolean;
}

/** Berkas matahari, dipakai dua kali dengan ukuran berbeda. */
const MATAHARI = { berkas: "/image/explore/matahari.webp", lebarAsli: 244, tinggiAsli: 249 };

const MATAHARI_BESAR: Layer = {
  ...MATAHARI,
  kiri: "84.608%",
  atas: "5.688%",
  lebar: "16.694%",
  tinggi: "28.717%",
};

const MATAHARI_KECIL: Layer = {
  ...MATAHARI,
  kiri: "78.657%",
  atas: "25.894%",
  lebar: "10.670%",
  tinggi: "18.468%",
};

const MASKOT: Layer = {
  berkas: "/image/explore/maskot-igris.webp",
  lebarAsli: 375,
  tinggiAsli: 375,
  kiri: "37.957%",
  atas: "86.441%",
  lebar: "8.073%",
  tinggi: "13.792%",
};

/*
 * Tenda — satu-satunya layer yang posisinya TIDAK diambil dari metadata Figma.
 *
 * Metadata bounding box node ini tidak konsisten dengan isinya (kotaknya
 * dilaporkan mulai x=696 sementara anak-anaknya ada di x=634..781), dan hasil
 * ekspornya ikut membawa satu elemen 25px yang di Figma jatuh di y=888 — di
 * luar frame 885px, jadi tidak pernah terlihat. Elemen itu melebarkan kotak
 * SVG sampai 556px, tiga kali lebar tendanya sendiri.
 *
 * Elemen nyasarnya sudah dibuang dari `tenda.svg` dan kotaknya dirapatkan ke
 * tinta tendanya (173.74 x 92.54), lalu posisinya DIUKUR dari render Figma:
 * tenda menempati x 524..697, y 746..838 pada kanvas 1512x885.
 *
 * `cermin` wajib: di Figma sisi navy (mulut tenda) ada di KIRI dan sisi oranye
 * di kanan, sementara SVG hasil ekspornya kebalikannya — flip horizontal pada
 * node itu tidak ikut terbawa waktu diekspor.
 */
const TENDA: Layer = {
  berkas: "/icon/explore/tenda.svg",
  lebarAsli: 174,
  tinggiAsli: 93,
  kiri: "34.656%",
  atas: "84.294%",
  lebar: "11.442%",
  tinggi: "10.412%",
  cermin: true,
};

function gaya(l: Layer) {
  return { left: l.kiri, top: l.atas, width: l.lebar, height: l.tinggi };
}

export function HiasanHeader() {
  const kurangiGerak = useReducedMotion();

  /*
   * Matahari berputar pelan, arahnya berlawanan satu sama lain.
   *
   * Satu putaran penuh 90 dan 70 detik — nyaris tidak terlihat kalau dipelototi,
   * tapi cukup untuk bikin sudut langit terasa hidup saat mata lewat. Bentuknya
   * bunga bersudut, jadi memutar cepat sedikit saja langsung terbaca norak dan
   * menarik perhatian dari judul, yang justru tugasnya dibaca.
   */
  const berputar = (detik: number, mundur = false) =>
    kurangiGerak
      ? undefined
      : {
          animate: { rotate: mundur ? -360 : 360 },
          transition: { duration: detik, repeat: Infinity, ease: "linear" as const },
        };

  /* Tenda & maskot cuma mengambang naik-turun beberapa piksel, dengan jeda
     berbeda supaya tidak terlihat bergerak sebagai satu benda. */
  const mengambang = (detik: number, jeda: number, jauh: number) =>
    kurangiGerak
      ? undefined
      : {
          animate: { y: [0, -jauh, 0] },
          transition: {
            duration: detik,
            delay: jeda,
            repeat: Infinity,
            ease: "easeInOut" as const,
          },
        };

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <motion.div className="absolute" style={gaya(MATAHARI_BESAR)} {...berputar(90)}>
        <Image
          src={MATAHARI_BESAR.berkas}
          alt=""
          width={MATAHARI_BESAR.lebarAsli}
          height={MATAHARI_BESAR.tinggiAsli}
          sizes="17vw"
          className="h-full w-full"
        />
      </motion.div>

      <motion.div className="absolute" style={gaya(MATAHARI_KECIL)} {...berputar(70, true)}>
        <Image
          src={MATAHARI_KECIL.berkas}
          alt=""
          width={MATAHARI_KECIL.lebarAsli}
          height={MATAHARI_KECIL.tinggiAsli}
          sizes="11vw"
          className="h-full w-full"
        />
      </motion.div>

      <motion.div className="absolute" style={gaya(TENDA)} {...mengambang(5.2, 0, 4)}>
        <Image
          src={TENDA.berkas}
          alt=""
          width={TENDA.lebarAsli}
          height={TENDA.tinggiAsli}
          sizes="12vw"
          // `-scale-x-100` ditulis Tailwind ke properti `scale`, terpisah dari
          // `transform` — jadi tidak bentrok dengan gerak mengambang yang
          // dipasang Framer Motion di pembungkusnya.
          className={`h-full w-full${TENDA.cermin ? " -scale-x-100" : ""}`}
        />
      </motion.div>

      <motion.div className="absolute" style={gaya(MASKOT)} {...mengambang(3.4, 0.6, 7)}>
        <Image
          src={MASKOT.berkas}
          alt=""
          width={MASKOT.lebarAsli}
          height={MASKOT.tinggiAsli}
          sizes="9vw"
          className="h-full w-full"
        />
      </motion.div>
    </div>
  );
}
