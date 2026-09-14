# FE-0021 — Placeholder Video “Coming Soon”

## Ringkasan

Placeholder pada section video Landing Page diganti menjadi tulisan **“Coming Soon”** agar lebih singkat dan pantas ditampilkan selama URL video resmi belum tersedia.

## Perubahan

- Mengganti keterangan video yang panjang dengan “Coming Soon”.
- Menggunakan font display Talina yang sama dengan gaya judul BKUI.
- Memperbesar tipografi secara responsif agar tetap proporsional di desktop dan perangkat kecil.
- Perilaku iframe tidak berubah: video tetap otomatis tampil saat `VIDEO_LANDING.url` sudah diisi.

## Verifikasi

- `npm run typecheck`
- `npm run lint`
- `npm run build`
