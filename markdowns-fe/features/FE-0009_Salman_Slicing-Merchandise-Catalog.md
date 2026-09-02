---
id: FE-0009
tipe: Slides(Merchandise Catalog)+Components(HiasanMerch, FilterMerch, KatalogMerch, KartuMerch, DetailMerch)
author: Salman
fitur: Slicing halaman Merchandise Catalog
tanggal: 2026-09-02 13:05 WIB
status_integrasi: Masih Dummy Data
---

## Deskripsi

Halaman `/merchandise` yang sebelumnya `PagePlaceholder` sekarang sudah
dislicing penuh dari Figma. Susunannya: judul stiker "Merchandise Eksklusif",
panel penyaring kategori di kiri, dan kisi 3x3 kartu produk — semuanya di atas
latar langit berdekorasi gunung, pohon cemara, dan semak.

Komponennya di `src/components/merch/`, isinya di `src/lib/merch-content.ts`.

## Referensi Desain

Figma node [`337:389`](https://www.figma.com/design/VleKZ99jmDFvSpE88joNQZ/BKUI-2026?node-id=337-389)
("Desktop", 1512x1774). **Belum ada varian mobile/tablet** — sama seperti
Landing Page dan Explore UI. Layout di bawah `lg` turunan sendiri: panel filter
naik ke atas kisi dan kotak centangnya berbaris mendatar, kisi jadi 2 lalu 1
kolom.

## Batasan yang dijaga: TIDAK ADA transaksi di halaman ini

Ini halaman yang paling rawan melanggar README boundary nomor 1, jadi ditulis
eksplisit:

- Dua tombol di tiap kartu **persis seperti Figma**: "Lihat Detail" dan
  "Beli di Yesplis". Figma sendiri tidak menggambar tombol keranjang.
- Tidak ada cart, jumlah beli, varian terpilih, atau checkout. Tipe `Produk` di
  `merch-content.ts` sengaja tidak punya field untuk itu.
- "Beli di Yesplis" adalah `<a target="_blank">` biasa — murni pindah halaman
  keluar, bukan form yang mengirim apa pun.

"Lihat Detail" membuka **overlay** di halaman yang sama (Figma `338:1339`),
bukan pindah rute — makanya `<button>`, bukan `<a>`.

"Beli di Yesplis" (di kartu maupun di overlay) **masih dimatikan** karena
`NEXT_PUBLIC_YESPLIS_MERCH_URL` kosong. Menautkan ke URL karangan lebih
berbahaya daripada tombol mati. Begitu env-nya diisi, tombolnya hidup sendiri
tanpa ubah kode.

## Overlay detail (`DetailMerch`)

Isinya: carousel foto 600x446 dengan panah kiri/kanan dan empat titik, judul,
stok, harga, deskripsi, dan satu tombol "Beli di Yesplis". Tetap katalog — tidak
ada jumlah beli, pilihan ukuran, atau tambah ke keranjang.

Dibangun di atas elemen `<dialog>` yang dibuka lewat `showModal()`. Itu memberi
banyak hal gratis yang kalau ditulis tangan gampang terlewat: fokus keyboard
terkurung di dalam overlay, Escape menutup, fokus kembali ke tombol yang
membukanya, dan dirender di lapisan teratas browser sehingga tidak perlu adu
z-index dengan navbar atau kelopak sakura. Yang tidak gratis cuma dua dan
ditambahkan sendiri: menutup saat latar diklik, dan mengunci scroll halaman
(lewat `body:has(dialog[open])` di globals.css, bukan JavaScript).

### Dua jebakan yang ketahuan saat pengujian

**Event `close` tidak merambat naik.** Sinkronisasi balik saat overlay ditutup
dari sisi browser (Escape) dipasang lewat `addEventListener` langsung, bukan
prop `onClose` React.

**Kartu yang sudah pernah dibuka bisa mati selamanya.** Overlay dibuka dari
dalam effect yang bergantung pada `produk`. Kalau state tidak sempat kembali
null saat overlay ditutup, menekan "Lihat Detail" pada kartu yang SAMA tidak
mengubah state, effect-nya tidak jalan, dan kartu itu tidak bisa dibuka lagi —
sementara kartu lain tetap normal, jadi bug-nya sulit ditemukan. Ditutup dengan
penghitung `pembuka` yang dipakai sebagai `key` `<DetailMerch>`: komponennya
dipasang ulang tiap kali diminta, jadi overlay pasti terbuka. Efek sampingnya
kebetulan diinginkan — carousel fotonya ikut kembali ke foto pertama.

## Dekorasi: SVG per-layer, bukan gambar rata

Ekspor SVG frame ini mentahnya **19 MB**. Langkah pemrosesannya (sama seperti
Hero di FE-0008):

1. `download_assets` node `337:389` dengan `defaultFormat: "svg"`.
2. Keluarkan tekstur base64 jadi WebP di `public/image/merch/`.
   **Nama berkasnya jangan ditebak dari ukuran gambar** — saya sempat salah dan
   enam teksturnya tertukar. Yang benar dicek dari posisi elemen yang memakai
   tiap `url(#patternN)` di kanvas.
3. Buang dua `<rect>` latar kanvas Figma (`#F5F5F5`, `#FDFDFC`).
4. Buang rect langit `#84C2F6` **dan** dua grup tekstur awan (`image 928`,
   `image 925`). Langitnya disediakan `LatarHalaman` yang bisa mengikuti tinggi
   halaman berapa pun; kalau ikut di SVG, langitnya jadi dobel dan terpotong di
   halaman yang lebih panjang dari kanvas Figma.
5. Buang grup `Frame 946` (judul, filter, sembilan kartu) — semuanya HTML.
6. Buang dua `<pattern>` yatim yang tersisa setelah langit dibuang, berikut
   `<image>` 7,7 MB yang mereka rujuk. **Langkah ini yang paling banyak
   menghemat**: tanpa itu berkasnya tetap belasan MB meski gambarnya sudah tidak
   dipakai.

Hasil akhir: SVG 18 KB (sekitar 2 KB terkompresi) + 496 KB tekstur.

Dekorasinya **ditempel ke tepi BAWAH halaman**, bukan atas. Kanvas Figma
tingginya tetap 1774px sementara tinggi halaman di web ikut isinya. Sebagian
besar dekorasi duduk di dasar halaman, jadi menempel dari bawah membuat
dasarnya selalu pas; kalau ditempel dari atas, gunung dan pohonnya menggantung
di tengah katalog.

## Status Integrasi API

Belum ada request ke BE. Sumbernya entity `Content`, endpoint belum ada, dan
shape response-nya tidak dikarang duluan (README boundary nomor 4).

Placeholder yang wajib diganti sebelum live:
- nama produk ("Nama Merchandise 1-9"), harga (Rp1.000.000.000), dan stok (24)
  — semuanya nilai placeholder dari Figma
- foto produk (di Figma pun kotaknya kosong) → kartu menampilkan "Foto menyusul"

Kategori (Apparel, Accessories, Bundles, Event Memorabilia) diambil dari Figma
dan sengaja divariasikan antar produk supaya penyaringnya bisa dicoba.

## Catatan

- **Lebar isi dikunci 1352px dengan padding 80px**, mengikuti Figma persis.
  Angka ini bukan selera: pada lebar itu kartu produknya jadi 361px, dan hanya
  pada lebar itulah dua tombolnya muat berdampingan dalam satu baris dengan
  sisa nol. Sempat saya pakai padding lain dan tombolnya langsung turun.
- **Penyaring pakai `<input type="checkbox">` sungguhan**, bukan `<div>` yang
  digambar mirip kotak centang. Kotak asli sudah membawa fokus keyboard, spasi
  untuk menekan, pembacaan "tercentang/tidak" oleh screen reader, dan mode
  kontras tinggi OS — semuanya gratis. Tampilannya diambil alih lewat
  `appearance-none` + `checked:`.
- Beberapa kategori boleh dipilih sekaligus (di Figma memang kotak centang).
  Tanpa satupun terpilih berarti tampilkan semua, bukan sembunyikan semua.
- `LatarHalaman` dan `gerak.ts` dipinjam dari `components/explore/` — keduanya
  bukan milik Explore UI, melainkan primitif lintas halaman. Kalau nanti ada
  halaman ketiga yang memakainya, pertimbangkan pindah ke `components/ui/`.
- **Sudah diverifikasi visual di desktop** dan cocok dengan Figma. Yang diuji:
  penyaring (Apparel → 3 produk, +Bundles → 5, dilepas → 9), dan overlay detail
  (buka, tutup lewat X, buka lagi kartu yang sama, buka-tutup 3x berturut-turut,
  klik latar, pindah kartu, panah & titik carousel, penguncian scroll).
  `typecheck`, `lint`, `build` bersih, tanpa error konsol.
- **Escape dan fokus keyboard belum bisa diuji otomatis.** Di harness otomasi
  browser yang saya pakai, event `close` sebuah `<dialog>` tidak pernah terpicu
  — bahkan pada `<dialog>` polos tanpa React — dan tombol Escape tidak sampai ke
  dialog. Keduanya perilaku bawaan browser dan mestinya jalan, tapi **tolong
  dicoba manual**: buka detail, tekan Escape, lalu buka lagi kartu yang sama.
- **Lebar HP & tablet belum dilihat mata.**
