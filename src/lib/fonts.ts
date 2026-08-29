import { Inter } from "next/font/google";
import localFont from "next/font/local";

/**
 * Tiga font dari Figma BKUI 2026.
 *
 * Dimuat lewat next/font supaya file font ikut di-hosting sendiri (tidak ada
 * request ke server pihak ketiga) dan Next menyisipkan `size-adjust` otomatis,
 * jadi teks tidak "loncat" saat font selesai dimuat.
 *
 * Tiap font diekspos sebagai CSS variable, lalu didaftarkan jadi token Tailwind
 * di globals.css (`--font-display`, `--font-ui`, `--font-body`).
 *
 * ---------------------------------------------------------------------------
 * PERINGATAN LISENSI — Talina DEMO
 * ---------------------------------------------------------------------------
 * File `talina-demo.otf` adalah versi DEMO yang lisensinya **PERSONAL USE ONLY**
 * (lihat `talina-demo/Readme (DEMO).txt` di folder induk project). EULA-nya
 * melarang pemakaian komersial, termasuk untuk iklan dan promosi.
 *
 * Website BKUI menjual tiket (lewat Yesplis) dan menampilkan sponsor, jadi
 * kemungkinan besar TIDAK memenuhi syarat "personal use". Lisensi komersialnya
 * perlu dibeli sebelum website ini live:
 * https://creativemarket.com/PandekaStudio/291566479-Talina-Playful-Bold-Sans
 *
 * Ini keputusan PM/designer, bukan keputusan teknis — makanya font-nya tetap
 * dipasang supaya tampilannya sama persis dengan Figma. Kalau lisensinya tidak
 * jadi dibeli, cukup ganti `src` di bawah; komponen lain tidak perlu disentuh
 * karena semua judul memakai token `font-display`.
 */
export const fontDisplay = localFont({
  src: "../../public/fonts/talina-demo.otf",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-display",
  // Font display dipakai untuk judul pendek. Kalau gagal dimuat, fallback ke
  // sans-serif tebal bawaan sistem — bukan serif, biar karakternya tidak
  // berubah drastis.
  fallback: ["ui-rounded", "system-ui", "sans-serif"],
});

/** Delight — dipakai untuk subheading, angka tahun, dan label tombol. */
export const fontUi = localFont({
  src: [
    { path: "../../public/fonts/delight-medium.otf", weight: "500", style: "normal" },
    { path: "../../public/fonts/delight-semibold.otf", weight: "600", style: "normal" },
    { path: "../../public/fonts/delight-extrabold.otf", weight: "800", style: "normal" },
  ],
  display: "swap",
  variable: "--font-ui",
  fallback: ["system-ui", "sans-serif"],
});

/** Inter — seluruh teks paragraf (Body/B1 & Body/B2 di Figma). */
export const fontBody = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});
