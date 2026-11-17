---
id: FE-0030
tipe: Slides(Checkout, Pesanan)+Components(CheckoutMerch, PesananSaya)
author: Claude
fitur: Checkout keranjang merchandise via Midtrans dan riwayat pesanan
tanggal: 2026-11-18
status_integrasi: Terintegrasi
---

## Deskripsi

Lanjutan FE-0029, sesuai Iteration 2 nomor 3 (katalog, form, sistem keranjang,
payment history di user end).

- Katalog mengambil harga dan stok dari `GET /merchandise/products`. SKU di BE
  harus sama dengan `id` produk di `lib/merch-content.ts` (`M1`–`M9`). Produk
  tanpa data di BE tampil "Segera diumumkan"; stok 0 tampil "Stok habis".
- Keranjang multi-produk, maksimal 10 per produk (batas BE).
- Checkout di `/checkout` (grup `(student)`, wajib login). Data pemesan diisi
  otomatis dari profil. Satu pesanan berisi semua produk di keranjang, lalu
  pembeli diarahkan ke Midtrans Snap. Keranjang dikosongkan setelah pesanan
  dibuat.
- Kunci idempotensi (`x-merch-order-key`) disimpan di localStorage sampai
  pesanan berhasil, supaya respons yang hilang bisa dipulihkan tanpa pesanan
  ganda.
- Riwayat di `/pesanan`: status, item, total, batas bayar, tombol lanjut bayar
  untuk pesanan PENDING. Status diperbarui tiap 5 detik selama masih ada yang
  PENDING. Midtrans mengembalikan pembeli ke `/pesanan?order_id=...`, dan kartu
  pesanan itu disorot.

## Belum

Foto produk, harga, stok, dan deskripsi resmi menunggu tim. Halaman checkout
dan riwayat belum punya frame Figma, jadi memakai gaya kartu dashboard dan
katalog yang sudah ada.
