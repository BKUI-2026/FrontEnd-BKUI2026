---
id: FE-0028
tipe: Components(CountdownHero)+Slides(LandingPage)
author: Codex
fitur: Iteration 2 — Countdown IPA/IPS, border landing, responsive
tanggal: 2026-11-05
status_integrasi: Masih Dummy Data
---

## Deskripsi

Implementasi nomor 8, 9, dan 12 dari dokumen tim
[Iteration 2](https://docs.google.com/document/d/12AMrb2W-YR_JHfwWICe6xoo2g0rZQjRlOV7knOTEBV4/edit).

Countdown memiliki tombol IPA/IPS dengan state `aria-pressed` dan akses
keyboard. Target IPA tetap dari `NEXT_PUBLIC_BKUI_COUNTDOWN_TARGET`; IPS
diturunkan dengan menambahkan 24 jam. Target kosong/tidak valid memakai
fallback lama: 19 Desember 2026, 00.00 WIB. Angka dihitung ulang langsung saat
pilihan berubah, berganti menjadi jam/menit/detik dalam 24 jam terakhir,
dan berhenti di nol saat target lewat. Tanggal diumumkan ke pembaca layar
dalam WIB; perubahan setiap detik tidak diumumkan berulang kali.

Hero mendapat ruang untuk pilihan countdown di mobile/tablet. Strip gradien
CTA mobile dilepas agar memakai warna langit yang sama dengan section
berikutnya. Dekorasi video memudar di tepi bawah, lapisan hijau datar pada
Arah Petualangan dilepas, dan mask awan umum dilengkapi prefiks WebKit.
Judul Trailer dirapikan agar tidak menindih pemutar pada mobile.

Dialog katalog membagi ruang foto dan teks secara proporsional, membatasi
tinggi ke viewport dinamis, serta menyediakan target sentuh 44px untuk tutup,
panah, dan pilihan foto. Kartu Acara Saya memakai container query untuk
menata judul dan CTA sesuai lebar kartu, serta elemen `time` agar tanggal
dapat membungkus dengan benar di sebelah ikon kalender.

## Status Integrasi API

Countdown masih memakai konfigurasi frontend; tidak menambah kontrak API.
Fallback tanggal berasal dari kode sebelum perubahan dan perlu disesuaikan
tim melalui environment jika jadwal resmi berbeda. Tampilan katalog dan
dashboard tetap memakai sumber data dan alur yang sudah ada.

Nomor 7 tetap Pending karena materi/detail belum tersedia; nomor 10 dan 11
tetap Icebox. Tidak ada perubahan konten atau integrasi untuk ketiganya.

## Validasi

- Pemeriksaan tampilan Chromium pada lebar 320, 390, 768, 1024, dan 1440px
  untuk seluruh 13 rute halaman. Profile dan dashboard memakai respons sesi
  Student simulasi di browser; tidak ada submission ke backend.
- Dialog tiket dan merchandise dibuka/ditutup pada kelima lebar tersebut.
- Countdown diuji dengan waktu browser tetap: lebih dari 24 jam, kurang
  dari 24 jam, tepat target IPA, dan setelah kedua target lewat. Selisih IPS
  satu hari, pindah balik IPA, serta aktivasi lewat keyboard diperiksa.
- `npm run lint`, `npm run typecheck`, dan `npm run build`.
- Verifikasi browser selain Chromium belum dilakukan.
