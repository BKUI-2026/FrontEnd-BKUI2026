---
id: FE-0020
tipe: Content(Landing, Merchandise, Ticket, Explore)
author: Codex
fitur: Mengganti Lorem ipsum dan copy placeholder generik
tanggal: 2026-09-13 22:10 WIB
status_integrasi: Masih Dummy Data
---

## Perubahan

- Mengganti deskripsi utama BKUI dan subjudul Arah Petualangan dengan copy yang
  relevan terhadap rangkaian Bedah Universitas, Fakultas, dan Jurusan.
- Menghapus seluruh Lorem ipsum dari source yang tampil di website.
- Mengganti nama pembicara dan testimoni palsu dengan pesan transparan bahwa
  informasi resmi segera diumumkan; tidak mengarang identitas atau kutipan.
- Mengganti nama generik merchandise dan deskripsi produk yang tidak relevan.
- Menghapus harga Rp1.000.000.000 dan stok 24 yang sebelumnya hanya placeholder.
  UI kini menampilkan bahwa harga, stok, foto, dan detail resmi akan diperbarui.
- Mengubah label kosong pada foto katalog dan fakultas menjadi kalimat yang
  lebih jelas dan profesional.

## Batas Konten

- Nama/foto pembicara, testimoni asli, produk, harga, stok, benefit tiket, dan
  foto fakultas tetap menunggu konten resmi atau endpoint Admin.
- Copy sementara tidak membuat klaim mengenai orang, produk, harga, atau stok.

## Verifikasi

- Pencarian source dan hasil render tidak menemukan Lorem ipsum, nama generik,
  deskripsi produk asing, harga Rp1 miliar, atau label stok berbahasa Inggris.
- Typecheck, lint, dan production build berhasil.
