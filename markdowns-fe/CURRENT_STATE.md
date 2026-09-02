# Current State — Frontend BKUI 2026

> Update file ini tiap kali status integrasi sebuah fitur berubah. Nilai status: `Belum Dikerjakan` / `Masih Dummy Data` / `Terhubung ke API`.

Terakhir diperbarui: 2026-09-02 15:05 WIB

## Status Integrasi per Fitur

**Landing Page sudah dislicing penuh dari Figma** (FE-0005) — halaman pertama yang isinya jadi. Isinya masih dummy karena endpoint `Content` di BE belum ada.

**Explore UI juga sudah dislicing penuh dari Figma** (FE-0007), lengkap dengan
animasi Framer Motion. Isinya masih dummy karena alasan yang sama.

**Merchandise Catalog juga sudah dislicing penuh** (FE-0009) — katalog + CTA
redirect ke Yesplis, tanpa cart/checkout sama sekali.

**Ticket juga sudah dislicing penuh** (FE-0009 & FE-0010) — info tier + CTA
redirect ke Yesplis, tanpa payment gateway.

**Halaman Daftar Akun sudah dislicing** (FE-0011) tapi tombolnya mati —
endpoint auth BE belum ada.

Lima halaman lain masih **rute + placeholder** (FE-0002). Navbar & Footer sudah sesuai desain Figma (FE-0004).

| Fitur/Halaman | Rute | Status | Endpoint BE terkait | Referensi |
|---|---|---|---|---|
| Landing Page | `/` | **Masih Dummy Data** | TBD (entity `Content` — video, tokoh, testimoni, FAQ, sponsor) | [FE-0005](./features/FE-0005_Salman_Slicing-Landing-Page.md) |
| Daftar Akun | `/daftar` | **Belum Dikerjakan** (UI selesai, tombol mati) | TBD — endpoint auth BE belum ada | [FE-0011](./features/FE-0011_Salman_Slicing-Daftar-Akun.md) |
| Explore UI | `/explore-ui` | **Masih Dummy Data** | TBD (entity `Content` — deskripsi fakultas, prodi, foto) | [FE-0007](./features/FE-0007_Salman_Slicing-Explore-UI.md) |
| Merchandise Catalog | `/merchandise` | **Masih Dummy Data** | TBD (entity `Content` — produk, harga, stok, foto) + redirect only ke Yesplis | [FE-0009](./features/FE-0009_Salman_Slicing-Merchandise-Catalog.md) |
| Ticket | `/ticket` | **Masih Dummy Data** | TBD (entity `Content` — tier, harga, stok) + redirect only ke Yesplis | [FE-0010](./features/FE-0010_Salman_Slicing-Ticket.md) |
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
- Animasi: Framer Motion (`framer-motion`) — dipakai di Explore UI, lihat [FE-0007](./features/FE-0007_Salman_Slicing-Explore-UI.md)
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
| Hero Landing Page | Sesuai Figma | Ilustrasi SVG per-layer, bukan lagi WebP 1x yang berbayang di layar retina — lihat [FE-0008](./features/FE-0008_Salman_Hero-Landing-Jadi-SVG.md) |
| Latar langit halaman Explore UI | Sesuai Figma | 3 lapis (dasar + 2 tekstur `soft-light`), warna dasar dikalibrasi ke render Figma — lihat [FE-0007](./features/FE-0007_Salman_Slicing-Explore-UI.md) |
| Latar langit section | Sesuai Figma | `langit.webp`, warnanya dicocokkan terukur ke render Figma. Cara lama (awan + opacity) sudah tidak dipakai — lihat [FE-0006](./features/FE-0006_Salman_Perbaikan-Latar-Langit-Dan-Dekorasi.md) |
| Kartu & overlay katalog | Sesuai Figma | `components/katalog/` — dipakai bersama Merchandise & Ticket, lihat [FE-0010](./features/FE-0010_Salman_Slicing-Ticket.md) |
| Section Ticket | Sesuai Figma | Latar rumput + hiasan berputar, lihat [FE-0010](./features/FE-0010_Salman_Slicing-Ticket.md) |
| Section Merchandise | Sesuai Figma | 5 komponen di `components/merch/`, termasuk overlay detail berbasis `<dialog>` — lihat [FE-0009](./features/FE-0009_Salman_Slicing-Merchandise-Catalog.md) |
| Section Explore UI | Sesuai Figma | 8 komponen di `components/explore/` — lihat [FE-0007](./features/FE-0007_Salman_Slicing-Explore-UI.md) |
| PagePlaceholder | Sementara | Masih dipakai 7 halaman selain Landing Page & Explore UI. Dihapus per halaman saat slicing dimulai |

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
│   ├── explore/       → section Explore UI, satu file per elemen visual
│   ├── merch/         → katalog Merchandise
│   ├── tiket/         → halaman Ticket
│   ├── katalog/       → kartu & overlay detail, dipakai Merch + Ticket
│   ├── auth/          → formulir Daftar Akun
│   ├── ui/            → komponen kecil dipakai lintas halaman
│   └── PagePlaceholder.tsx → sementara, dihapus saat slicing
└── lib/
    ├── env.ts         → satu-satunya tempat baca env
    ├── api.ts         → helper apiFetch + tipe health-check
    ├── fonts.ts       → pemuatan 3 font Figma lewat next/font
    ├── navigation.ts  → sumber tunggal daftar menu navigasi
    ├── landing-content.ts → SEMUA konten Landing Page, masih dummy
    ├── explore-content.ts → SEMUA konten Explore UI, masih dummy
    ├── merch-content.ts   → SEMUA konten katalog Merch, masih dummy
    ├── ticket-content.ts  → tier tiket, masih dummy
    ├── katalog.ts         → tipe & format harga bersama Merch + Ticket
    └── auth-state.ts  → PLACEHOLDER kondisi login, belum ada auth sungguhan

public/                → aset statis, diakses lewat URL. Lihat public/README.md
├── logo/              → logo BKUI, BEM UI, sponsor
├── image/landing/     → ilustrasi Landing Page (hasil ekspor Figma, WebP)
├── image/landing/hero/ → 4 tekstur ilustrasi Hero (dipakai dari dalam SVG)
├── image/explore/     → ilustrasi Explore UI, per layer (WebP)
├── image/merch/       → 6 tekstur dekorasi Merch (dipakai dari dalam SVG)
├── image/tiket/       → tekstur dekorasi & butiran latar Ticket
├── image/auth/        → maskot ilustrasi halaman Daftar
├── icon/auth/         → ikon mata tampil/sembunyi kata sandi
├── icon/landing/      → aset vektor Landing Page (SVG)
├── icon/explore/      → aset vektor Explore UI (SVG)
└── fonts/             → Talina DEMO & Delight (lihat catatan lisensi di FE-0005)
```

Route group `(public)` / `(student)` **tidak muncul di URL** — murni pengelompokan file, dan mencerminkan 2 kondisi RBAC yang sudah ada. Bukan role baru.

## Env Var
Template di `.env.example`, copy ke `.env.local`. Semua ber-prefix `NEXT_PUBLIC_` (ikut ter-bundle ke browser — **jangan taruh secret**).

| Env | Fungsi | Status |
|---|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | Base URL API BE, termasuk `/api/v1` | terisi (`http://localhost:3000/api/v1`) |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Client ID Google SSO (bukan secret) | **kosong — belum ada** |
| `NEXT_PUBLIC_YESPLIS_TICKET_URL` | Tujuan CTA "Beli di Yesplis" di halaman Ticket | **kosong — tombolnya dimatikan sampai diisi** |
| `NEXT_PUBLIC_YESPLIS_MERCH_URL` | Tujuan CTA "Beli di Yesplis" di katalog Merch | **kosong — tombolnya dimatikan sampai diisi** |

## Cara Menjalankan (lokal)
```bash
npm install
cp .env.example .env.local
npm run dev        # http://localhost:3001
```

Cek lain: `npm run typecheck`, `npm run lint`, `npm run build`.

## Perlu Keputusan PM

- **Dari mana pengguna masuk ke `/daftar`?** Halaman Daftar Akun sudah jadi tapi
  belum bisa dicapai dari navigasi mana pun — navbar di Figma cuma punya "Masuk
  sebagai Siswa" (halaman masuk, bukan daftar), dan tombol itu sendiri masih
  mati. Lihat [FE-0011](./features/FE-0011_Salman_Slicing-Daftar-Akun.md).

- **Lisensi font Talina DEMO.** Font judul dari Figma berlisensi *personal use
  only*; pemakaian komersial (tiket & sponsor) perlu beli lisensi dulu sebelum
  live. Detail & link pembelian ada di
  [FE-0005](./features/FE-0005_Salman_Slicing-Landing-Page.md).
- **Konten Explore UI.** Deskripsi tiap fakultas, daftar program studi selain
  Fasilkom, dan foto fakultas masih placeholder. Daftar prodi sengaja tidak
  saya isi sendiri — salah menulis program studi di situs resmi universitas
  lebih merugikan daripada placeholder yang jelas terbaca sebagai placeholder.
- **Konten Landing Page.** Deskripsi BKUI, daftar tokoh, testimoni, isi FAQ,
  daftar sponsor, dan URL video masih placeholder — menunggu konten resmi.

## Pekerjaan Visual yang Belum Selesai

- **Dekorasi ilustrasi beberapa section belum lengkap.** Yang sudah ada: bendera
  segitiga, rangka kayu di "Apa itu BKUI", pohon cemara di Testimoni, pohon di
  After Movie, bunga di Timeline. Di Figma masih ada semak, bukit, jamur, dan
  bunga kecil yang belum dibawa. Cara ekstraksinya ada di
  [FE-0006](./features/FE-0006_Salman_Perbaikan-Latar-Langit-Dan-Dekorasi.md).
- **Explore UI sudah dicek visual di desktop** dan cocok dengan Figma. Yang
  belum dipasang: dua elipsis kecil dekat tenda dan semak sakura depan —
  alasannya di [FE-0007](./features/FE-0007_Salman_Slicing-Explore-UI.md).
- **Section Landing Page lain masih raster.** Dekorasi "Apa itu BKUI" dan FAQ
  masih `dekor-*.webp`; masalah ketajaman yang sama dengan Hero berlaku di sana.
  Lihat [FE-0008](./features/FE-0008_Salman_Hero-Landing-Jadi-SVG.md) untuk cara
  memindahkannya ke SVG.
- **Belum dicek:** lebar HP & tablet (Landing Page, Explore UI, Merch, Ticket,
  Daftar Akun) dan browser selain Chrome.

_Terakhir diubah: 2026-09-02 (FE-0011)_
