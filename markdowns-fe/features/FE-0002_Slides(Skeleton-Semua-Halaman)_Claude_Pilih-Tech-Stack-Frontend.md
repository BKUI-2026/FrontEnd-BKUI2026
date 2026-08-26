---
id: FE-0002
tipe: Slides(Skeleton Semua Halaman)
author: Claude
fitur: Pilih Tech Stack Frontend & Scaffold Routing Skeleton
tanggal: 2026-08-26 21:15 WIB
status_integrasi: Belum Dikerjakan
---

## Deskripsi

Per FE-0001 repo FE masih kosong (cuma README + `markdowns-fe/`) dan framework
teknis belum ditentukan. Entry ini mengunci stack FE dan men-scaffold kerangka
project + routing skeleton untuk 9 halaman.

**Scope entry ini: framework & routing saja.** Tidak ada slicing UI dari Figma,
tidak ada komponen visual, tidak ada fetch ke API. Tiap halaman cuma placeholder
yang menandai rutenya ada dan bisa dibuka.

### Stack yang diputuskan

| Layer | Pilihan | Alasan |
|---|---|---|
| Framework | Next.js 16 (App Router) | Butuh routing berbasis file untuk 9 halaman + kemampuan render server-side buat konten publik (Landing, Explore UI) supaya SEO-nya jalan. App Router juga punya route group yang memetakan langsung ke pembagian General Public vs Student |
| Bahasa | TypeScript | Response BE nanti diketik eksplisit, jadi kalau kontrak API berubah, error muncul saat build bukan saat user klik |
| Styling | Tailwind CSS 4 | Sudah ditetapkan sebagai wajib sejak awal (README + CURRENT_STATE) |
| React | 19 | Bawaan Next.js 16 |
| Linting | ESLint (config bawaan `next/core-web-vitals`) | Cukup untuk tahap ini, tidak perlu tambahan |

### Struktur routing

Pakai **route group** App Router — kurung di nama folder tidak ikut jadi URL,
jadi ini murni pengelompokan di level file:

```
src/app/
├── (public)/                    → General Public, tanpa login
│   ├── page.tsx                 → / .................... Landing Page
│   ├── explore-ui/              → /explore-ui .......... Explore UI
│   ├── merchandise/             → /merchandise ......... Merchandise Catalog
│   ├── ticket/                  → /ticket .............. Ticket
│   ├── daftar-casa/             → /daftar-casa ......... Daftar CASA
│   └── school-roadshow/         → /school-roadshow ..... School Roadshow Registration (diisi PJ Sekolah)
└── (student)/                   → Student, butuh login
    ├── profile/                 → /profile ............. Profile
    ├── dashboard/               → /dashboard ........... Student Dashboard
    └── daftar-mentoring/        → /daftar-mentoring .... Daftar Mentoring
```

Pembagian dua group ini **bukan role baru** — persis mencerminkan 2 kondisi yang
sudah ada: General Public (belum login) dan Student (sudah login). Tidak ada
state ketiga.

Catatan penempatan:
- **School Roadshow ada di `(public)`**, bukan `(student)`, karena diisi PJ
  Sekolah — perwakilan sekolah yang mengakses tanpa akun dan tanpa role khusus.
- **Daftar CASA ada di `(public)`** karena form pendaftaran publik.
- **Daftar Mentoring ada di `(student)`** karena butuh akun.

### Keputusan kecil yang perlu diketahui partner

**Dev server FE jalan di port 3001, bukan 3000.** BE sudah memakai 3000, dan
3001 kebetulan sudah masuk whitelist `CORS_ORIGINS` di BE — jadi keduanya bisa
hidup bersamaan tanpa konfigurasi tambahan. Script `dev` sudah dikunci ke port
ini supaya tidak ada yang tabrakan lalu bingung kena CORS.

**Ticket & Merchandise murni redirect.** Kedua halaman cuma menyimpan CTA yang
mengarah ke `NEXT_PUBLIC_YESPLIS_TICKET_URL` dan
`NEXT_PUBLIC_YESPLIS_MERCH_URL`. Tidak ada cart, checkout, form pembayaran,
maupun state keranjang di manapun. URL asli Yesplis masih TBD
(`integrations/yesplis-redirect.md`), jadi env-nya sengaja dibiarkan kosong dan
CTA-nya dinonaktifkan selama belum diisi — lebih baik tombol mati daripada
menebak URL.

## Referensi Desain

Belum dipakai. Desain Figma sudah final, tapi entry ini sengaja tidak menyentuh
visual sama sekali — slicing menyusul di FE-0003 dst.

## Status Integrasi API

**Belum ada satupun halaman yang terhubung ke API.** Semua `Belum Dikerjakan`.

Yang sudah disiapkan cuma kerangka pemanggilnya di `src/lib/api.ts`: helper
`apiFetch` yang membaca base URL dari `NEXT_PUBLIC_API_BASE_URL` dan selalu
mengirim `credentials: 'include'` (dibutuhkan flow auth cookie dari BE).

Satu-satunya endpoint yang diketik adalah `GET /api/v1/health`, karena itu
**satu-satunya endpoint yang benar-benar sudah ada** di BE per
`BackEnd-BKUI2026` ARCH-0002. Shape-nya disalin dari kontrak BE, bukan karangan:

```ts
{ status: 'ok' | 'degraded'; timestamp: string; uptime: number; database: 'up' | 'down' }
```

Endpoint auth, form registrasi, dan content **belum didefinisikan di BE**. Sesuai
boundary nomor 4, tidak ada tipe response yang dibuat untuk itu — tidak ada
`LoginResponse`, `UserProfile`, atau sejenisnya yang dikarang duluan. Begitu BE
merilis kontraknya, catat di `integrations/backend-api-contract.md` dulu, baru
bikin tipenya.

## Catatan

**Blocker / nunggu pihak lain:**
- URL Yesplis (tiket & merch) masih TBD — CTA belum bisa diaktifkan.
- Google Client ID belum ada — env `NEXT_PUBLIC_GOOGLE_CLIENT_ID` sudah
  disiapkan tapi kosong. Tombol login belum dibuat karena endpoint auth BE juga
  belum ada.
- Konten Student Dashboard belum ditentukan (AGENTS.md bagian 9) — halamannya
  sengaja cuma placeholder, tidak diisi tebakan.

**Yang sengaja TIDAK dibuat di entry ini:** komponen Navbar/Footer/Card, guard
autentikasi, state management, dan section "Arah Petualangan" di Landing Page.
Semuanya butuh acuan Figma dan/atau kontrak API yang belum tersedia.

**Alternatif yang sempat dipikirkan:**
- **Vite + React Router.** Lebih ringan dan cepat di dev. Tidak dipilih karena
  Landing Page dan Explore UI adalah halaman publik yang perlu terindeks mesin
  pencari — SPA murni bikin SEO jadi pekerjaan tambahan, sementara Next.js
  memberi itu tanpa usaha ekstra.
- **Astro.** Paling optimal untuk konten statis, tapi Student Dashboard dan form
  registrasi cukup interaktif; mencampur island di beberapa halaman menambah
  kompleksitas yang tidak sepadan.
- **Next.js Pages Router.** Lebih familiar bagi sebagian orang, tapi tidak punya
  route group, jadi pemisahan General Public vs Student harus diurus manual.
