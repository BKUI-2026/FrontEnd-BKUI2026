---
id: FE-0018
tipe: Feature(Profile, Student Dashboard)+UX(Form Placeholder)
author: Codex
fitur: Profile view/edit, Acara Saya, dan placeholder input profesional
tanggal: 2026-09-13 21:55 WIB
status_integrasi: Masih Dummy Data
---

## Sumber Desain

- Profile: Figma node `551:5275`
- Edit Profile: Figma node `551:5536`
- Acara Saya: Figma node `551:5409`

## Implementasi

- Mengganti placeholder `/profile` dengan tampilan Profile sesuai Figma.
- Tombol Edit Profil membuka state edit pada halaman yang sama; Batal kembali
  ke state baca, sedangkan Simpan memberi feedback jujur karena API belum ada.
- Mengganti placeholder `/dashboard` dengan tampilan Acara Saya.
- Menambahkan sidebar bersama, latar bentang alam, avatar placeholder, ikon
  kalender, dan ikon external link dari aset ekspor Figma.
- Navbar memakai state Student pada rute khusus Student untuk kebutuhan slicing;
  autentikasi dan route guard tetap menunggu kontrak backend.
- Seluruh placeholder input pada Daftar Akun, Masuk, School Roadshow, dan Edit
  Profil diubah menjadi contoh yang sesuai konteks. Tidak ada lagi placeholder
  generik `blabla@gmail.com`.

## Batas Integrasi

- Data profil dan acara masih dummy.
- Simpan profil dan Keluar belum mengirim data.
- Detail mentoring serta tautan Zoom wajib berasal dari Admin dan belum aktif.
- Tidak dibuat kontrak API atau session palsu.

## Verifikasi

- Tiga state diperiksa pada browser lokal.
- Mode Edit Profil menampilkan placeholder yang sesuai tiap field.
- Typecheck, lint, dan production build berhasil.
