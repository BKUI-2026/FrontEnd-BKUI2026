# Current State — Frontend BKUI 2026

> Update file ini tiap kali status integrasi sebuah fitur berubah. Nilai status: `Belum Dikerjakan` / `Masih Dummy Data` / `Terhubung ke API`.

Terakhir diperbarui: 2026-08-26 21:40 WIB

## Status Integrasi per Fitur

Semua halaman sudah punya **rute + placeholder** (FE-0002), tapi belum ada satupun yang terhubung ke API — jadi statusnya masih `Belum Dikerjakan`.

| Fitur/Halaman | Rute | Status | Endpoint BE terkait | Referensi |
|---|---|---|---|---|
| Landing Page | `/` | Belum Dikerjakan | — | [FE-0002](./features/FE-0002_Slides(Skeleton-Semua-Halaman)_Claude_Pilih-Tech-Stack-Frontend.md) |
| Explore UI | `/explore-ui` | Belum Dikerjakan | TBD (entity `Content`, endpoint belum ada) | [FE-0002](./features/FE-0002_Slides(Skeleton-Semua-Halaman)_Claude_Pilih-Tech-Stack-Frontend.md) |
| Merchandise Catalog | `/merchandise` | Belum Dikerjakan | — (redirect only ke Yesplis) | [FE-0002](./features/FE-0002_Slides(Skeleton-Semua-Halaman)_Claude_Pilih-Tech-Stack-Frontend.md) |
| Ticket | `/ticket` | Belum Dikerjakan | — (redirect only ke Yesplis) | [FE-0002](./features/FE-0002_Slides(Skeleton-Semua-Halaman)_Claude_Pilih-Tech-Stack-Frontend.md) |
| Profile | `/profile` | Belum Dikerjakan | TBD | [FE-0002](./features/FE-0002_Slides(Skeleton-Semua-Halaman)_Claude_Pilih-Tech-Stack-Frontend.md) |
| Student Dashboard | `/dashboard` | Belum Dikerjakan | TBD | [FE-0002](./features/FE-0002_Slides(Skeleton-Semua-Halaman)_Claude_Pilih-Tech-Stack-Frontend.md) |
| School Roadshow Registration | `/school-roadshow` | Belum Dikerjakan | TBD | [FE-0002](./features/FE-0002_Slides(Skeleton-Semua-Halaman)_Claude_Pilih-Tech-Stack-Frontend.md) |
| Daftar CASA | `/daftar-casa` | Belum Dikerjakan | TBD | [FE-0002](./features/FE-0002_Slides(Skeleton-Semua-Halaman)_Claude_Pilih-Tech-Stack-Frontend.md) |
| Daftar Mentoring | `/daftar-mentoring` | Belum Dikerjakan | TBD | [FE-0002](./features/FE-0002_Slides(Skeleton-Semua-Halaman)_Claude_Pilih-Tech-Stack-Frontend.md) |

> Tambah baris "Referensi" berupa link ke file `features/FE-000X_...md` yang relevan begitu ada progress.

## Tech Stack
- Framework: Next.js 16 (App Router)
- Bahasa: TypeScript
- Styling: Tailwind CSS 4
- React: 19
- Linting: ESLint (`next/core-web-vitals`)
- Auth: konsumsi Email/Password + Google SSO dari BE — **belum diimplementasi**, endpoint auth BE belum ada
- Dev server: **port 3001** (BE pakai 3000, dan 3001 sudah masuk whitelist CORS di BE)

Keputusan & alasan lengkap: [FE-0002](./features/FE-0002_Slides(Skeleton-Semua-Halaman)_Claude_Pilih-Tech-Stack-Frontend.md)

## Struktur Folder

```
src/
├── app/
│   ├── (public)/      → General Public, tanpa login
│   ├── (student)/     → Student, butuh login
│   ├── layout.tsx     → root layout (belum ada Navbar/Footer)
│   └── globals.css    → cuma @import tailwindcss, design token belum diisi
├── components/        → PagePlaceholder (sementara, dihapus saat slicing)
└── lib/
    ├── env.ts         → satu-satunya tempat baca env
    └── api.ts         → helper apiFetch + tipe health-check
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
