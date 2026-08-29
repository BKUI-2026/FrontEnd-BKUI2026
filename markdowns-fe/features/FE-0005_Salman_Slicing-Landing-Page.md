---
id: FE-0005
tipe: Slides(Landing Page)+Components(Hero)+Components(ApaItuBKUI)+Components(VideoBKUI)+Components(ArahPetualangan)+Components(PapanArah)+Components(TokohInspirasi)+Components(Timeline)+Components(TestimoniCASA)+Components(FAQ)+Components(SponsorCarousel)+Components(SectionLangit)+Components(DekorBendera)+Components(JudulSticker)+Components(ButtonPil)
author: Salman
fitur: Slicing Landing Page dari Figma
tanggal: 2026-08-29 09:45 WIB
status_integrasi: Masih Dummy Data
---

## Deskripsi

Mengisi Landing Page (`/`) yang sebelumnya cuma `PagePlaceholder` (FE-0002)
dengan seluruh section sesuai desain Figma. Ini pertama kalinya ada halaman yang
benar-benar dislicing penuh di repo ini.

Sumber desain: Figma **BKUI-2026**, node `72:725` (frame "ANJAY PANJANG BGT",
1512 x 8334).

### Section yang dibuat

Urutannya mengikuti Figma dan daftar fitur AGENTS.md bagian 4 nomor 2:

| # | Section | Komponen | Isi |
|---|---|---|---|
| 1 | Hero | `Hero` | Ilustrasi perkemahan + CTA "Jelajahi Lebih Lanjut" |
| 2 | Apa itu BKUI 2026 | `ApaItuBKUI` | Tenda maskot + judul + deskripsi |
| 3 | Video | `VideoBKUI` | Bingkai video (Teaser/Trailer/After Movie) |
| 4 | Arah Petualangan | `ArahPetualangan`, `PapanArah` | Dua papan kayu: Peserta & Sekolah |
| 5 | Tokoh Inspirasi | `TokohInspirasi` | Grid kartu pembicara (Speakers) |
| 6 | Timeline | `Timeline` | Rangkaian acara, jalur berkelok |
| 7 | Apa Kata Mereka | `TestimoniCASA` | Carousel testimoni |
| 8 | FAQ | `FAQ` | Accordion |
| 9 | Sponsor | `SponsorCarousel` | Deretan logo sponsor |

Navbar (FE-0004) dan Footer sudah ada dari sebelumnya, dipakai apa adanya dari
root layout — tidak disentuh.

### Komponen bersama yang lahir dari sini

- **`ui/JudulSticker`** — judul "stiker" khas BKUI (isi hijau, outline krem,
  outline pink, bayangan). Dipakai di 5 section. Dibuat dari **teks sungguhan**
  yang ditumpuk tiga lapis, bukan gambar hasil ekspor: tetap tajam di layar
  manapun, terbaca screen reader, dan judul baru cukup ditulis tanpa minta aset
  baru ke designer. Detail cara menumpuknya ada di `globals.css`.
- **`ui/ButtonPil`** — tombol pil dari Figma (style `Button/Large`).
  Beda dari `ButtonPesanTiket` yang khusus CTA oren di navbar.
- **`landing/SectionLangit`** — pembungkus section berlatar langit. Di Figma
  tiap section pakai latar yang sama, jadi dipusatkan di sini.
- **`landing/DekorBendera`** — deretan bendera segitiga, dipakai ulang 3x.

### Design token yang ditambahkan

`globals.css` sebelumnya cuma punya 3 warna (FE-0004). Sekarang seluruh Local
Variables dari Figma sudah masuk sebagai token — 20 warna + 3 keluarga font.
Nama variabel Figma ditulis di komentar tiap token supaya bisa ditelusuri balik.

Font (baru, sebelumnya belum ada sama sekali):

| Token | Font | Dipakai untuk |
|---|---|---|
| `font-display` | Talina DEMO | Semua judul display |
| `font-ui` | Delight | Subheading, angka tahun, label tombol |
| `font-body` | Inter | Paragraf |

Dimuat lewat `next/font` (self-hosted) dari `lib/fonts.ts`.

## Referensi Desain

Figma BKUI-2026 node `72:725`. Node per section yang jadi acuan:

| Section | Node |
|---|---|
| Hero | `38:3727` |
| Apa itu BKUI | `75:730` (isi: `154:1216`) |
| Video | `100:159` |
| Arah Petualangan | `100:647` (papan: `224:53`) |
| Tokoh Inspirasi | `160:655` (kartu: `142:1182`) |
| Timeline | `215:382` (pil: `252:248`) |
| Testimoni | `100:695` (kartu: `204:124`) |
| FAQ + Sponsor | `299:1113` (accordion: `299:1131`) |

Aset ilustrasi diekspor langsung dari Figma lewat MCP, bukan digambar ulang.

## Status Integrasi API

**`Masih Dummy Data`** — naik dari `Belum Dikerjakan`.

**Tidak ada satupun fetch ke API di halaman ini.** Endpoint `Content` di BE belum
ada (per BE ARCH-0002 satu-satunya endpoint yang jalan masih `GET /api/v1/health`),
jadi sesuai README boundary nomor 4 tidak ada tipe response yang dikarang.

Seluruh konten dikumpulkan di **`src/lib/landing-content.ts`**. Komponen section
tidak menyimpan teks konten sama sekali — begitu endpoint Content rilis, cukup
file itu yang diganti jadi pemanggil API.

Yang masih dummy: deskripsi BKUI, daftar tokoh, testimoni, isi FAQ, daftar
sponsor, dan URL video.

### Yang TIDAK dibuat (sesuai batasan)

- **Tidak ada checkout/cart/payment.** CTA "Pesan Tiket Siswa" cuma `<Link>` ke
  `/ticket` (README boundary nomor 1).
- **Tidak ada guard autentikasi.** Section Arah Petualangan cuma UI + link;
  role-routing sungguhan menunggu Auth.
- **Video player tidak menebak URL.** `VIDEO_LANDING.url` masih `null`, yang
  tampil bingkai kosong dengan keterangan — bukan iframe ke URL karangan.

## Catatan

### PERLU KEPUTUSAN PM — lisensi font Talina DEMO

Font judul di Figma adalah **Talina DEMO**, dan file DEMO-nya berlisensi
**PERSONAL USE ONLY**. EULA-nya (`talina-demo/Readme (DEMO).txt`) eksplisit
melarang pemakaian komersial termasuk iklan & promosi.

Website BKUI menjual tiket (lewat Yesplis) dan menampilkan sponsor, jadi
kemungkinan besar tidak memenuhi syarat "personal use". **Lisensi komersialnya
perlu dibeli sebelum website live** —
https://creativemarket.com/PandekaStudio/291566479-Talina-Playful-Bold-Sans

Font-nya tetap dipasang supaya tampilannya sama persis dengan Figma. Kalau
lisensinya tidak jadi dibeli, cukup ganti `src` di `lib/fonts.ts`; komponen lain
tidak perlu disentuh karena semua judul memakai token `font-display`.

### Nama tokoh diganti jadi placeholder netral

Di Figma, kartu Tokoh Inspirasi memakai nama seorang publik figur sebagai
placeholder. Nama itu **tidak dipakai** di kode — diganti "Nama Tokoh 1..8".
Menampilkan nama orang asli sebagai pembicara yang belum tentu diundang bisa
terbaca sebagai klaim palsu. Ganti dengan daftar asli begitu PM memberikan.

### Teks Lorem ipsum sengaja dipertahankan

Deskripsi BKUI, testimoni, dan jawaban FAQ masih Lorem ipsum persis seperti di
Figma — memang belum ditulis PM. Sengaja tidak dikarang sendiri: teks karangan
yang terlihat masuk akal lebih berbahaya daripada Lorem ipsum, karena bisa ikut
terbawa ke produksi tanpa ada yang sadar itu bukan konten resmi.

### Penyesuaian dari desain (perlu dikonfirmasi ke designer)

1. **Tombol hero dibuat ulang sebagai HTML.** Di Figma tombol "Jelajahi Lebih
   Lanjut" menempel jadi bagian gambar. Tombol itu dihapus dari file ilustrasi
   dan diganti tombol sungguhan supaya bisa difokus lewat keyboard dan dibaca
   screen reader. Di layar sempit tombolnya turun ke bawah gambar, karena kalau
   ditumpuk di atas ilustrasi setinggi ~200px dia menutupi separuh gambar.
2. **Judul hero jadi bagian gambar.** "Selamat Datang di BKUI 2026" di Figma
   dilengkungkan mengikuti path — bentuknya tidak bisa direproduksi dengan teks
   HTML tanpa kehilangan karakternya. Teks aslinya tetap ada sebagai `<h1>`
   khusus screen reader.
3. **Tinggi section tidak dikunci 885px.** Di Figma tiap frame setinggi itu
   karena kanvas desktop memang segitu; di web tinggi harus ikut isinya supaya
   teks tidak terpotong saat font diperbesar.
4. **Bingkai video dibangun pakai CSS**, bukan aset SVG, supaya isinya bisa jadi
   `<iframe>`/`<video>` sungguhan dengan rasio 16:9 di semua lebar layar.
5. **Timeline punya dua susunan.** Jalur berkelok dipakai dari `lg` ke atas; di
   bawah itu jadi daftar vertikal, karena pil di jalur berkelok akan mengecil
   sampai tidak terbaca. Isinya dari sumber data yang sama.
6. **Carousel testimoni & sponsor tidak jalan otomatis.** Konten yang berganti
   sendiri menyulitkan orang yang membaca lambat atau memakai screen reader, dan
   di Figma tidak ada indikasi keduanya berjalan sendiri. Ditambahkan penanda
   "Testimoni X dari Y" yang tidak ada di Figma — tanpa itu pengunjung tidak tahu
   ada berapa banyak.
7. **Foto tokoh & testimoni pakai siluet placeholder**, karena fotonya nanti
   datang dari Admin. Tidak ada file foto siapapun yang dimasukkan ke repo.

### Aset

Aset diekspor dari Figma lalu dikompres ke WebP/SVG. Semua di bawah 300 KB
sesuai konvensi `public/README.md` (paling besar `hero-bkui2026.webp`, 132 KB).

Dua catatan teknis untuk yang mengekspor aset berikutnya:

- **Ekspor PNG dari Figma ikut membawa warna latar** (`#FDFDFC` untuk grup lepas,
  `#84C2F6` untuk isi frame section), jadi hasilnya tidak transparan. Latarnya
  dibuang dengan flood fill dari tepi gambar — bukan chroma key — supaya putih
  yang ada **di dalam** artwork (outline stiker) tidak ikut terhapus.
- **Langit bukan satu gambar.** Di Figma latarnya warna `#84C2F6` plus dua lapis
  tekstur awan putih tipis. Kedua tekstur digabung jadi `awan.webp` dan
  opasitasnya diturunkan lewat CSS; kalau ditempel penuh, langitnya jadi putih
  polos.

Folder baru: `public/image/landing/`, `public/icon/landing/`, `public/fonts/`.

### Verifikasi

`npm run typecheck`, `npm run lint`, dan `npm run build` semuanya lolos (exit 0).

Dicek visual di browser pada lebar **1512px** dan **390px**:
- Sembilan section tampil dan urutannya cocok dengan Figma.
- Judul stiker: ketiga lapisnya membungkus di titik yang sama, termasuk saat
  judul panjang pecah jadi dua baris di layar sempit.
- Accordion FAQ bisa dibuka-tutup (pakai `<details>`, jalan tanpa JavaScript).
- Carousel testimoni berpindah lewat tombol panah.
- Grid Tokoh Inspirasi turun bertahap 4 → 3 → 2 → 1 kolom.
- Timeline berganti dari jalur berkelok ke daftar vertikal di bawah `lg`.
- Console browser bersih (error yang sempat muncul berasal dari alat uji
  responsif yang saya suntik ke halaman, bukan dari kode halaman).

**Belum diverifikasi:** tampilan tablet di antara 768–1024px belum dicek satu per
satu, dan belum ada pengecekan lintas browser (baru Chrome).
