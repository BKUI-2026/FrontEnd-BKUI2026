---
id: FE-0011
tipe: Slides(Daftar Akun)+Components(FormDaftar, KolomIsian, HiasanDaftar)
author: Salman
fitur: Slicing halaman Daftar Akun
tanggal: 2026-09-02 15:05 WIB
status_integrasi: Belum Dikerjakan
---

## Deskripsi

Halaman `/daftar` — kartu formulir pendaftaran akun enam kolom di atas ilustrasi
pohon, bukit rumput, dan maskot. Rute baru; sebelumnya tidak ada halaman auth
sama sekali di repo.

Enam kolomnya mengikuti Figma persis: Nama Lengkap, Sekolah, Nomor HP, Email,
Kata Sandi, Konfirmasi Kata Sandi.

## Referensi Desain

Figma node [`358:4779`](https://www.figma.com/design/VleKZ99jmDFvSpE88joNQZ/BKUI-2026?node-id=358-4779)
("Desktop", 1512x982). **Belum ada varian mobile/tablet.** Di bawah `md`
kolomnya jadi satu lajur — turunan sendiri, perlu direview desainer.

## Status Integrasi API — dan kenapa tombolnya dimatikan

**Belum terhubung, dan memang belum bisa.** Endpoint auth di BE belum ada, dan
shape request/response-nya tidak boleh dikarang duluan (README boundary nomor
4). Tanpa tujuan yang pasti, formulir ini tidak punya tempat mengirim apa pun.

Yang dimatikan **tombolnya, bukan isiannya**. Isiannya tetap bisa dicoba,
difokus lewat keyboard, dan dinilai desainer.

Kenapa tombol dimatikan dan bukan sekadar tidak dipasangi handler: tombol yang
bisa ditekan tapi tidak melakukan apa-apa membuat orang mengetik nama, nomor
HP, dan **kata sandi** ke formulir yang membuang semuanya. Tombol mati plus
keterangan **di atasnya** (bukan di bawah) mengatakan hal itu sejak awal, bukan
setelah orang menyerah menekan.

Validasi juga sengaja belum ditulis: aturannya (panjang sandi minimum, format
nomor HP, apakah email harus unik) milik BE, dan menebaknya sekarang berarti
menulis aturan yang kemungkinan besar salah lalu harus dibongkar lagi.

**Begitu endpoint-nya ada:** pasang handler di `<form>` pada `FormDaftar`,
hidupkan tombolnya, tambahkan validasi yang mengikuti aturan BE.

## Keputusan yang perlu dikonfirmasi

- **Rute `/daftar`**, bukan `/register` — seluruh salinan teks di desain
  berbahasa Indonesia, dan rute `daftar-casa` serta `daftar-mentoring` yang
  sudah ada memakai kata yang sama. Kalau tim mau pola lain, ini saat termurah
  menggantinya.
- **Halaman ini belum bisa dicapai dari navigasi mana pun.** Navbar di Figma
  cuma punya "Masuk sebagai Siswa" (halaman masuk, bukan daftar) dan tombol itu
  sendiri masih mati. Perlu diputuskan dari mana pengguna masuk ke `/daftar`.
- **Tautan "Masuk" di kaki kartu belum jadi tautan** — halaman masuk belum ada
  dan rutenya belum dibuat. Menautkannya sekarang cuma menghasilkan 404.
- **Tidak ada pertanyaan "Are you a high school student?" di layar ini.** Di PRD
  pertanyaan itu ada di pengisian profil setelah daftar, dan itulah yang memberi
  role Student. Sengaja tidak saya tambahkan tanpa konfirmasi PM.

## Aksesibilitas

Formulir adalah tempat kesalahan aksesibilitas paling mahal, jadi ditulis
eksplisit di sini:

- **Label benar-benar terhubung** ke isiannya lewat `<label htmlFor>`, bukan
  teks yang kebetulan diletakkan di atasnya. Mengklik label memindahkan fokus,
  dan pembaca layar menyebut namanya saat isian difokus. Sudah diuji: keenam
  label menunjuk ke input yang benar.
- **Tombol mata `type="button"`.** Tanpa `type`, tombol di dalam `<form>`
  dianggap tombol kirim oleh browser — menekan mata malah mengirim formulir.
- Tombol mata membawa `aria-label` yang berubah ("Tampilkan/Sembunyikan kata
  sandi") dan `aria-pressed`.
- `autocomplete` diisi sadar per kolom (`name`, `organization`, `tel`, `email`,
  `new-password`), bukan dibiarkan browser menebak.

## Dekorasi

Pipeline sama seperti FE-0009/FE-0010: ekspor SVG frame, buang rect latar
kanvas, buang rect langit + dua grup tekstur awan (langitnya dari
`LatarHalaman`), buang grup `Cards`, lalu keluarkan tekstur raster jadi WebP.

Tekstur rumputnya **tidak disimpan ulang** — selisih rata-ratanya cuma 2,5 dari
255 terhadap tekstur ilustrasi Hero, jadi berkas Hero yang dipakai ulang.

Ikon mata dari Figma **membawa `<rect fill="#F5F5F5">` latar kanvas**; kalau
tidak dibuang, ikonnya tampil sebagai kotak abu-abu. Ini pola yang sama dengan
ekspor node lain — periksa tiap ikon baru.

Dipasang `slice` menutupi seluruh section, bukan ditempel ke satu tepi: pohon di
atas dan rumput di bawah sama-sama bagian komposisinya, jadi menempel ke salah
satu tepi menyisakan langit kosong di tepi yang lain.

## Catatan

- Dua design token baru: `--color-bkui-teks-tua` (#092D39, Primary/800) dan
  `--color-bkui-coklat-tua-teks` (#3D2609, Secondary/900). Yang kedua namanya
  berakhiran `-teks` karena `--color-bkui-coklat-tua` sudah dipakai untuk ujung
  gelap gradien titik carousel.
- **Sudah diverifikasi di desktop.** Diuji: tampilan cocok dengan Figma, tombol
  mata bekerja dua arah dengan label yang berubah, keenam label terhubung ke
  input yang benar, tombol kirim mati. `typecheck`, `lint`, `build` bersih,
  tanpa error konsol.
- **Lebar HP & tablet belum dilihat mata.**
