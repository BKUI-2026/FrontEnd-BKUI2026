# Current State — Frontend BKUI 2026

> Update file ini tiap kali status integrasi sebuah fitur berubah. Nilai status: `Belum Dikerjakan` / `Masih Dummy Data` / `Terhubung ke API`.

Terakhir diperbarui: 2026-09-13 21:55 WIB

## Status Integrasi per Fitur

**Landing Page sudah dislicing penuh dari Figma** (FE-0005). Sepuluh FAQ resmi
sudah dimasukkan dari dokumen tim (FE-0015); konten section lainnya masih
sebagian dummy karena endpoint `Content` di BE belum ada.

**Explore UI juga sudah dislicing penuh dari Figma** (FE-0007), lengkap dengan
animasi Framer Motion. Deskripsi 14 fakultas dan 1 Program Pendidikan Vokasi
sudah memakai konten tim (FE-0015). Semua kartu kini menampilkan chip nama
program studi berdasarkan sumber resmi UI (FE-0017); foto masih dummy.

**Merchandise Catalog juga sudah dislicing penuh** (FE-0009) — katalog + CTA
redirect ke Yesplis, tanpa cart/checkout sama sekali.

**Ticket juga sudah dislicing penuh** (FE-0009 & FE-0010) — CTA sudah terhubung
ke event Yesplis resmi (FE-0015), tanpa payment gateway. Isi tier masih dummy.

**Halaman Daftar Akun & Masuk sudah dislicing** (FE-0011, FE-0012) dan saling
terhubung, tapi belum bisa dipakai — endpoint auth BE belum ada.

**School Roadshow Registration sudah dislicing** (FE-0013, FE-0014) dengan form
publik, validasi client, dan halaman success. Submit belum terhubung karena
kontrak endpoint BE belum ada; halaman success belum dipanggil otomatis.

**Profile dan Student Dashboard sudah dislicing dari tiga state Figma**
(FE-0018): profil, edit profil, dan Acara Saya. Data akun, simpan profil,
logout, serta detail/tautan mentoring belum terhubung ke API.

Dua halaman lain masih **rute + placeholder** (FE-0002). Navbar & Footer sudah sesuai desain Figma (FE-0004).

| Fitur/Halaman | Rute | Status | Endpoint BE terkait | Referensi |
|---|---|---|---|---|
| Landing Page | `/` | **Masih Dummy Data** (FAQ resmi sudah masuk) | TBD (entity `Content` — video, tokoh, testimoni, sponsor) | [FE-0005](./features/FE-0005_Salman_Slicing-Landing-Page.md), [FE-0015](./features/FE-0015_Codex_Konten-Fakultas-FAQ-dan-Link-Tiket.md) |
| Daftar Akun | `/daftar` | **Belum Dikerjakan** (UI selesai, tombol mati) | TBD — endpoint auth BE belum ada | [FE-0011](./features/FE-0011_Salman_Slicing-Daftar-Akun.md) |
| Masuk | `/masuk` | **Belum Dikerjakan** (UI selesai, hanya validasi format) | TBD — endpoint auth BE belum ada | [FE-0012](./features/FE-0012_Salman_Slicing-Masuk.md) |
| Explore UI | `/explore-ui` | **Masih Dummy Data** (deskripsi & prodi resmi; foto dummy) | TBD (entity `Content` — foto) | [FE-0007](./features/FE-0007_Salman_Slicing-Explore-UI.md), [FE-0015](./features/FE-0015_Codex_Konten-Fakultas-FAQ-dan-Link-Tiket.md), [FE-0016](./features/FE-0016_Codex_Hapus-Placeholder-Explore.md), [FE-0017](./features/FE-0017_Codex_Prodi-Semua-Fakultas.md) |
| Merchandise Catalog | `/merchandise` | **Masih Dummy Data** | TBD (entity `Content` — produk, harga, stok, foto) + redirect only ke Yesplis | [FE-0009](./features/FE-0009_Salman_Slicing-Merchandise-Catalog.md) |
| Ticket | `/ticket` | **Masih Dummy Data** (CTA Yesplis aktif) | TBD (entity `Content` — tier, harga, stok) + redirect only ke Yesplis | [FE-0010](./features/FE-0010_Salman_Slicing-Ticket.md), [FE-0015](./features/FE-0015_Codex_Konten-Fakultas-FAQ-dan-Link-Tiket.md) |
| Profile | `/profile` | **Masih Dummy Data** (UI view/edit selesai; data & simpan belum terhubung) | TBD — endpoint auth/profil BE belum ada | [FE-0018](./features/FE-0018_Codex_Slicing-Profile-dan-Dashboard.md) |
| Student Dashboard | `/dashboard` | **Masih Dummy Data** (UI Acara Saya selesai; detail & link mentoring dummy) | TBD — endpoint dashboard/content BE belum ada | [FE-0018](./features/FE-0018_Codex_Slicing-Profile-dan-Dashboard.md) |
| School Roadshow Registration | `/school-roadshow`, `/school-roadshow/success` | **Masih Dummy Data** (UI form + success selesai) | TBD — endpoint registrasi & email belum ada | [FE-0013](./features/FE-0013_Codex_Slicing-School-Roadshow.md), [FE-0014](./features/FE-0014_Codex_Success-School-Roadshow.md) |
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
| School Roadshow | Sesuai Figma | Form publik dan success state; integrasi API masih menunggu kontrak BE. Lihat [FE-0013](./features/FE-0013_Codex_Slicing-School-Roadshow.md) dan [FE-0014](./features/FE-0014_Codex_Success-School-Roadshow.md) |
| Profile & Dashboard | Sesuai Figma | Tiga state: profil, edit profil, dan Acara Saya. Aset dashboard lokal di `public/image/dashboard/` dan `public/icon/dashboard/`. Lihat [FE-0018](./features/FE-0018_Codex_Slicing-Profile-dan-Dashboard.md) |
| PagePlaceholder | Sementara | Masih dipakai 2 halaman: Daftar CASA dan Daftar Mentoring. Dihapus per halaman saat slicing dimulai |

**Kondisi login belum bisa dideteksi.** `src/lib/auth-state.ts` masih placeholder yang selalu mengembalikan `General Public` — endpoint auth BE belum ada, dan shape response-nya tidak boleh dikarang duluan (README boundary nomor 4). Pada rute khusus Student, Navbar menampilkan state Student berdasarkan pathname agar slicing bisa diperiksa; ini bukan guard atau session autentikasi.

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
│   ├── roadshow/      → form dan dekorasi School Roadshow
│   ├── dashboard/     → Profile view/edit, Acara Saya, sidebar, dan latar
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
├── image/roadshow/    → tekstur dan layer dekorasi School Roadshow
├── image/dashboard/   → tekstur dan layer bentang alam Dashboard
├── icon/auth/         → ikon mata tampil/sembunyi kata sandi
├── icon/roadshow/     → ikon field School Roadshow
├── icon/dashboard/    → avatar placeholder, kalender, dan external link
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
| `NEXT_PUBLIC_YESPLIS_TICKET_URL` | Tujuan CTA "Beli di Yesplis" di halaman Ticket | **terisi — event BKUI 2026** |
| `NEXT_PUBLIC_YESPLIS_MERCH_URL` | Tujuan CTA "Beli di Yesplis" di katalog Merch | **kosong — tombolnya dimatikan sampai diisi** |

## Cara Menjalankan (lokal)
```bash
npm install
cp .env.example .env.local
npm run dev        # http://localhost:3001
```

Cek lain: `npm run typecheck`, `npm run lint`, `npm run build`.

## Perlu Keputusan PM

- **Tombol "Masuk sebagai Siswa" di Navbar mau diarahkan ke `/masuk`?** Halaman
  Daftar dan Masuk sudah jadi dan saling terhubung, tapi keduanya belum bisa
  dicapai dari navigasi mana pun. Menautkan tombol navbar ke `/masuk` sudah
  masuk akal sekarang, tapi itu mengubah perilaku Navbar yang sudah disetujui —
  saya tunggu keputusan. Lihat
  [FE-0011](./features/FE-0011_Salman_Slicing-Daftar-Akun.md) dan
  [FE-0012](./features/FE-0012_Salman_Slicing-Masuk.md).

- **Lisensi font Talina DEMO.** Font judul dari Figma berlisensi *personal use
  only*; pemakaian komersial (tiket & sponsor) perlu beli lisensi dulu sebelum
  live. Detail & link pembelian ada di
  [FE-0005](./features/FE-0005_Salman_Slicing-Landing-Page.md).
- **Konten Explore UI.** Daftar program studi sudah terisi dari sumber resmi UI;
  foto fakultas masih placeholder.
- **Integrasi Profile & Dashboard.** UI sudah selesai, tetapi data profil,
  penyimpanan, logout, daftar acara, pengumuman, dan tautan Zoom masih menunggu
  kontrak API. Informasi mentoring wajib tetap dinamis dari Admin.
- **Konten Landing Page.** Deskripsi BKUI, daftar tokoh, testimoni, daftar
  sponsor, dan URL video masih placeholder — menunggu konten resmi. FAQ sudah
  memakai dokumen tim.

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
  Daftar Akun, Masuk) dan browser selain Chrome.

_Terakhir diubah: 2026-09-13 (FE-0018)_
