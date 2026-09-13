---
id: FE-0016
tipe: Fix(Explore UI Content)
author: Codex
fitur: Menghapus placeholder yang menyerupai konten fakultas
tanggal: 2026-09-13 21:50 WIB
status_integrasi: Masih Dummy Data (foto)
---

## Masalah

Kartu fakultas masih menampilkan `Program Studi 1–3` dan blok informasi
generik ketika Google Docs hanya menyediakan deskripsi fakultas. Placeholder
tersebut membuat halaman terlihat seolah konten resminya belum diterapkan.

## Perbaikan

- Fakultas tanpa daftar prodi resmi memakai array kosong dan tidak merender
  chip program studi.
- Blok sorotan tambahan tidak dirender jika kontennya belum tersedia.
- Fasilkom tetap menampilkan Sistem Informasi, Kecerdasan Artifisial, dan Ilmu
  Komputer karena tiga data tersebut sudah tersedia dari desain.
- Tidak ada lagi `Lorem ipsum` atau `Program Studi 1–3` di Explore UI.

## Verifikasi

Typecheck, lint, dan production build berhasil. Browser lokal menampilkan 15
deskripsi resmi tanpa chip atau blok informasi palsu.
