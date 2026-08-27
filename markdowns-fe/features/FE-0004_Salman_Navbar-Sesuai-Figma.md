---
id: FE-0004
tipe: Components(Navbar)+Components(LogoBKUI)+Components(ButtonPesanTiket)+Components(ButtonMasukSiswa)+Components(AvatarProfil)
author: Salman
fitur: Navbar Sesuai Desain Figma + Design Token Warna
tanggal: 2026-08-27 14:10 WIB
status_integrasi: Belum Dikerjakan
---

## Deskripsi

Menyesuaikan Navbar dengan desain Figma yang sudah final, menggantikan versi
netral dari FE-0003. Sekaligus mendaftarkan warna brand sebagai design token.

### Design token

Ditambahkan di `src/app/globals.css` lewat `@theme`:

| Token | Hex | Dipakai untuk |
|---|---|---|
| `--color-bkui-oren` | `#FF7730` | CTA utama — tombol "Pesan Tiket" |
| `--color-bkui-button` | `#84C2F6` | Tombol sekunder — "Masuk sebagai Siswa" |
| `--color-bkui-navbar` | `#E6F3FD` | Background navbar |

Pakai token ini di komponen (`bg-bkui-oren`), **jangan tulis hex langsung** —
biar revisi warna cukup diubah di satu tempat.

### Komponen yang dibuat

| File | Isi |
|---|---|
| `components/ui/LogoBKUI.tsx` | Logo + link ke Beranda |
| `components/ui/ButtonPesanTiket.tsx` | CTA oren dengan ikon tiket |
| `components/ui/ButtonMasukSiswa.tsx` | Tombol biru, **masih disabled** |
| `components/ui/AvatarProfil.tsx` | Ikon avatar → Profile |
| `components/layout/Navbar.tsx` | Perakit semuanya |

Dipecah begini supaya `ButtonPesanTiket` bisa dipakai ulang di halaman Ticket
dan Landing Page tanpa menyalin style.

### Layout container

Navbar dibuat **full width** — background `bkui-navbar` membentang dari tepi kiri
ke tepi kanan layar, menempel di atas, tanpa sudut membulat dan tanpa lebar
maksimum. Isinya (logo, menu, tombol) diberi padding `px-8` biar tidak menempel
tepi.

Di screenshot Figma navbar terlihat punya sudut membulat dan jarak dari tepi;
versi full width ini keputusan PM setelah melihat hasil implementasinya.

### Dua kondisi navbar (sesuai Figma)

| | General Public | Student |
|---|---|---|
| Menu | Beranda, Explore UI, School Roadshow, Merchandise | + Mentoring |
| Kanan | Pesan Tiket + "Masuk sebagai Siswa" | Pesan Tiket + avatar |

Tetap RBAC linear, tidak ada kondisi ketiga.

### Perubahan daftar menu dari FE-0003

Desain Figma berbeda dari tebakan saya di FE-0003, jadi `lib/navigation.ts`
diperbaiki:

- **Ditambah:** "Beranda" (`/`)
- **Dihapus dari menu:** "Ticket" — di Figma ini bukan item menu, tapi tombol
  CTA "Pesan Tiket"
- **Dihapus dari menu:** "Daftar CASA" — tidak ada di navbar sama sekali
- **Diganti nama:** "Daftar Mentoring" → "Mentoring"
- **Dihapus dari menu:** "Dashboard" & "Profile" — Profile diwakili avatar

Rute `/daftar-casa` dan `/dashboard` **tetap hidup**, hanya tidak punya pintu
masuk dari navbar.

## Referensi Desain

Screenshot Figma navbar (dua state: `navbar` dan `navbar - logged in`) yang
diberikan PM pada 2026-08-27. Link Figma section-nya belum dicatat — perlu
ditambahkan ke entry ini kalau nanti dibuka aksesnya.

Aset dari `public/`:
- `logo/mainLogoBKUI2026.svg`
- `logo/lucide/circle-user-round.svg`
- `icon/lucide/Vector.svg` (ikon tiket)

## Status Integrasi API

**Belum terhubung ke API.** `lib/auth-state.ts` masih placeholder yang selalu
mengembalikan `General Public`, jadi yang tampil di browser selalu versi belum
login. Versi Student sudah diimplementasi dan sudah diuji manual dengan
membalik nilai placeholder sementara, lalu dikembalikan lagi.

Tombol "Masuk sebagai Siswa" `disabled` karena endpoint auth BE belum ada.
Warnanya sengaja tidak dipudarkan supaya tetap sama dengan Figma — penanda
belum aktifnya lewat kursor dan tooltip.

## Catatan

### Keputusan yang perlu dikonfirmasi ke PM/designer

1. **"Pesan Tiket" mengarah ke `/ticket`, bukan langsung ke Yesplis.** URL
   Yesplis masih TBD, dan menaruh redirect keluar di satu tempat (halaman
   Ticket) lebih gampang diurus. Kalau maksudnya langsung ke Yesplis, tinggal
   ubah `ButtonPesanTiket.tsx`.
2. **Pintu masuk ke Daftar CASA belum ada.** Tidak ada di navbar — dugaan saya
   diakses dari section Arah Petualangan di Landing Page.
3. **Pintu masuk ke Student Dashboard belum ada.** Mungkin dari dropdown avatar?
   Di Figma avatar belum terlihat punya dropdown.
4. **Tampilan aktif/hover menu belum ditentukan di Figma.** Sementara pakai
   tebal (`font-semibold`) untuk halaman aktif. Di screenshot Figma, "Merchandise"
   terlihat ungu bergaris bawah — saya anggap itu artefak visited-link dari
   prototype HTML, bukan keputusan desain. Perlu dikonfirmasi.
5. **Versi mobile tidak ada di Figma.** Layout mobile di sini turunan dari versi
   desktop (tombol "Menu" + panel dropdown), belum divalidasi designer dan belum
   sempat diverifikasi visual.

### Aset perlu diekspor ulang (penting)

`logo/mainLogoBKUI2026.svg` (371 KB) dan `logo/footerLogoBKUI2026.svg` (721 KB)
**bukan SVG vector sungguhan** — isinya satu `<rect>` berisi PNG base64, nol
elemen `<path>`. Efeknya:

- Logo 371 KB ikut dimuat di **setiap halaman**, padahal logo SVG asli biasanya
  2–5 KB.
- Tidak bisa diwarnai lewat CSS.
- Tidak bisa dioptimasi `next/image` (SVG dilewatkan apa adanya).

Minta designer ekspor ulang sebagai SVG vector asli (jangan "Flatten"/rasterize
dulu). Kalau logonya memang mengandung raster, lebih baik ekspor `.webp` daripada
dibungkus SVG.

### Penamaan aset

`icon/lucide/Vector.svg` — nama bawaan ekspor Figma, tidak menjelaskan isinya
(ini ikon tiket). Sesuai konvensi di `public/README.md` sebaiknya jadi
`icon-tiket.svg`. Belum saya rename karena file-nya baru ditaruh PM.

### Verifikasi

`npm run typecheck`, `npm run lint`, `npm run build` semuanya exit 0. Kedua
state navbar dicek visual di browser dan cocok dengan Figma. Penanda halaman
aktif berfungsi. **Tampilan mobile belum diverifikasi visual** — screenshot
selalu ter-capture di lebar tetap.
