# Current State — Frontend BKUI 2026

> Update file ini tiap kali status integrasi sebuah fitur berubah. Nilai status: `Belum Dikerjakan` / `Masih Dummy Data` / `Terhubung ke API`.

Terakhir diperbarui: 2026-08-29 10:05 WIB

## Status Integrasi per Fitur

**Landing Page sudah dislicing penuh dari Figma** (FE-0005) — halaman pertama yang isinya jadi. Isinya masih dummy karena endpoint `Content` di BE belum ada.

Delapan halaman lain masih **rute + placeholder** (FE-0002). Navbar & Footer sudah sesuai desain Figma (FE-0004).

| Fitur/Halaman | Rute | Status | Endpoint BE terkait | Referensi |
|---|---|---|---|---|
| Landing Page | `/` | **Masih Dummy Data** | TBD (entity `Content` — video, tokoh, testimoni, FAQ, sponsor) | [FE-0005](./features/FE-0005_Salman_Slicing-Landing-Page.md) |
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
- Font: Talina DEMO (display), Delight (UI), Inter (body) — via `next/font`, lihat `src/lib/fonts.ts`
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
| Footer | Sesuai Figma | Kontak + sosmed + lockup logo |
| JudulSticker | Sesuai Figma | Judul display berlapis (isi hijau + outline krem + pink). Teks sungguhan, bukan gambar. Lihat [FE-0005](./features/FE-0005_Salman_Slicing-Landing-Page.md) |
| ButtonPil | Sesuai Figma | Tombol pil `Button/Large`. Beda dari ButtonPesanTiket |
| Section Landing Page | Sesuai Figma | 9 komponen di `components/landing/` — lihat [FE-0005](./features/FE-0005_Salman_Slicing-Landing-Page.md) |
| Latar langit section | Sesuai Figma | `langit.webp`, warnanya dicocokkan terukur ke render Figma. Cara lama (awan + opacity) sudah tidak dipakai — lihat [FE-0006](./features/FE-0006_Salman_Perbaikan-Latar-Langit-Dan-Dekorasi.md) |
| PagePlaceholder | Sementara | Masih dipakai 8 halaman selain Landing Page. Dihapus per halaman saat slicing dimulai |

**Kondisi login belum bisa dideteksi.** `src/lib/auth-state.ts` masih placeholder yang selalu mengembalikan `General Public` — endpoint auth BE belum ada, dan shape response-nya tidak boleh dikarang duluan (README boundary nomor 4). Akibatnya menu Student (Dashboard, Daftar Mentoring, Profile) belum muncul di Navbar dan tombol "Masuk" masih `disabled`.

## Struktur Folder

```
src/
├── app/
│   ├── (public)/      → General Public, tanpa login
│   ├── (student)/     → Student, butuh login
│   ├── layout.tsx     → root layout, memasang Navbar
│   └── globals.css    → design token (warna + font) & judul stiker
├── components/
│   ├── layout/        → Navbar, Footer (tampil di semua halaman)
│   ├── landing/       → section Landing Page, satu file per section
│   ├── ui/            → komponen kecil dipakai lintas halaman
│   └── PagePlaceholder.tsx → sementara, dihapus saat slicing
└── lib/
    ├── env.ts         → satu-satunya tempat baca env
    ├── api.ts         → helper apiFetch + tipe health-check
    ├── fonts.ts       → pemuatan 3 font Figma lewat next/font
    ├── navigation.ts  → sumber tunggal daftar menu navigasi
    ├── landing-content.ts → SEMUA konten Landing Page, masih dummy
    └── auth-state.ts  → PLACEHOLDER kondisi login, belum ada auth sungguhan

public/                → aset statis, diakses lewat URL. Lihat public/README.md
├── logo/              → logo BKUI, BEM UI, sponsor
├── image/landing/     → ilustrasi Landing Page (hasil ekspor Figma, WebP)
├── icon/landing/      → aset vektor Landing Page (SVG)
└── fonts/             → Talina DEMO & Delight (lihat catatan lisensi di FE-0005)
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

## Perlu Keputusan PM

- **Lisensi font Talina DEMO.** Font judul dari Figma berlisensi *personal use
  only*; pemakaian komersial (tiket & sponsor) perlu beli lisensi dulu sebelum
  live. Detail & link pembelian ada di
  [FE-0005](./features/FE-0005_Salman_Slicing-Landing-Page.md).
- **Konten Landing Page.** Deskripsi BKUI, daftar tokoh, testimoni, isi FAQ,
  daftar sponsor, dan URL video masih placeholder — menunggu konten resmi.

## Pekerjaan Visual yang Belum Selesai

- **Dekorasi ilustrasi beberapa section belum lengkap.** Yang sudah ada: bendera
  segitiga, rangka kayu di "Apa itu BKUI", pohon cemara di Testimoni, pohon di
  After Movie, bunga di Timeline. Di Figma masih ada semak, bukit, jamur, dan
  bunga kecil yang belum dibawa. Cara ekstraksinya ada di
  [FE-0006](./features/FE-0006_Salman_Perbaikan-Latar-Langit-Dan-Dekorasi.md).
- **Belum dicek:** lebar tablet 768–1024px dan browser selain Chrome.

_Terakhir diubah: 2026-08-29 (FE-0006)_
