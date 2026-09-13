---
id: FE-0015
tipe: Content(Explore UI, FAQ)+Integration(Yesplis Ticket)
author: Codex
fitur: Konten resmi fakultas dan FAQ serta redirect tiket
tanggal: 2026-09-13 21:35 WIB
status_integrasi: Masih Dummy Data (konten parsial) + Yesplis Ticket terhubung
---

## Deskripsi

Memasukkan 15 deskripsi resmi untuk 14 fakultas dan Program Pendidikan Vokasi
ke Explore UI, mengganti enam FAQ placeholder dengan sepuluh pasangan Q&A dari
dokumen tim, serta mengaktifkan seluruh CTA tiket menuju event Yesplis resmi.

## Sumber Konten

Google Doc `PENJELASAN ACARA`:
https://docs.google.com/document/d/1zVKobsqGVNLwjPQW280oBtorkEVFLCniPXhUQAaP-qo/edit

- Tab `Tab 1`: deskripsi fakultas dan Program Pendidikan Vokasi.
- Tab `QNA MATA ACARA BKUI`: sepuluh pasangan pertanyaan dan jawaban.
- Ejaan, tanda baca, dan beberapa frasa dirapikan tanpa mengubah makna.

## Integrasi Yesplis

- URL tiket: https://www.yesplis.com/event/bedah-kampus-ui-2026
- CTA pada kartu dan overlay detail tiket memakai URL tiket, bukan konfigurasi
  merchandise.
- Redirect berupa link eksternal di tab baru. Tidak ada cart, checkout, atau
  payment gateway di web BKUI.

## Status

- Deskripsi fakultas/vokasi: konten tim sudah masuk.
- FAQ: konten tim sudah masuk.
- Program studi selain Fasilkom, foto fakultas, serta data tier tiket masih
  placeholder sampai konten resminya diberikan.
- URL merchandise masih belum tersedia sehingga CTA merchandise tetap nonaktif.

## Verifikasi

- Ketiga kartu tiket dan overlay detail mengarah ke URL Yesplis yang benar.
- Explore UI menampilkan 15 deskripsi.
- Landing Page menampilkan 10 FAQ dari dokumen.
