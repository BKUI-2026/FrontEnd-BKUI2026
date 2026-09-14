# FE-0023 — QA Mobile Responsive Seluruh Halaman

## Ringkasan

Seluruh rute frontend diuji pada lebar 320px, 390px, dan 768px. Semua halaman kini bebas horizontal overflow serta mempertahankan susunan konten yang dapat dibaca dan digunakan pada HP maupun tablet.

## Rute yang Diperiksa

- `/`
- `/explore-ui`
- `/ticket`
- `/merchandise`
- `/school-roadshow`
- `/school-roadshow/success`
- `/daftar`
- `/masuk`
- `/profile`
- `/dashboard`
- `/daftar-mentoring`
- `/daftar-casa`

## Perubahan

- Memotong dekorasi sponsor Landing Page di dalam section-nya agar aset minimum 900px tidak memperlebar halaman pada HP.
- Menyesuaikan padding, susunan kontak, dan ukuran judul Footer pada layar kecil.
- Memperbesar area sentuh ikon media sosial dan tautan email.
- Memperbesar target sentuh navigasi carousel foto Explore tanpa mengubah ukuran visual indikatornya.
- Memperbesar area sentuh panah carousel Testimoni CASA.
- Membuat label filter merchandise memiliki target sentuh minimum 44px.
- Memperbesar tombol tampil/sembunyikan kata sandi dan tautan perpindahan Daftar/Masuk.

## Verifikasi

- Audit horizontal overflow pada 12 rute di viewport 320px, 390px, dan 768px: tidak ada overflow.
- Pengecekan visual menu mobile, Explore UI, form autentikasi, School Roadshow, Merchandise, Profile, dan Dashboard.
- `npm run typecheck`
- `npm run lint`
- `npm run build`
