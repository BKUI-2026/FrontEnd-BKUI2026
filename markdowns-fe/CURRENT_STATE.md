# Current State — Frontend BKUI 2026

> Update file ini tiap kali status integrasi sebuah fitur berubah. Nilai status: `Belum Dikerjakan` / `Masih Dummy Data` / `Terhubung ke API`.

Terakhir diperbarui: 2026-08-27 14:15 WIB

## Status Integrasi per Fitur

Semua halaman sudah punya **rute + placeholder** (FE-0002), dan **Navbar sudah sesuai desain Figma** (FE-0004). Isi halamannya sendiri belum dislicing dan belum ada satupun yang terhubung ke API — jadi statusnya masih `Belum Dikerjakan`.

| Fitur/Halaman | Rute | Status | Endpoint BE terkait | Referensi |
|---|---|---|---|---|
| Landing Page | `/` | Belum Dikerjakan | — | [FE-0002](./features/FE-0002_Salman_Pilih-Tech-Stack-Frontend.md) |
| Explore UI | `/explore-ui` | Belum Dikerjakan | TBD (entity `Content`, endpoint belum ada) | [FE-0002](./features/FE-0002_Salman_Pilih-Tech-Stack-Frontend.md) |
| Merchandise Catalog | `/merchandise` | Belum Dikerjakan | — (redirect only ke Yesplis) | [FE-0002](./features/FE-0002_Salman_Pilih-Tech-Stack-Frontend.md) |
| Ticket | `/ticket` | Belum Dikerjakan | — (redirect only ke Yesplis) | [FE-0002](./features/FE-0002_Salman_Pilih-Tech-Stack-Frontend.md) |
| Profile | `/profile` | Belum Dikerjakan | TBD | [FE-0002](./features/FE-0002_Salman_Pilih-Tech-Stack-Frontend.md) |
| Student Dashboard | `/dashboard` | Belum Dikerjakan | TBD | [FE-0002](./features/FE-0002_Salman_Pilih-Tech-Stack-Frontend.md) |
| School Roadshow Registration | `/school-roadshow` | Belum Dikerjakan | TBD | [FE-0002](./features/FE-0002_Salman_Pilih-Tech-Stack-Frontend.md) |
| Daftar CASA | `/daftar-casa` | Belum Dikerjakan | TBD | [FE-0002](./features/FE-0002_Salman_Pilih-Tech-Stack-Frontend.md) |
| Daftar Mentoring | `/daftar-mentoring` | Belum Dikerjakan | TBD | [FE-0002](./features/FE-0002_Salman_Pilih-Tech-Stack-Frontend.md) |

> Tambah baris "Referensi" berupa link ke file `features/FE-000X_...md` yang relevan begitu ada progress.

## Tech Stack
- Framework: Next.js 16 (App Router)
- Bahasa: TypeScript
- Styling: Tailwind CSS 4
- React: 19
- Linting: ESLint (`next/core-web-vitals`)
- Auth: konsumsi Email/Password + Google SSO dari BE — **belum diimplementasi**, endpoint auth BE belum ada
- Dev server: **port 3001** (BE pakai 3000, dan 3001 sudah masuk whitelist CORS di BE)

Keputusan & alasan lengkap: [FE-0002](./features/FE-0002_Salman_Pilih-Tech-Stack-Frontend.md)

## Komponen

| Komponen | Status | Catatan |
|---|---|---|
| Navbar | **Sesuai Figma** (desktop) | Dua state General Public / Student. Versi mobile belum ada di Figma & belum diverifikasi visual. Lihat [FE-0004](./features/FE-0004_Salman_Navbar-Sesuai-Figma.md) |
| LogoBKUI | Sesuai Figma | Aset `logo/mainLogoBKUI2026.svg` — **371 KB, perlu ekspor ulang** (lihat FE-0004) |
| ButtonPesanTiket | Sesuai Figma | Mengarah ke `/ticket`. Tidak ada checkout di FE |
| ButtonMasukSiswa | Sesuai Figma, **disabled** | Endpoint auth BE belum ada |
| AvatarProfil | Sesuai Figma | Mengarah ke `/profile` |
| Footer | Belum ada | Aset sudah tersedia di `public/` (logo footer + ikon sosmed) |
| PagePlaceholder | Sementara | Dihapus per halaman saat slicing dimulai |

**Kondisi login belum bisa dideteksi.** `src/lib/auth-state.ts` masih placeholder yang selalu mengembalikan `General Public` — endpoint auth BE belum ada, dan shape response-nya tidak boleh dikarang duluan (README boundary nomor 4). Akibatnya menu Student (Dashboard, Daftar Mentoring, Profile) belum muncul di Navbar dan tombol "Masuk" masih `disabled`.

## Struktur Folder

```
src/
├── app/
│   ├── (public)/      → General Public, tanpa login
│   ├── (student)/     → Student, butuh login
│   ├── layout.tsx     → root layout, memasang Navbar
│   └── globals.css    → cuma @import tailwindcss, design token belum diisi
├── components/
│   ├── layout/Navbar.tsx  → navbar (struktur jadi, style belum dislicing)
│   └── PagePlaceholder.tsx → sementara, dihapus saat slicing
└── lib/
    ├── env.ts         → satu-satunya tempat baca env
    ├── api.ts         → helper apiFetch + tipe health-check
    ├── navigation.ts  → sumber tunggal daftar menu navigasi
    └── auth-state.ts  → PLACEHOLDER kondisi login, belum ada auth sungguhan

public/                → aset statis, diakses lewat URL. Lihat public/README.md
├── logo/              → logo BKUI, BEM UI, sponsor
├── image/             → foto & ilustrasi
└── icon/              → ikon SVG
```

Route group `(public)` / `(student)` **tidak muncul di URL** — murni pengelompokan file, dan mencerminkan 2 kondisi RBAC yang sudah ada. Bukan role baru.

## Env Var
Template di `.env.example`, copy ke `.env.local`. Semua ber-prefix `NEXT_PUBLIC_` (ikut ter-bundle ke browser — **jangan taruh secret**).

| Env | Fungsi | Status |
|---|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | Base URL API BE, termasuk `/api/v1` | terisi (`http://localhost:3000/api/v1`) |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Client ID Google SSO (bukan secret) | **kosong — belum ada** |
| `NEXT_PUBLIC_YESPLIS_TICKET_URL` | Tujuan CTA "Beli Tiket" | **kosong — TBD** |
| `NEXT_PUBLIC_YESPLIS_MERCH_URL` | Tujuan CTA "Beli Merch" | **kosong — TBD** |

## Cara Menjalankan (lokal)
```bash
npm install
cp .env.example .env.local
npm run dev        # http://localhost:3001
```

Cek lain: `npm run typecheck`, `npm run lint`, `npm run build`.
