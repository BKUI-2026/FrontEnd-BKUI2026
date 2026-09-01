---
id: FE-0008
tipe: Components(Hero, HeroIlustrasi)
author: Salman
fitur: Ganti ilustrasi Hero Landing Page dari WebP jadi SVG per-layer
tanggal: 2026-09-01 10:15 WIB
status_integrasi: Masih Dummy Data
---

## Deskripsi

Ilustrasi Hero Landing Page tadinya satu berkas `hero-bkui2026.webp` berukuran
**1512x885 — persis 1x kanvas Figma**. Di layar retina (hampir semua HP dan
laptop sekarang) gambar itu diperbesar 2-3 kali, jadi judulnya berbayang dan
rumput serta sinar mataharinya pecah. Tidak ada mutu WebP yang bisa memperbaiki
itu: yang salah bentuk asetnya, bukan kompresinya.

Sekarang isinya SVG hasil ekspor frame Figma `38:3727` — vektor, tajam di
perbesaran berapa pun, dan tiap layer masih jadi grup tersendiri yang bisa
dianimasikan.

## Referensi Desain

Figma node [`38:3727`](https://www.figma.com/design/VleKZ99jmDFvSpE88joNQZ/BKUI-2026?node-id=38-3727)
("Desktop", 1512x885).

## Cara membuat ulang kalau desainnya berubah

Ekspor mentahnya **10 MB** karena empat tekstur raster ikut ter-embed base64.
Langkah pemrosesannya:

1. `download_assets` node `38:3727` dengan `defaultFormat: "svg"`.
2. Keluarkan empat `data:image/...;base64` jadi berkas WebP di
   `public/image/landing/hero/`, ganti tiap `xlink:href` dengan path berkasnya.
   Urutan kemunculannya: **langit** (dipakai 1x), **rumput** (3x), **urat kayu**
   (2x), **maskot** (1x) — cek jumlah pemakaian `url(#patternN)` untuk
   memastikan, jangan menebak dari ukuran gambarnya.
3. Buang dua `<rect>` latar kanvas Figma (`#F5F5F5` dan `#FDFDFC`).
   **Rect langit `#84C2F6` JANGAN dibuang** — itu langit sungguhan.
4. Buang grup `Button`. Tombol "Jelajahi Lebih Lanjut" dirender sebagai
   `<button>` HTML sungguhan di `Hero.tsx` supaya bisa difokus keyboard dan
   terbaca screen reader.
5. Simpan isi dalam `<svg>` (tanpa elemen `<svg>`-nya) ke
   `src/components/landing/hero-ilustrasi.svg.ts`.
6. Ukur ulang `SAMBUNGAN_RUMPUT` di `Hero.tsx` (lihat catatan di bawah).

Hasil akhir: SVG 240 KB (±74 KB setelah kompresi) + 309 KB tekstur.

## Tiga jebakan yang sempat menjebak

- **`fill="none"` di elemen `<svg>` wajib ada.** Sebagian bentuk di ilustrasi
  ini cuma bergaris tanpa isian, dan di SVG bentuk tanpa atribut `fill`
  otomatis terisi **hitam**. Ekspor Figma menaruh atribut itu di `<svg>`-nya;
  karena elemen itu ditulis ulang di `HeroIlustrasi.tsx`, atributnya sempat
  hilang dan muncul bidang hitam besar di bukit kiri bawah.
- **Animasi `opacity` menimpa nilai asli, bukan mengalikannya.** Grup sinar
  matahari (`Vector 92`/`Vector 93`) aslinya `opacity="0.36"`. Sempat saya
  animasikan 0.72-1 dan sinarnya langsung jadi bidang putih pekat yang menutupi
  bukit. Rentangnya harus mengitari nilai aslinya.
- **Dua tekstur sempat tertukar** (langit vs rumput) karena saya menebak dari
  ukuran gambarnya. Yang benar dicek dari berapa kali `url(#patternN)` dipakai:
  rumput 3x, langit 1x.

## Kenapa disisipkan langsung (inline), bukan `<img src="hero.svg">`

Empat teksturnya disimpan sebagai WebP terpisah supaya bisa di-cache browser
dan tidak menggelembungkan SVG-nya. Tapi **SVG yang dimuat lewat `<img>`
dijalankan terkunci: ia tidak boleh mengambil berkas dari luar dirinya**, jadi
keempat tekstur itu tidak akan pernah muncul.

Disisipkan langsung ke halaman, teksturnya dimuat seperti gambar biasa,
sekaligus membuat grup di dalamnya bisa disentuh CSS untuk animasi.
`HeroIlustrasi` server component, jadi markup-nya ikut di HTML dan **tidak
menambah satu byte pun JavaScript** ke browser.

## Animasi

Tiga gerakan halus, semuanya di `globals.css`:

| Grup SVG | Gerakan |
|---|---|
| `daun` (tajuk sakura) | tertiup 7 detik, geser -5..+5 unit |
| `Igris Happy 1` (maskot) | melompat 1,6 detik |
| `Vector 92` / `Vector 93` (sinar) | opacity 0,28-0,44, saling berselisih fase |

Semuanya memakai properti **`translate`/`opacity`, tidak pernah `transform`**.
Tiap grup sudah membawa atribut `transform` dari Figma yang menaruhnya pada
posisi & sudut yang benar; menulis `transform` lewat CSS akan menimpanya dan
seluruh ilustrasinya berhamburan. `translate` properti terpisah yang ditumpuk
di atas transform bawaan.

Satuannya unit SVG (kanvas 1512x885), jadi geraknya ikut mengecil bersama
ilustrasinya di layar sempit. Semua dimatikan pada `prefers-reduced-motion`.

## Status Integrasi API

Tidak ada. Hero murni ilustrasi statis; tidak ada konten dari BE di section ini.

## Catatan

- **`SAMBUNGAN_RUMPUT` di `Hero.tsx` wajib diukur ulang tiap ilustrasinya
  berubah.** Itu gradien strip tombol versi mobile yang menyambung ke tepi bawah
  ilustrasi. Nilai lamanya disalin dari WebP dan langsung meleset jauh begitu
  hero-nya jadi SVG — tepi bawah versi vektor jauh lebih pucat. Sekarang diukur
  dari rerata empat baris piksel terakhir hasil render.
- **`hero-bkui2026.webp` sudah dihapus.** FE-0005 masih menyebutnya sebagai aset
  terbesar; catatan itu sudah tidak berlaku.
- **Belum dicek di lebar HP & tablet.** Desktop sudah diverifikasi visual dan
  cocok dengan Figma, tanpa error konsol.
- Section Landing Page lain (Apa itu BKUI, FAQ) masih memakai dekorasi raster
  `dekor-*.webp`. Masalah ketajaman yang sama berlaku di sana, tapi belum
  disentuh — perlu diputuskan terpisah.
