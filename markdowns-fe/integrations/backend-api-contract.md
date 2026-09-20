---
nama_integrasi: Kontrak API Backend (referensi lintas repo)
status: living doc
owner: BE
---

## Deskripsi
File ini BUKAN salinan kontrak API, cuma pointer. Source of truth kontrak API ada di repo BackEnd-BKUI2026, karena BE yang mendefinisikan bentuk endpoint.

## Lokasi Source of Truth
../../BackEnd-BKUI2026/markdowns-be/integrations/ (tiap file per integrasi) dan ../../BackEnd-BKUI2026/markdowns-be/architecture/CURRENT_STATE.md (bagian "Struktur API").

> Link relatif ini jalan selama folder FrontEnd-BKUI2026 dan BackEnd-BKUI2026 tetap sibling di dalam folder project-bkui2026 seperti sekarang.

## Endpoint yang Dipakai FE

Semua di bawah base path `/api/v1`. Pemanggilnya ada di `src/lib/api.ts`.

| Method | Path | Auth | Dipakai di |
|---|---|---|---|
| POST | `/auth/register` | — | `/daftar` |
| POST | `/auth/login` | — | `/masuk` |
| POST | `/auth/refresh` | cookie | pemulihan sesi saat aplikasi dimuat |
| POST | `/auth/logout` | cookie | tombol Keluar di sidebar |
| GET | `/auth/google` | — | belum dipakai (tombolnya belum ada di UI) |
| GET | `/users/me` | Bearer | pemulihan profil |
| PATCH | `/users/me` | Bearer | `/profile` |
| GET | `/mentoring-registrations/me` | Bearer + STUDENT | `/dashboard` |
| POST | `/mentoring-registrations` | Bearer + STUDENT | belum dipakai (halaman masih placeholder) |
| POST | `/school-roadshow-registrations` | — | `/school-roadshow` |
| POST | `/casa-registrations` | — | belum dipakai (halaman masih placeholder) |
| GET | `/contents`, `/contents/:slug` | — | belum dipakai |

## Dua Aturan yang Gampang Kelewat

1. **Semua permintaan wajib `credentials: 'include'`.** Refresh token ada di
   cookie httpOnly milik BE; tanpa ini sesi tidak akan pernah pulih setelah
   halaman dimuat ulang.
2. **Role ikut tertulis di dalam access token.** Setelah `PATCH /users/me`
   mengubah `isHighSchoolStudent`, token lama masih membawa role lama dan BE
   akan menolak endpoint Student dengan 403 sampai `POST /auth/refresh`
   dipanggil. `src/lib/auth-state.tsx` sudah menanganinya otomatis.

## Catatan Sinkronisasi
Tiap kali kontrak API berubah di BE, catat di sini: tanggal & jam, endpoint yang berubah, ARCH/commit terkait di BE.

| Tanggal & Jam | Endpoint | Perubahan | Ref BE |
|---|---|---|---|
| 2026-08-26 20:45 WIB | `GET /api/v1/health` | Endpoint pertama BE. Response `{ status: 'ok'\|'degraded', timestamp: string, uptime: number, database: 'up'\|'down' }`. Base path semua endpoint: `/api/v1`, BE jalan di port 3000. CORS `credentials: true`, origin FE harus terdaftar di env `CORS_ORIGINS` sisi BE. | BE ARCH-0002 |
| 2026-08-31 13:30 WIB | Auth, Users, Mentoring, CASA, School Roadshow, Content | Seluruh endpoint MVP rilis. Access token di body response, refresh token di cookie httpOnly (`bkui_refresh_token`, path `/api/v1/auth`) dengan rotasi tiap refresh. Bentuk galat seragam: `{ statusCode, message: string\|string[], error, path, timestamp }`. Rate limit: login 10/menit, register & form publik 5/menit per IP. | BE ARCH-0003 |
| 2026-09-20 15:40 WIB | `POST /auth/register` | `isHighSchoolStudent` jadi **opsional** (default `false` → role GENERAL_PUBLIC). Sebelumnya wajib, sementara form Daftar di Figma tidak menanyakannya — registrasi dari FE selalu ditolak 400. | BE ARCH-0004 |
| 2026-09-20 15:40 WIB | `POST /school-roadshow-registrations` | Tiga field **wajib** ditambahkan: `schoolAddress` (string), `schoolEmail` (email), `targetStudentCount` (integer ≥ 1). Ketiganya memang sudah dikumpulkan form FE dan diminta PRD, tapi belum ada di BE. Email konfirmasi kini dikirim ke `schoolEmail` dengan tembusan ke `pjEmail`. | BE ARCH-0004 |
