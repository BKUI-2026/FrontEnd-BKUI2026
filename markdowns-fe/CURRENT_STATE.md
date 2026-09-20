# Current State — Frontend BKUI 2026

> Update file ini tiap kali status integrasi sebuah fitur berubah. Nilai status: `Belum Dikerjakan` / `Masih Dummy Data` / `Terhubung ke API`.

Terakhir diperbarui: 2026-09-20 15:40 WIB

## Status Integrasi per Fitur

**Landing Page sudah dislicing penuh dari Figma** (FE-0005). Sepuluh FAQ resmi
sudah dimasukkan dari dokumen tim (FE-0015). Seluruh Lorem ipsum dan label
generik sudah diganti copy yang layak tampil (FE-0020); nama pembicara dan
testimoni asli tetap menunggu konten resmi. Placeholder video kini menampilkan
“Coming Soon” dengan font judul BKUI (FE-0021).

**Explore UI juga sudah dislicing penuh dari Figma** (FE-0007), lengkap dengan
animasi Framer Motion. Deskripsi 14 fakultas dan Sekolah Vokasi
sudah memakai konten tim (FE-0015). Semua kartu kini menampilkan chip nama
program studi berdasarkan sumber resmi UI (FE-0017); foto masih dummy. Hero
sudah mengikuti desain terbaru node `551:4325` tanpa mengubah isi (FE-0022).

**Merchandise Catalog juga sudah dislicing penuh** (FE-0009) — katalog + CTA
redirect ke Yesplis, tanpa cart/checkout sama sekali. Nama sementara dan pesan
status sudah profesional; harga/stok palsu dihapus (FE-0020).

**Ticket juga sudah dislicing penuh** (FE-0009 & FE-0010) — CTA sudah terhubung
ke event Yesplis resmi (FE-0015), tanpa payment gateway. Nama tier mengikuti
Figma; harga, stok, dan benefit menunggu informasi resmi (FE-0020).

**Halaman Daftar Akun & Masuk sudah terhubung ke API** (FE-0026). Sesi
sungguhan sudah jalan: access token disimpan di memori, refresh token di cookie
httpOnly milik BE, dan sesi dipulihkan otomatis tiap halaman dimuat.

**School Roadshow Registration sudah terhubung ke API** (FE-0026). Submit
mengirim ke BE dan halaman success kini dipanggil otomatis setelah datanya
tersimpan.

**Profile dan Student Dashboard sudah terhubung ke API** (FE-0026): data akun,
simpan profil, dan logout berjalan sungguhan, dan "Acara Saya" membaca status
pendaftaran mentoring dari BE. Jadwal sesi serta tautan Zoom masih menunggu —
isi seperti itu dikelola Admin lewat entity Content, dan slug-nya belum
disepakati.

> **Belum ada jalan bagi pengguna untuk menjadi Student.** Role itu hanya bisa
> didapat dari jawaban "Are you a high school student?", dan pertanyaan tersebut
> tidak ada di layar mana pun — tidak di form Daftar, tidak di Profil. Jalur
> teknisnya sudah siap dan teruji; yang kurang satu keputusan PM: di layar mana
> pertanyaan itu diajukan. Selama itu belum diputuskan, fitur Mentoring tidak
> bisa dijangkau siapa pun. Detailnya di [FE-0026](./features/FE-0026_Claude_Integrasi-API-Backend.md).

Dua halaman lain masih **rute + placeholder** (FE-0002). Navbar & Footer sudah sesuai desain Figma (FE-0004).

**QA mobile responsive sudah dilakukan pada seluruh rute frontend** di lebar
320px, 390px, dan 768px (FE-0023). Semua rute bebas horizontal overflow;
target sentuh utama pada carousel, filter, autentikasi, dan Footer juga sudah
disesuaikan untuk penggunaan di layar sentuh.

| Fitur/Halaman | Rute | Status | Endpoint BE terkait | Referensi |
|---|---|---|---|---|
| Landing Page | `/` | **Sebagian konten resmi** (FAQ dan Previous Speakers sudah dari dokumen tim) | TBD (entity `Content` — video, testimoni, sponsor) | [FE-0005](./features/FE-0005_Salman_Slicing-Landing-Page.md), [FE-0015](./features/FE-0015_Codex_Konten-Fakultas-FAQ-dan-Link-Tiket.md), [FE-0020](./features/FE-0020_Codex_Bersihkan-Copy-Placeholder.md), [FE-0021](./features/FE-0021_Codex_Placeholder-Video-Coming-Soon.md), [FE-0024](./features/FE-0024_Codex_Revisi-Landing-Terbaru.md) |
| Daftar Akun | `/daftar` | **Terhubung ke API** | `POST /auth/register` | [FE-0011](./features/FE-0011_Salman_Slicing-Daftar-Akun.md), [FE-0026](./features/FE-0026_Claude_Integrasi-API-Backend.md) |
| Masuk | `/masuk` | **Terhubung ke API** | `POST /auth/login` | [FE-0012](./features/FE-0012_Salman_Slicing-Masuk.md), [FE-0026](./features/FE-0026_Claude_Integrasi-API-Backend.md) |
| Explore UI | `/explore-ui` | **Masih Dummy Data** (deskripsi & prodi resmi; foto dummy) | TBD (entity `Content` — foto) | [FE-0007](./features/FE-0007_Salman_Slicing-Explore-UI.md), [FE-0015](./features/FE-0015_Codex_Konten-Fakultas-FAQ-dan-Link-Tiket.md), [FE-0016](./features/FE-0016_Codex_Hapus-Placeholder-Explore.md), [FE-0017](./features/FE-0017_Codex_Prodi-Semua-Fakultas.md), [FE-0022](./features/FE-0022_Codex_Revisi-Visual-Explore.md) |
| Merchandise Catalog | `/merchandise` | **Masih Dummy Data** (copy layak tampil; harga/stok/foto menunggu) | TBD (entity `Content` — produk, harga, stok, foto) + redirect only ke Yesplis | [FE-0009](./features/FE-0009_Salman_Slicing-Merchandise-Catalog.md), [FE-0020](./features/FE-0020_Codex_Bersihkan-Copy-Placeholder.md) |
| Ticket | `/ticket` | **Masih Dummy Data** (CTA Yesplis aktif; harga/stok/benefit menunggu) | TBD (entity `Content` — tier, harga, stok) + redirect only ke Yesplis | [FE-0010](./features/FE-0010_Salman_Slicing-Ticket.md), [FE-0015](./features/FE-0015_Codex_Konten-Fakultas-FAQ-dan-Link-Tiket.md), [FE-0020](./features/FE-0020_Codex_Bersihkan-Copy-Placeholder.md) |
| Profile | `/profile` | **Terhubung ke API** | `GET` & `PATCH /users/me` | [FE-0018](./features/FE-0018_Codex_Slicing-Profile-dan-Dashboard.md) |
| Student Dashboard | `/dashboard` | **Terhubung ke API** (status mentoring nyata; jadwal & link sesi menunggu Content dari Admin) | `GET /mentoring-registrations/me` | [FE-0018](./features/FE-0018_Codex_Slicing-Profile-dan-Dashboard.md) |
| School Roadshow Registration | `/school-roadshow`, `/school-roadshow/success` | **Terhubung ke API** | `POST /school-roadshow-registrations` | [FE-0013](./features/FE-0013_Codex_Slicing-School-Roadshow.md), [FE-0014](./features/FE-0014_Codex_Success-School-Roadshow.md) |
| Daftar CASA | `/daftar-casa` | **Belum Dikerjakan** (endpoint BE siap, desain Figma belum ada) | `POST /casa-registrations` | [FE-0002](./features/FE-0002_Salman_Pilih-Tech-Stack-Frontend.md) |
| Daftar Mentoring | `/daftar-mentoring` | **Belum Dikerjakan** (endpoint BE siap, desain Figma belum ada) | `POST /mentoring-registrations` | [FE-0002](./features/FE-0002_Salman_Pilih-Tech-Stack-Frontend.md) |

> Tambah baris "Referensi" berupa link ke file `features/FE-000X_...md` yang relevan begitu ada progress.

## Tech Stack
- Framework: Next.js 16 (App Router)
- Bahasa: TypeScript
- Styling: Tailwind CSS 4
- React: 19
- Animasi: Framer Motion (`framer-motion`) — dipakai di Explore UI, lihat [FE-0007](./features/FE-0007_Salman_Slicing-Explore-UI.md)
- Linting: ESLint (`next/core-web-vitals`)
- Font: Talina DEMO (display), Delight (UI), Inter (body) — via `next/font`, lihat `src/lib/fonts.ts`
- Auth: Email/Password dari BE — **sudah terhubung** (FE-0026). Access token di memori, refresh token di cookie httpOnly. Google SSO: halaman callback `/auth/callback` sudah ada, tombol pemicunya belum
- Dev server: **port 3001** (BE pakai 3000, dan 3001 sudah masuk whitelist CORS di BE)

Keputusan & alasan lengkap: [FE-0002](./features/FE-0002_Salman_Pilih-Tech-Stack-Frontend.md)

## Komponen

| Komponen | Status | Catatan |
|---|---|---|
| Navbar | **Sesuai Figma** (desktop), **responsif terverifikasi** (mobile) | Dua state General Public / Student. Menu mobile sudah diuji pada 320px, 390px, dan 768px. Lihat [FE-0004](./features/FE-0004_Salman_Navbar-Sesuai-Figma.md), [FE-0023](./features/FE-0023_Codex_QA-Mobile-Responsive.md) |
| LogoBKUI | Sesuai Figma | Aset `logo/mainLogoBKUI2026.svg` — **371 KB, perlu ekspor ulang** (lihat FE-0004) |
| ButtonPesanTiket | Sesuai Figma | Mengarah ke `/ticket`. Tidak ada checkout di FE |
| ButtonMasukSiswa | Sesuai Figma, **disabled** | Endpoint auth BE belum ada |
| AvatarProfil | Sesuai Figma | Mengarah ke `/profile` |
| Footer | Sesuai Figma | Kontak + sosmed + lockup logo |
| Favicon | Logo BKUI | Ikon bawaan Next.js diganti logo BKUI 512px. Lihat [FE-0019](./features/FE-0019_Codex_Favicon-Logo-BKUI.md) |
| JudulSticker | Sesuai Figma | Judul display berlapis (isi hijau + outline krem + pink). Teks sungguhan, bukan gambar. Lihat [FE-0005](./features/FE-0005_Salman_Slicing-Landing-Page.md) |
| ButtonPil | Sesuai Figma | Tombol pil `Button/Large`. Beda dari ButtonPesanTiket |
| Section Landing Page | Mengikuti frame terbaru `776:2541` | Hero, Apa Itu, After Movie, tiga mata acara, Previous Speakers + Timeline, Testimoni, FAQ + Sponsor — lihat [FE-0024](./features/FE-0024_Codex_Revisi-Landing-Terbaru.md) |
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
- **Konten Landing Page.** Deskripsi BKUI sudah memakai copy yang relevan;
  FAQ dan enam Previous Speakers beserta fotonya memakai dokumen tim.
  Testimoni asli, daftar sponsor, dan URL video tetap menunggu konten resmi;
  UI menampilkannya secara transparan.

## Pekerjaan Visual yang Belum Selesai

- **Revisi landing terbaru membawa aset SVG komposisi hero dan vektor section.**
  Testimoni memakai pohon sakura (bukan lagi cemara), tiga papan Arah Petualangan
  memakai bentuk papan dari Figma, dan FAQ memakai rumput vektor. Beberapa
  tekstur awan serta dekorasi After Movie masih memakai aset ekspor Figma lama;
  perlu audit visual lanjutan sebelum menyatakan pixel-perfect. Lihat
  [FE-0024](./features/FE-0024_Codex_Revisi-Landing-Terbaru.md).
- **Frame landing `776:2541` diperbarui lagi.** Hero kini memakai ilustrasi
  bus kuning dari Figma; Arah Petualangan memakai papan judul/bendera, tekstur
  kayu, dan bukit/tanaman dari aset desain terbaru. CTA dan copy tetap HTML,
  dengan responsif 390px sudah diperiksa. Lihat
  [FE-0025](./features/FE-0025_Codex_Update-Landing-Bus-Arah.md).
- **Audit landing `776:2541` lanjutan (FE-0027).** Ruang kosong berlebih di
  Previous Speakers dihapus. Pohon kanan testimoni dilengkapi, bagian
  FAQ diberi ornamen biru selebar layar, serta enam pertanyaan utama tampil
  sesuai komposisi desain; sisanya tetap tersedia lewat ekspansi. Tampilan
  mobile 390px untuk Arah, Speakers, Testimoni, dan FAQ diperiksa di browser.
  Figma MCP mencapai batas Starter saat audit ini, jadi kesesuaian piksel
  terakhir belum bisa diklaim tanpa akses konteks desain kembali.
- **Koreksi visual landing akhir.** Balok kayu tambahan di Apa Itu dilepas
  karena tidak ada pada frame Figma; angka 2026 memakai Delight Extra Bold.
  Strip sponsor kini hanya memakai lingkaran dari SVG Figma (sebelumnya
  terduplikasi), latar SVG diperpanjang sampai tepi kanvas, dan tinggi minimum
  FAQ/padding bawah yang menimbulkan celah besar ke footer dihapus.
- **Previous Speakers:** enam kartu berisi nama, profesi, dan foto dari
  dokumen tim “Prev speaker” (2026-09-14). Grid desktop kini 3 × 2; tidak ada
  dua slot dummy atau label “Segera Diumumkan” tambahan.
- **Visual auth mengikuti frame Figma terbaru.** Daftar `824:1117`, Masuk
  `707:3918`, dan state galat `824:744` memakai komposisi pohon/bukit terbaru.
  Form masih HTML interaktif, tetapi endpoint auth belum terhubung di checkout
  FE ini. Lihat [FE-0026](./features/FE-0026_Codex_Revisi-Auth-Figma.md).
- **Explore UI sudah dicek visual di desktop dan mobile** serta memakai
  komposisi SVG lengkap dari frame Figma terbaru (FE-0022).
- **After Movie masih memakai sebagian dekorasi WebP lama.** Pemutar videonya
  tetap komponen HTML dan URL menunggu Admin Web; tidak ada screenshot halaman
  yang ditempel sebagai section.
- **Belum dicek:** browser selain Chromium. Seluruh rute sudah diperiksa pada
  lebar HP kecil 320px, HP 390px, dan tablet 768px (FE-0023).

_Terakhir diubah: 2026-09-20 (FE-0027)_
