---
id: FE-0026
tipe: gabungan keduanya
author: Claude
fitur: Integrasi FE ke API Backend — Auth, Sesi, Profil, School Roadshow, Dashboard
tanggal: 2026-09-20 15:40 WIB
status_integrasi: Terhubung ke API
---

## Deskripsi

Kontrak API BE akhirnya rilis (BE ARCH-0003), jadi halaman-halaman yang selama
ini sudah selesai dislicing tapi tombolnya mati kini benar-benar terhubung.

Yang berubah:

**Lapisan API (`src/lib/api.ts`)** — ditulis ulang. Tipe di dalamnya disalin
dari kontrak BE, bukan dikarang (boundary nomor 4). Isinya sekarang mencakup
seluruh endpoint yang dipakai FE, penanganan galat seragam, dan pembawa access
token.

**Sesi (`src/lib/auth-state.tsx`)** — dari placeholder yang selalu mengembalikan
"General Public" jadi `AuthProvider` sungguhan.

Cara token disimpan, dan alasannya:
- Access token hidup di **memori**, bukan localStorage. Token di localStorage
  bisa dibaca skrip apa pun yang berhasil masuk ke halaman.
- Refresh token tidak pernah disentuh FE sama sekali — BE menaruhnya di cookie
  httpOnly. FE cukup mengirim `credentials: 'include'`.
- Konsekuensinya: muat ulang halaman menghapus access token, dan sesi dipulihkan
  lewat `POST /auth/refresh`. Itulah kenapa ada status **"memuat"**; tanpa itu
  setiap muat ulang akan sekejap menampilkan tombol "Masuk" kepada orang yang
  sudah masuk, dan penjaga rute akan mengusir mereka dari halamannya sendiri.

**Halaman yang tersambung:**

| Halaman | Endpoint |
|---|---|
| `/masuk` | `POST /auth/login` |
| `/daftar` | `POST /auth/register` |
| `/profile` | `GET` & `PATCH /users/me` |
| `/dashboard` | `GET /mentoring-registrations/me` |
| `/school-roadshow` | `POST /school-roadshow-registrations` |
| Navbar & sidebar | sesi + `POST /auth/logout` |

**Penjaga rute** — `PenjagaSesi` dipasang di layout route group `(student)`,
jadi halaman baru di grup itu otomatis ikut terjaga. Ini penjaga sisi klien
untuk mengarahkan pengguna; yang benar-benar mengamankan data tetap BE.

**`/auth/callback`** — halaman baru. Alamatnya bukan pilihan FE: BE yang
mengarahkan browser ke sana setelah Google SSO. Dibuat meski belum ada tombol
"Masuk dengan Google" di UI, karena tanpa halaman ini siapa pun yang masuk
lewat alur Google akan mendarat di 404 padahal sesinya sudah terlanjur dibuat
di server.

## Referensi Desain

Tidak ada perubahan desain. Seluruh tata letak, warna, dan komponen tetap
persis seperti hasil slicing Figma sebelumnya (FE-0011, FE-0012, FE-0013,
FE-0018). Yang berubah hanya sumber datanya dan keadaan tombol.

Penambahan yang murni kebutuhan integrasi, bukan desain baru:
- keadaan tombol "memproses" saat permintaan berjalan, supaya klik ganda tidak
  mengirim dua pendaftaran;
- keadaan kosong di "Acara Saya" ketika pengguna belum mendaftar mentoring —
  sebelumnya bagian itu selalu menampilkan dua kartu dummy;
- keterangan di halaman Profil bahwa email tidak bisa diubah sendiri.

## Status Integrasi API

Kontrak lengkap: `integrations/backend-api-contract.md` (diperbarui bersamaan).

Dua ketidakcocokan kontrak ditemukan saat integrasi ini dan sudah diperbaiki di
sisi BE — dikoordinasikan langsung, bukan diakali di FE:

1. **Form School Roadshow mengirim lebih banyak data daripada yang diterima BE.**
   Alamat sekolah, email sekolah, dan target jumlah siswa ada di form (dan
   diminta PRD), tapi belum ada di schema BE. BE menambahkannya.
2. **`POST /auth/register` mewajibkan `isHighSchoolStudent`,** padahal form
   Daftar di Figma tidak menanyakannya — registrasi dari FE akan selalu ditolak
   400. BE menjadikannya opsional.

## Catatan

**Yang masih menunggu keputusan PM — fitur Mentoring belum bisa dijangkau
siapa pun.**

Role Student di BE hanya bisa didapat dari jawaban "Are you a high school
student?". Pertanyaan itu tidak ada di layar mana pun: tidak di form Daftar
(Figma-nya enam kolom, tanpa pertanyaan ini) dan tidak di halaman Profil.
Akibatnya setiap akun baru berstatus General Public, dan menu Mentoring tidak
pernah muncul.

Jalur teknisnya sudah siap sepenuhnya — `PATCH /users/me` dengan
`isHighSchoolStudent: true` langsung memindahkan role, dan sudah diuji. Yang
kurang tinggal satu keputusan: **di layar mana pertanyaan itu diajukan.**
Tiga pilihan yang masuk akal: saat menekan "Daftar Mentoring" (paling dekat
dengan alur di PRD 5.1), di halaman Profil, atau di form Daftar. Menambah
pertanyaannya sendiri tanpa konfirmasi akan melanggar boundary nomor 2 & 3,
jadi sengaja tidak dilakukan.

**Dua halaman masih placeholder.** `/daftar-casa` dan `/daftar-mentoring` belum
punya desain Figma. Endpoint BE-nya sudah siap (`POST /casa-registrations` dan
`POST /mentoring-registrations`) dan pemanggilnya sudah ditulis di
`src/lib/api.ts`, jadi begitu desainnya ada, tinggal dipasang.

**Perubahan role butuh token baru.** Ini sempat jadi bug saat integrasi: role
ikut tertulis di dalam access token, jadi setelah profil diubah menjadi siswa,
UI sudah menampilkan menu Mentoring sementara BE masih menolak dengan 403 —
karena token yang dipegang masih membawa role lama. Sekarang `perbaruiProfil`
di `auth-state.tsx` otomatis menukar token begitu role berubah.
