---
id: FE-0024
tipe: Components(Landing)+Slides(LandingPage)
author: Codex
fitur: Revisi Landing Page Figma terbaru
tanggal: 2026-09-15 16:00 WIB
status_integrasi: Masih Dummy Data
---

## Deskripsi

Landing Page direvisi mengikuti frame terbaru `776:2541`: hero ilustrasi baru,
deskripsi BKUI, tiga kartu mata acara pada Arah Petualangan, heading Previous
Speakers dengan Timeline di satu section, pohon sakura untuk testimoni, serta
FAQ dan sponsor dalam satu section. Konten FAQ resmi dan copy BKUI yang sudah
ada tetap dipertahankan; placeholder speaker, testimoni, sponsor, dan URL video
tidak ditebak.

## Referensi Desain

[Landing Page Figma BKUI 2026](https://www.figma.com/design/VleKZ99jmDFvSpE88joNQZ/BKUI-2026?node-id=776-2541)

## Status Integrasi API

Masih dummy data. Entity `Content` pada Admin Web belum tersedia; video dan
informasi dinamis tetap menunggu endpoint resmi.

## Catatan

- Hero memakai ekspor SVG komposisi Figma, bukan screenshot PNG/WebP halaman;
  CTA tetap elemen HTML interaktif. Ukuran berkas SVG besar dan perlu optimasi
  ekspor lanjutan untuk performa produksi.
- Aset papan, pohon sakura, rumput FAQ, dan pita sponsor disimpan sebagai SVG
  terpisah di `public/icon/landing/latest/`.
- After Movie dan tekstur awan masih memakai sebagian aset Figma lama. Audit
  visual lanjutan diperlukan untuk hasil pixel-perfect, terutama ilustrasi
  ornamental yang belum tersedia sebagai vektor ringan.
- Tata letak mobile diperiksa pada lebar 390px. Browser selain Chromium belum
  diperiksa.
