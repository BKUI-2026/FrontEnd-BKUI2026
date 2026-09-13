---
id: FE-0013
tipe: Slides(School Roadshow)+Components(FormRoadshow, HiasanRoadshow)
author: Codex
fitur: Slicing halaman School Roadshow Registration
tanggal: 2026-09-13 21:00 WIB
status_integrasi: Masih Dummy Data
---

## Deskripsi

Mengganti placeholder `/school-roadshow` dengan halaman registrasi publik sesuai
desain Figma. Halaman berisi judul, pemberitahuan khusus perwakilan guru, form
dua kelompok (Detail Sekolah dan Kontak Penanggung Jawab), serta dekorasi yang
diekspor langsung dari Figma.

## Referensi Desain

Figma BKUI-2026 node [`691:1836`](https://www.figma.com/design/VleKZ99jmDFvSpE88joNQZ/BKUI-2026?node-id=691-1836), dengan badan halaman pada node `691:1852` (1512x1103).

## Status Integrasi API

**Masih Dummy Data.** Endpoint School Roadshow di BE belum punya kontrak.
Form menjalankan validasi HTML di client, tetapi tidak mengirim atau menyimpan
data pribadi. Setelah validasi lolos, pengguna menerima pesan bahwa layanan
server belum tersedia.

## Catatan

- Navbar dan Footer memakai komponen global existing agar perilaku lintas
  halaman tetap konsisten.
- Dekorasi desktop memakai layer SVG/PNG asli dan tekstur dari Figma supaya
  bentuk tetap tajam tanpa kotak latar hasil ekspor frame. Layout mobile dan
  tablet adalah adaptasi responsif karena desain hanya menyediakan desktop.
- Sudah diverifikasi pada kanvas desktop 1512 px serta viewport mobile 390 px;
  mobile tidak menimbulkan horizontal overflow.
- Saat endpoint BE tersedia, tambahkan handler submit berdasarkan kontrak resmi,
  feedback loading/success/error, lalu naikkan status integrasi ke
  `Terhubung ke API` lewat entry FE baru.
