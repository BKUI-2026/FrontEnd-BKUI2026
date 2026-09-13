---
nama_integrasi: Redirect ke Yesplis (Tiket & Merchandise)
status: tiket terhubung, merchandise menunggu URL
owner: Codex
---

## Deskripsi
CTA "Beli Tiket" dan "Beli Merch" redirect keluar ke platform Yesplis. TIDAK ADA checkout/payment internal (lihat AGENTS.md bagian 5.4 & 8).

## Kontrak / Spesifikasi
- URL Yesplis Tiket: https://www.yesplis.com/event/bedah-kampus-ui-2026
- URL Yesplis Merch: TBD
- Method: <a href> / window.location, bukan API call

## Status & Progress

- CTA kartu tiket dan overlay detail tiket sudah aktif dan membuka halaman
  event Yesplis di tab baru.
- CTA merchandise tetap nonaktif sampai URL resmi merchandise diberikan.
- `KartuKatalog` dan `DetailKatalog` menerima URL berdasarkan jenis katalog;
  tiket tidak lagi salah membaca konfigurasi merchandise.
