---
id: FE-0012
tipe: Slides(Masuk)+Components(FormMasuk, HiasanMasuk)
author: Salman
fitur: Slicing halaman Masuk + status galat formulir
tanggal: 2026-09-02 15:50 WIB
status_integrasi: Belum Dikerjakan
---

## Deskripsi

Halaman `/masuk` — kartu formulir dua kolom (Email, Kata Sandi) di atas
ilustrasi bukit rumput dan maskot, lengkap dengan status galatnya.

Sekalian, tautan "Masuk" di kaki halaman Daftar sekarang berfungsi, dan
sebaliknya "Daftar" di halaman Masuk menuju `/daftar`. Kedua halaman auth sudah
saling terhubung.

## Referensi Desain

Figma node [`359:4815`](https://www.figma.com/design/VleKZ99jmDFvSpE88joNQZ/BKUI-2026?node-id=359-4815)
("Desktop", 1512x982), plus status galat dari tangkapan layar desain.

Warna teks galat **#EA3526** tidak ada di daftar variabel Figma, jadi diukur
dari render status error tersebut (inti hurufnya, bukan tepi anti-alias).
Disimpan sebagai token `--color-bkui-galat`.

## Kenapa tombolnya HIDUP di sini, padahal di halaman Daftar dimatikan

Bukan karena endpoint auth sudah ada — **belum**. Bedanya: desain halaman ini
punya status galat, dan status itu tidak bisa ditinjau kalau tombolnya mati.

Jadi tombolnya hidup dan menjalankan pemeriksaan yang memang **milik
frontend**:

| Kondisi | Pesan |
|---|---|
| Email atau sandi kosong | "Email dan kata sandi wajib diisi." |
| Format email salah | "Format email belum benar." |
| Lolos keduanya | "Masuk belum bisa diproses. Layanan akun di server belum tersedia." |

Yang **tidak** saya tulis: pesan "Email atau kata sandi salah" seperti di
desain. Itu jawaban server — mengarangnya berarti memberi tahu pengguna sesuatu
yang tidak pernah diperiksa siapa pun. Aturan yang jelas milik BE (panjang sandi
minimum, misalnya) juga tetap tidak ditebak.

Halaman Daftar tombolnya tetap mati karena isiannya enam kolom berisi data
pribadi; membiarkan orang mengisi semuanya untuk dibuang lebih merugikan
daripada dua kolom di sini.

**Begitu endpoint-nya ada:** ganti isi fungsi `kirim` di `FormMasuk` dengan
panggilan sungguhan, dan `pesanGalat` tinggal diisi pesan dari server. Slot
galatnya sudah siap.

## Aksesibilitas

- Wadah pesan galat memakai `role="alert"` — pembaca layar mengumumkan isinya
  begitu muncul, tanpa pengguna harus menyusuri halaman mencarinya.
- Elemennya **selalu dirender** (dengan `min-h-6`), bukan dicabut lalu dipasang
  lagi. Elemen `role="alert"` yang baru muncul setelah kejadian kadang tidak
  terumumkan; yang sudah ada sejak awal dan isinya berubah, pasti.
- `<form noValidate>`: validasi bawaan browser dimatikan supaya pesan galatnya
  satu pintu dan berbahasa Indonesia, bukan gelembung bawaan browser yang
  bahasanya ikut setelan OS.
- `autocomplete="current-password"` di halaman ini (bukan `new-password` seperti
  di Daftar) supaya pengelola kata sandi menawarkan sandi yang tersimpan, bukan
  membuatkan yang baru.

## Dekorasi & aset

Pipeline sama seperti FE-0011. Yang perlu dicatat: **tidak ada satupun berkas
gambar baru**. Tekstur rumput dan maskotnya ternyata berkas yang sama persis
dengan yang sudah ada (selisih 2,1 dan 0,0 dari 255), jadi dipakai ulang dari
`image/landing/hero/` dan `image/auth/`.

## Catatan

- Rute `/masuk`, sejalan dengan `/daftar`.
- **Halaman ini masih belum bisa dicapai dari navigasi.** Tombol "Masuk sebagai
  Siswa" di Navbar masih mati (endpoint auth belum ada). Menautkannya ke
  `/masuk` sekarang sebenarnya sudah masuk akal — tapi itu mengubah perilaku
  Navbar yang sudah disetujui, jadi saya tunggu keputusan. Lihat daftar "Perlu
  Keputusan PM" di CURRENT_STATE.
- **Sudah diverifikasi di desktop.** Diuji: ketiga cabang pesan galat muncul
  dengan teks yang benar, warnanya terukur `rgb(234, 53, 38)` = #EA3526,
  tautan Daftar ↔ Masuk bolak-balik jalan. `typecheck`, `lint`, `build` bersih,
  tanpa error konsol.
- **Lebar HP & tablet belum dilihat mata.**
