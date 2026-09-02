---
id: FE-0010
tipe: Slides(Ticket)+Components(LatarTiket, HiasanTiket, DaftarTier, KartuKatalog, DetailKatalog)
author: Salman
fitur: Slicing halaman Ticket + kartu katalog jadi komponen bersama
tanggal: 2026-09-02 14:20 WIB
status_integrasi: Masih Dummy Data
---

## Deskripsi

Halaman `/ticket` yang sebelumnya `PagePlaceholder` sekarang sudah dislicing
penuh: judul stiker "Pesan Tiket" dan tiga kartu tier (Gold, Silver, Bronze)
di atas hamparan rumput berbunga.

Sekalian, kartu katalog dan overlay detailnya diangkat jadi komponen bersama di
`src/components/katalog/`, dipakai halaman Merchandise maupun Ticket.

## Referensi Desain

Figma node [`367:4893`](https://www.figma.com/design/VleKZ99jmDFvSpE88joNQZ/BKUI-2026?node-id=367-4893)
("Desktop", 1512x885). **Belum ada varian mobile/tablet.**

## Kartu katalog jadi komponen bersama

Di Figma, kartu produk Merchandise (`338:1061`) dan kartu tier Tiket
(`367:4924`) **bukan dua desain mirip — keduanya susunan yang sama persis**,
sampai ke lebar tombolnya (146px + 159px) dan teks tombolnya ("Lihat Detail" +
"Beli di Yesplis"). Jadi komponennya juga disatukan:

| Sebelum | Sekarang |
|---|---|
| `components/merch/KartuMerch.tsx` | `components/katalog/KartuKatalog.tsx` |
| `components/merch/DetailMerch.tsx` | `components/katalog/DetailKatalog.tsx` |
| — | `lib/katalog.ts` — tipe `ItemKatalog` + format rupiah |

`Produk` (merch) sekarang `ItemKatalog & { kategori }`; tier tiket memakai
`ItemKatalog` apa adanya. Field khusus halaman ditambahkan di tipe
masing-masing, bukan di tipe bersamanya.

`ItemKatalog` **sengaja tidak punya field transaksi** — tidak ada jumlah beli,
varian terpilih, atau status keranjang, dan jangan ditambahkan. Merch maupun
Tiket sama-sama katalog: seluruh pembelian keluar ke Yesplis.

## Batasan: tidak ada payment gateway

Halaman tiket paling rawan melanggar README boundary nomor 1. Yang ada cuma
info tier + dua tombol: "Lihat Detail" (membuka overlay di halaman yang sama)
dan "Beli di Yesplis" (link keluar). Tidak ada checkout, cart, atau form
pembayaran.

"Beli di Yesplis" **masih dimatikan** karena `NEXT_PUBLIC_YESPLIS_TICKET_URL`
kosong. Begitu diisi, tombolnya hidup sendiri tanpa ubah kode.

## Latar rumput — satu-satunya halaman yang bukan langit

Di Figma kameranya seolah menunduk ke rumput, jadi `LatarHalaman` milik
Explore/Merch tidak dipakai. `LatarTiket` menumpuk tiga lapis:

1. warna dasar `--color-bkui-rumput` (#606420), **diukur** dari render Figma
   pada area rumput yang bersih dari kartu dan bunga
2. tekstur rumput, `soft-light` 35%
3. lapisan butiran selebar kanvas, `multiply`

Tekstur rumputnya **berkas yang sama** dengan tekstur ilustrasi Hero
(`image/landing/hero/rumput-tekstur.webp`) — Figma memakai gambar sumber yang
sama di kedua tempat, jadi dipakai ulang daripada menyimpan salinan ketiga.

Ketiganya harus jadi anak langsung elemen berwarna dasar: `mix-blend-mode`
berbaur dengan apa yang ada di belakangnya dalam konteks penumpukan yang sama.

## Jebakan: elemen `multiply` yang kehilangan alasnya

Setelah alas rumput dibuang dari SVG (dipindah ke CSS supaya bisa mengikuti
tinggi halaman), satu grup selebar kanvas ber-`mix-blend-mode: multiply` di
dalam SVG **tidak lagi punya apa-apa untuk dikalikan**. Hasilnya ia tampil
mentah sebagai bidang krem yang menutupi seluruh halaman — rumputnya benar,
cuma tidak kelihatan sama sekali.

Cara menemukannya: sembunyikan SVG-nya lewat devtools. Kalau latarnya langsung
benar, penyebabnya ada di SVG, bukan di CSS.

Solusinya grup itu dibuang dari SVG dan dipindah ke `LatarTiket` sebagai
lapisan CSS `multiply`. **Pelajaran umumnya: tiap kali sebuah lapisan dasar
dikeluarkan dari SVG ekspor Figma, periksa apakah ada elemen ber-blend-mode
yang bergantung padanya.**

## Animasi

Diminta yang "agak keliatan", jadi geraknya sengaja lebih tegas dari halaman
lain:

| Elemen | Gerakan |
|---|---|
| Tiga bunga kuning | berputar 24s / 31s (terbalik) / 38s |
| Dua matahari oranye | berputar 45s / 62s (terbalik) |
| Kelopak merah muda | bergoyang 2,2 derajat, 7s |
| Aliran biru | opacity 0,74-1, 6,5s |
| Tiga kartu tier | naik 48px + membesar dari 0,94 — varian `MUNCUL_TEGAS` |
| Kartu saat hover | terangkat 10px (di halaman lain 6px) |

Kecepatan putarnya sengaja dibedakan dan sebagian dibalik arah. Kalau semuanya
berputar sama, mata langsung membacanya sebagai animasi mesin, bukan taman.
Matahari diputar jauh lebih lambat karena ukurannya besar — pada ukuran itu
putaran cepat langsung norak.

Jeda antar kartu dinaikkan jadi 160ms (`BERURUTAN_TIER`): dengan cuma tiga
elemen, jeda 90ms selesai terlalu cepat untuk terbaca sebagai berurutan.

### Bunga & matahari harus dibungkus dulu sebelum bisa diputar

Elemen bunga dan matahari di SVG **sudah membawa atribut
`transform="rotate(...)"` dari Figma** yang menaruhnya pada posisi & sudut yang
benar. Menulis `transform` lewat CSS akan menimpanya dan hiasannya terlempar.

Memakai properti `rotate` (yang menumpuk di atas `transform`, bukan menimpanya)
juga belum cukup: porosnya default di titik (0,0) kanvas, jadi bunganya terbang
keluar layar. Menyetel `transform-origin` untuk memperbaikinya justru merusak
`transform` bawaannya, karena origin berlaku untuk keduanya.

Jalan keluarnya: saat SVG diproses, tiap bunga & matahari **dibungkus `<g>`
polos**. Pembungkusnya tidak punya transform, jadi bebas diputar, dan
`transform-box: fill-box` membuat porosnya di tengah bentuknya sendiri.

Semua animasi dimatikan pada `prefers-reduced-motion`.

## Status Integrasi API

Belum ada request ke BE. Nama tier (Gold/Silver/Bronze) diambil dari Figma;
harga (Rp1.000.000.000) dan stok (24) masih nilai placeholder dari Figma.
Deskripsi per tier **belum ditulis PM** — sementara diisi kalimat yang jujur
menyatakan itu ("Rincian benefit tiap tier belum tersedia").

## Catatan

- **Dekorasi ditempel ke tepi ATAS** dengan rasio aslinya, bukan diregangkan.
  Di desktop tingginya persis kanvas Figma sehingga semua hiasan pas. Di layar
  sempit halamannya lebih panjang; sisanya diisi rumput polos — lebih baik
  daripada meregangkan ilustrasi sampai gepeng. (Beda dari Merch, yang
  dekorasinya ditempel ke BAWAH karena isinya memang duduk di dasar halaman.)
- **Sudah diverifikasi visual di desktop** dan cocok dengan Figma. Diuji: tiga
  tier tampil, overlay detail buka-tutup, dan halaman Merchandise **tidak rusak
  oleh refactor** (9 kartu, overlay, penyaring Apparel → 3 produk). `typecheck`,
  `lint`, `build` bersih.
- **Lebar HP & tablet belum dilihat mata.**
