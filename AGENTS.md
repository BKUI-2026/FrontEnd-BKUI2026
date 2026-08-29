# AGENTS.md — Instruksi untuk AI Coding Agent
## Proyek: BKUI Website (Bedah Kampus Universitas Indonesia)

> Simpan file ini sebagai `AGENTS.md` / `CLAUDE.md` di root repo. File ini adalah instruksi kerja untuk AI coding agent (mis. Claude Code, Cursor) yang membantu develop project ini. Bukan prompt sekali pakai — ini konteks yang harus selalu dipatuhi selama sesi development.

---

## 1. Deskripsi Proyek

BKUI Website adalah **hub informasi terpusat sekaligus pintu masuk konversi** untuk acara tahunan Bedah Kampus Universitas Indonesia (BKUI), open house flagship yang diselenggarakan BEM UI dan menjangkau 10.000+ peserta per tahun (siswa SMA/gap year, mahasiswa, orang tua, dan perwakilan sekolah).

Platform ini punya dua fungsi utama:

1. **Information Hub** — menyajikan informasi resmi dan terpusat soal fakultas UI, jadwal acara, pembicara, dan detail program, menggantikan distribusi info yang sebelumnya tercecer di media sosial, form manual, dan pesan pribadi.
2. **Conversion & Action Bridge** — mengarahkan user secara mulus ke pendaftaran event (Mentoring), pendaftaran kunjungan sekolah (School Roadshow), serta ke platform partner eksternal untuk tiket dan merchandise (Yesplis), **tanpa membangun payment gateway internal**.

Masalah yang diselesaikan: information asymmetry, friksi navigasi antar segmen user, dan proses pendataan manual yang tidak efisien. Solusinya adalah satu platform web sebagai *single source of truth* (SSOT) dengan journey yang disegmentasi per role.

---

## 2. Tech Stack (yang sudah disepakati tim)

- **Frontend styling:** Tailwind CSS
- **Database:** PostgreSQL
- **Backend:** API dengan konfigurasi CORS, boilerplate REST-style endpoints
- **Auth:** Email/Password + Google SSO (OAuth2), session & token management
- **Admin:** Web Admin **terpisah** dari web utama (bukan dashboard tertanam), menerima data secara async dari beberapa form publik

> Catatan: PRD tidak menyebut secara eksplisit framework frontend/backend (Next.js/Express/dsb). Jika belum ditentukan, tanyakan ke user sebelum membuat asumsi struktur folder — jangan menebak dan langsung scaffold.

---

## 3. Role & RBAC (Role-Based Access Control)

RBAC dibuat **linear dan sesederhana mungkin** — hanya dua kondisi utama: General Public (belum login) vs Authenticated Student. Role yang ada:

| Role | Deskripsi | Akses |
|---|---|---|
| **General User / Public** | Siapa pun, belum login | Landing Page, Explore UI, Merch, Ticket, FAQ, form CASA, form School Roadshow (tanpa login) |
| **Student (Siswa SMA)** | Auto-assign saat onboarding jika user menjawab "ya" pada pertanyaan "Are you a high school student?" | Fitur Mentoring, Student Dashboard |
| **PJ Sekolah** | Perwakilan sekolah | Pendaftaran institusi (School Roadshow) — **PRD menegaskan fitur ini TIDAK butuh role/login khusus**, cukup public access, supaya RBAC tetap linear |
| **Admin** | Internal panitia, di Web Admin terpisah | Kelola konten (video, info mentoring), lihat data pendaftar (CASA & School Roadshow), moderasi |

**Aturan penting:** Jangan menambahkan role baru atau memperumit RBAC di luar yang disebutkan tanpa konfirmasi ke PM (Haikal) — PRD eksplisit menyebut tujuannya menjaga RBAC tetap simpel (General Public vs Authenticated Student).

---

## 4. Scope MVP — Daftar Fitur & Prioritas Build

Urutkan implementasi sesuai urutan ini kecuali diarahkan lain oleh PM:

1. **Authentication** — Email/Password + Google SSO, session management, profile binding di login pertama (Full Name, Role, Institution Origin)
2. **Landing Page** — hero/deskripsi BKUI, video player (Teaser/Trailer/Aftermovie, URL-nya diupdate dari Admin), "Arah Petualangan" (role-routing ke Mentoring atau School Registration), Speakers, Timeline, Ticket highlight (redirect ke Yesplis), Testimoni CASA, FAQ (accordion), Carousel Sponsor, Footer
3. **Explore UI** — katalog fakultas & program studi UI, kurikulum, profil fakultas
4. **Merchandise Catalog** — kartu produk merch dengan CTA redirect ke Yesplis (tidak ada transaksi in-app)
5. **Ticket** — info tier/harga tiket, CTA redirect ke Yesplis (tidak ada payment gateway internal)
6. **Profile** — Name, "Are you a high school student?" (auto-assign Student role jika ya), School/University, Phone (WhatsApp-enabled), Email
7. **Student Dashboard (role: Student)** — pre-registration & post-registration state (timeline, link grup WA/Zoom, pengumuman ditarik dari Admin)
8. **School Roadshow Registration** — form publik (nama institusi, alamat, email sekolah, PIC contact, target jumlah siswa), data dikirim async langsung ke database Admin Web (bukan disimpan/diproses di web utama)

Fitur tambahan yang disebut di bagian "Rough MVP" (perhatikan saat implementasi):
- **Daftar CASA** — form publik (tanpa login) yang trigger notifikasi WhatsApp otomatis ke pendaftar via API WhatsApp, redirect ke halaman feedback ("Terimakasih... akan dihubungi..."), data langsung masuk ke database Admin.
- **Daftar Mentoring (role: Student)** — user login → isi form mentoring → submit → redirect ke halaman info (timeline + link lanjutan, diupdate Admin).

---

## 5. Alur Kunci yang Harus Diikuti Persis

### 5.1 Onboarding & Auto-Role Student
```
User belum login → klik "Daftar Mentoring" →
create/assign Student role saat isi profil ("Are you a high school student?" = Ya) →
Student Dashboard → isi form mentoring → Student Dashboard (post-registration)
```

### 5.2 School Roadshow (Public, tanpa login)
```
Visitor klik CTA "PJ Sekolah"/"School Visit" (dari Navbar atau "Arah Petualangan") →
halaman info & registrasi →
submit form →
payload dikirim langsung/async ke database Web Admin (terpisah) →
tampilkan modal/notifikasi konfirmasi on-screen
```
Jangan buat dashboard admin tertanam di web utama untuk data ini — datanya harus dikirim ke Admin Web yang terpisah.

### 5.3 CASA Registration (Public, tanpa login)
```
Klik "Daftar CASA" di Landing Page →
form pendaftaran →
submit →
trigger API WhatsApp (pesan konfirmasi otomatis ke nomor pendaftar) →
redirect ke halaman feedback →
data masuk ke database Admin
```

### 5.4 Ticket & Merchandise
Kedua fitur ini **hanya menampilkan info + CTA redirect** ke platform partner eksternal (Yesplis). Jangan implementasikan checkout, cart, atau payment flow apa pun di dalam web BKUI.

---

## 6. Integrasi Eksternal (Wajib Diperhatikan)

- **Yesplis** — partner ticketing & e-commerce. Semua CTA "Beli Tiket" dan "Beli Merch" redirect keluar ke Yesplis. Tidak ada payment gateway internal.
- **Google SSO (OAuth2)** — untuk login satu klik.
- **API WhatsApp** — trigger otomatis untuk konfirmasi pendaftaran CASA.
- **API Email** — trigger notifikasi otomatis ke email sekolah setelah submit form School Roadshow.
- **Admin Web (platform terpisah)** — semua data pendaftaran (CASA, School Roadshow) dikirim ke sana, bukan disimpan/dikelola di web utama. Web utama tidak perlu punya dashboard admin lengkap.
- **Google Sheets (opsional, sisi Admin)** — data pendaftar bisa auto-sync ke Sheets dari Admin Web.

---

## 7. Konten yang Dikelola Dinamis oleh Admin

Field-field berikut harus dibuat dinamis/updatable via Admin, bukan hardcoded:
- URL video di Landing Page (Teaser → Trailer → After Movie)
- Informasi & link spesifik di halaman/dashboard mentoring (link grup WA/Zoom, pengumuman, timeline)

---

## 8. Konvensi & Batasan Teknis untuk Agent

- **Jangan** membangun payment gateway atau flow transaksi apa pun — semua transaksi diarahkan keluar ke Yesplis.
- **Jangan** membuat dashboard admin penuh di web utama — cukup endpoint pengiriman data (POST) ke Admin Web terpisah.
- **Jangan** menambah role RBAC baru di luar General Public / Student tanpa konfirmasi eksplisit — tujuan desainnya adalah linear.
- Gunakan Tailwind CSS untuk semua styling; hindari CSS custom besar-besaran kecuali tidak bisa dihandle utility class.
- Gunakan PostgreSQL sebagai database utama; desain schema dengan mempertimbangkan entitas: User, Role, MentoringRegistration, SchoolRoadshowRegistration, CASARegistration, Content (video URL, pengumuman).
- Semua endpoint publik yang menerima submission form (CASA, School Roadshow, Mentoring) harus punya validasi input dasar dan menampilkan feedback state (loading/success/error) di frontend.
- Ikuti penamaan istilah asli dari PRD di kode/komentar bila relevan (mis. "Arah Petualangan", "CASA", "PJ Sekolah") supaya mudah ditelusuri balik ke requirement.
- Jika ada ambiguitas requirement (contoh: struktur ERD, IA, detail Student Dashboard yang di PRD masih kosong/placeholder), **tanyakan ke PM/Designer** — jangan berasumsi dan lanjut membangun fitur yang belum jelas spesifikasinya.
- Prioritaskan MVP scope di atas sebelum mengerjakan fitur di luar daftar.

---

## 9. Hal yang Masih Perlu Diklarifikasi ke Tim (belum lengkap di PRD)

Tandai sebagai *blocked/perlu konfirmasi* sebelum mengimplementasikan penuh:
- Detail lengkap **Student Dashboard** (contents belum diisi di PRD — baru ada judul section).
- Mekanisme verifikasi status siswa/peserta mentoring: opsi 1 (cek setelah sign-up, verifikasi sebelum kasih akses/role) vs opsi 2 (manual revoke access) — belum diputuskan final.
- ERD & IA (Information Architecture) resmi belum dilampirkan/final di dokumen ini.
- Framework teknis pasti (frontend meta-framework, hosting, dsb.) belum disebutkan eksplisit.

---

## 10. Ringkasan Prioritas Kerja untuk Agent

Kalau harus memilih apa yang dikerjakan lebih dulu tanpa arahan tambahan, urutannya:
1. Setup boilerplate (repo, Tailwind, PostgreSQL schema dasar, CORS/API base)
2. Landing Page + Explore UI
3. Ticket + Merchandise (redirect-only)
4. School Roadshow Registration (form + endpoint ke Admin Web)
5. Auth (Email/Password + Google SSO) + Profile
6. Student Dashboard + Mentoring Registration flow
7. QA responsif (mobile/tablet/desktop), cross-browser, security/edge-case audit
8. Deployment

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
