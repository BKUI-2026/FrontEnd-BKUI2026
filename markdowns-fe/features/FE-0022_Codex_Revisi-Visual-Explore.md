# FE-0022 — Revisi Visual Explore UI

## Ringkasan

Tampilan halaman Explore UI disesuaikan ke desain terbaru pada Figma node `551:4325`, tanpa mengubah isi fakultas dan program studi yang sudah tersedia.

## Perubahan

- Mengganti hero Explore lama dengan komposisi terbaru dari Figma node `729:6531`.
- Menjaga rasio asli hero `1512:885` agar ilustrasi tidak terpotong dan posisinya tetap presisi.
- Menggunakan ekspor SVG utuh dari frame Figma, bukan foto atau screenshot raster, agar tidak ada ornamen maupun detail outline yang terlewat.
- Mempertahankan seluruh susunan layer asli: langit, bukit, jalan, rumput, jamur, bunga, bebatuan, tiga pohon, tenda, dua maskot, foreground, dan judul ber-outline.
- Menambahkan animasi halus langsung pada kelompok layer SVG (maskot, pohon, ornamen kecil, dan setiap baris judul), termasuk dukungan `prefers-reduced-motion`.
- Mempertahankan animasi komponen yang sudah ada pada filter, kartu fakultas, chip program studi, dan carousel foto.
- Isi fakultas, deskripsi, sorotan, dan program studi tidak diubah.

## Aset

- `public/icon/explore/hero/explore-hero-complete.svg` — komposisi vektor lengkap hasil ekspor Figma node `729:6531`.

## Verifikasi

- `npm run typecheck`
- `npm run lint`
- `npm run build`
