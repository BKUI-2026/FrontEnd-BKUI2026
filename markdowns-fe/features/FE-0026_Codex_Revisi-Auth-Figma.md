---
id: FE-0026
tipe: Components(Auth)+Assets(Auth)
author: Codex
fitur: Revisi visual Daftar dan Masuk sesuai frame Figma terbaru
tanggal: 2026-09-20
status_integrasi: Belum Terhubung ke BE
---

## Deskripsi

Form Daftar (`824:1117`), Masuk (`707:3918`), dan state galat Masuk (`824:744`)
disesuaikan: kartu biru muda, ukuran input 40px, jarak grid, tombol, dan tipografi.
Latar desktop Daftar memakai ekspor dekor frame Figma di belakang kartu HTML
interaktif; mobile dan Masuk memakai aset pohon/bukit Figma secara terpisah agar
tidak ada form statis yang tampak di latar. Maskot, rumput gelap, dan kelopak
animasi global tidak ditampilkan pada halaman auth.

## Batasan

UI auth di checkout FE ini belum memanggil endpoint BE. Tombol Daftar tetap
nonaktif dengan penjelasan aksesibel; Masuk hanya memvalidasi input lokal dan
belum dapat menunjukkan galat kredensial dari server. Perubahan ini visual,
tidak mengklaim alur auth sudah berfungsi. Konten placeholder input tetap
profesional dan tidak mengikuti `blabla@gmail.com` pada mockup.

## Verifikasi

Desktop dan mobile 390px diperiksa di browser lokal. Typecheck, lint, build lulus.
