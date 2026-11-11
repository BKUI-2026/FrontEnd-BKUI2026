---
id: FE-0029
tipe: Slides(Merchandise)+Components(KeranjangMerch)
author: Codex
fitur: Pratinjau merchandise sesuai Figma dan keranjang lokal
tanggal: 2026-11-11
status_integrasi: Masih Dummy Data
---

## Deskripsi

Mengikuti [frame Merchandise 337:388](https://www.figma.com/design/VleKZ99jmDFvSpE88joNQZ/BKUI-2026?node-id=337-388):
filter di kiri, sembilan kartu dalam tiga kolom di desktop, judul display, dan
aset ilustrasi merchandise lokal yang sudah diekspor dari frame yang sama.
Navbar menempatkan Merchandise tepat setelah Daftar Mentoring untuk pengunjung
yang melihat menu Mentoring, serta tetap menyediakan tautan untuk Student.

Foto produk tetap kosong, harga/stok menunggu katalog resmi. Tombol kartu dan
detail dapat menambahkan produk ke keranjang. Keranjang mendukung ubah jumlah,
hapus, tutup dengan Escape, dan penyimpanan lokal setelah refresh. Data simpanan
divalidasi terhadap ID produk yang ada dan jumlah 1–99.

## Batas checkout

Sesuai instruksi terbaru, tombol Checkout menampilkan pesan persis
`7001 Insufficient privileges` pada dialog. Tidak ada pembuatan order,
reservasi stok, redirect, ataupun permintaan ke Midtrans dari halaman ini.
Modul checkout Midtrans tetap tersimpan untuk pengembangan selanjutnya, tetapi
rute publik memakai KatalogMerch langsung. CTA tiket tetap di Yesplis.

## Desain dan QA

Pada kanvas 1512px: filter 212px, jarak filter ke grid 25px, lebar kartu 361px,
jarak kolom 16px, jarak baris 24px, serta jarak judul ke katalog 72px.
Tombol keranjang menggunakan ruang di bawah filter. Tata letak mobile
menurunkan filter ke atas katalog. Desktop navbar memakai menu penuh mulai
1280px, dengan padding yang menyesuaikan lebar.

Aset ilustrasi, font, warna dan komponen kartu/detail yang sudah ada dipakai
ulang. Konten navbar/footer di luar permintaan ini tetap mengikuti konfigurasi
aplikasi, termasuk CTA Kunjungan Sekolah dan status login.
