import Image from "next/image";
import type { CSSProperties } from "react";

/**
 * Kelopak sakura yang berjatuhan terus-menerus di latar layar.
 *
 * Murni CSS — tidak ada JavaScript, tidak ada state, tidak ada re-render.
 * Jadi komponen ini tetap server component dan tidak menambah beban di browser
 * selain animasi transform yang ditangani GPU.
 *
 * Ditaruh di belakang konten (`-z-10`) supaya teks tetap gampang dibaca, dan
 * `pointer-events-none` supaya kelopaknya tidak pernah menghalangi klik.
 */

/** Rasio asli aset public/logo/sakura.svg (65 × 94). */
const RASIO_TINGGI = 94 / 65;

/**
 * Konfigurasi tiap kelopak, sengaja ditulis manual dan TIDAK pakai Math.random().
 *
 * Halaman ini di-prerender di server lalu dihidrasi di browser. Kalau nilainya
 * diacak, hasil server dan hasil browser beda dan React melempar hydration
 * mismatch. Nilai tetap begini juga bikin tampilannya konsisten tiap reload.
 *
 * - `kiri`       : posisi horizontal (%)
 * - `lebar`      : lebar kelopak (px)
 * - `durasiJatuh`: makin lama makin pelan turunnya (detik)
 * - `mulai`      : delay NEGATIF, biar pas halaman dibuka kelopaknya sudah
 *                  tersebar di tengah layar, bukan mulai dari kosong
 * - `durasiPutar`: kecepatan berputar (detik)
 * - `opasitas`   : kelopak yang lebih pudar terasa lebih jauh
 * - `terbalik`   : arah putarnya dibalik, biar tidak semua berputar searah
 */
/*
 * Ukurannya sengaja dibikin timpang jauh (kecil ~14px vs besar ~40px), bukan
 * beda-beda tipis. Ini yang bikin kesan kedalaman: kelopak besar terbaca dekat,
 * kelopak kecil terbaca jauh.
 *
 * Tiga nilai lain ikut mengunci kesan itu, jadi kalau menambah kelopak baru
 * tolong ikuti polanya:
 * - makin BESAR → makin CEPAT jatuh + makin PEKAT + putarannya lebih cepat
 * - makin KECIL → makin PELAN jatuh + makin PUDAR + putarannya lebih lambat
 * Kalau polanya dilanggar (mis. kelopak kecil jatuh paling cepat), ilusi
 * kedalamannya langsung buyar dan gerakannya terasa aneh.
 */
const KELOPAK = [
  { kiri: 2, lebar: 36, durasiJatuh: 10, mulai: -1, durasiPutar: 6, opasitas: 0.85, terbalik: false },
  { kiri: 9, lebar: 15, durasiJatuh: 19, mulai: -7, durasiPutar: 13, opasitas: 0.45, terbalik: true },
  { kiri: 16, lebar: 27, durasiJatuh: 13, mulai: -4, durasiPutar: 8, opasitas: 0.75, terbalik: false },
  { kiri: 23, lebar: 18, durasiJatuh: 17, mulai: -12, durasiPutar: 11, opasitas: 0.5, terbalik: true },
  { kiri: 31, lebar: 40, durasiJatuh: 9, mulai: -2, durasiPutar: 5, opasitas: 0.9, terbalik: false },
  { kiri: 38, lebar: 14, durasiJatuh: 20, mulai: -9, durasiPutar: 14, opasitas: 0.4, terbalik: true },
  { kiri: 45, lebar: 30, durasiJatuh: 12, mulai: -6, durasiPutar: 7, opasitas: 0.8, terbalik: false },
  { kiri: 52, lebar: 19, durasiJatuh: 16, mulai: -14, durasiPutar: 10, opasitas: 0.55, terbalik: true },
  { kiri: 59, lebar: 35, durasiJatuh: 11, mulai: -3, durasiPutar: 6, opasitas: 0.85, terbalik: false },
  { kiri: 66, lebar: 16, durasiJatuh: 19, mulai: -10, durasiPutar: 12, opasitas: 0.45, terbalik: true },
  { kiri: 73, lebar: 25, durasiJatuh: 14, mulai: -5, durasiPutar: 8, opasitas: 0.7, terbalik: false },
  { kiri: 80, lebar: 17, durasiJatuh: 18, mulai: -15, durasiPutar: 11, opasitas: 0.5, terbalik: true },
  { kiri: 87, lebar: 33, durasiJatuh: 11, mulai: -8, durasiPutar: 6, opasitas: 0.8, terbalik: false },
  { kiri: 94, lebar: 22, durasiJatuh: 15, mulai: -11, durasiPutar: 9, opasitas: 0.6, terbalik: true },
] as const;

export function SakuraBerjatuhan() {
  return (
    <div
      // `.sakura-layer` dipakai globals.css buat menyembunyikan seluruh lapisan
      // ini kalau pengguna menyalakan "kurangi animasi" di OS.
      className="sakura-layer pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      {KELOPAK.map((k, i) => (
        <span
          key={i}
          className="absolute top-0 block"
          style={{
            left: `${k.kiri}%`,
            animation: `sakura-jatuh ${k.durasiJatuh}s linear ${k.mulai}s infinite`,
          }}
        >
          <Image
            src="/logo/sakura.svg"
            alt=""
            width={k.lebar}
            height={Math.round(k.lebar * RASIO_TINGGI)}
            // Default `lazy` bikin kelopak yang awalnya di luar layar baru
            // muncul belakangan, jadi detik-detik pertama terasa kosong.
            // Semua kelopak pakai file yang sama (4 KB) — browser cuma
            // request sekali, jadi eager di sini praktis gratis.
            loading="eager"
            style={{
              opacity: k.opasitas,
              // Oleng kiri-kanan proporsional ukuran (dibaca keyframe
              // `sakura-putar` di globals.css) biar kelopak besar tidak kaku.
              "--oleng": `${Math.round(k.lebar * 0.7)}px`,
              animation: `sakura-putar ${k.durasiPutar}s linear infinite${k.terbalik ? " reverse" : ""}`,
            } as CSSProperties}
          />
        </span>
      ))}
    </div>
  );
}
