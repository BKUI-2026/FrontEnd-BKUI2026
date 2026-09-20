---
id: FE-0025
tipe: Components(Landing)+Assets(LandingPage)
author: Codex
fitur: Pembaruan Landing Page mengikuti revisi frame 776:2541
tanggal: 2026-09-20
status_integrasi: Masih Dummy Data
---

## Deskripsi

Frame Landing Page `776:2541` berubah sejak implementasi FE-0024. Hero kini
memakai komposisi bus kuning terbaru, bukan ilustrasi harimau sebelumnya.
Bagian Arah Petualangan memakai papan diagonal dan bendera, tiga kartu
bertekstur kayu, serta bukit dan tanaman dari aset Figma. Deskripsi ketiga
mata acara mengikuti copy pada desain; CTA tetap elemen HTML interaktif.

## Referensi

[Landing Page Figma BKUI 2026](https://www.figma.com/design/VleKZ99jmDFvSpE88joNQZ/BKUI-2026?node-id=776-2541)

## Verifikasi

- Desktop dan lebar mobile 390px diperiksa di browser lokal.
- `npm run typecheck`, `npm run lint`, dan `npm run build` lulus.
- Konten dinamis speaker, testimoni, sponsor, dan video masih menunggu Admin
  Web/konten resmi; tidak dibuat-buat dari placeholder Figma.
- Aset hero SVG komposit masih besar dan perlu optimasi sebelum produksi.
