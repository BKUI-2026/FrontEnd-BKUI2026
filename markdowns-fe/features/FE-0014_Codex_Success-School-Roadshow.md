---
id: FE-0014
tipe: Page(School Roadshow Success)+Component(SuccessRoadshow)
author: Codex
fitur: Success state pendaftaran School Roadshow
tanggal: 2026-09-13 21:20 WIB
status_integrasi: Masih Dummy Data
---

## Deskripsi

Menambahkan halaman `/school-roadshow/success` sesuai Figma node `551:6130`.
Halaman menggunakan dekorasi Roadshow existing dengan penyesuaian posisi untuk
kanvas success setinggi 885 px, kartu krem 1000x606 px, ikon centang asli dari
Figma, serta pesan konfirmasi yang responsif.

## Referensi Desain

Figma BKUI-2026 node [`551:6130`](https://www.figma.com/design/VleKZ99jmDFvSpE88joNQZ/BKUI-2026?node-id=551-6130).

## Status Integrasi API

**Masih Dummy Data.** Route success sudah tersedia, tetapi sengaja belum
ditautkan dari form. Redirect hanya boleh dijalankan setelah endpoint School
Roadshow mengonfirmasi submission berhasil supaya frontend tidak memberikan
status sukses palsu.

## Catatan

- Teks placeholder Figma `Tulisan yang bener` diganti menjadi
  `Data sekolah berhasil kami terima.`
- Navbar dan Footer tetap memakai komponen global existing.
- Sudah diverifikasi pada viewport desktop 1512 px dan mobile 390 px tanpa
  horizontal overflow atau warning browser.
