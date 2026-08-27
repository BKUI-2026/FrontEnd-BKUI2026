---
id: FE-0003
tipe: Components(Navbar)
author: Salman
fitur: Navbar — Struktur Awal & Penataan Ulang Folder Aset
tanggal: 2026-08-27 10:20 WIB
status_integrasi: Belum Dikerjakan
---

## Deskripsi

Menambahkan Navbar yang tampil di semua halaman, plus menata ulang folder aset
statis di `public/`.

**Yang jadi di entry ini adalah STRUKTUR-nya, bukan tampilannya.** Acuan Figma
belum dibuka, jadi style-nya sengaja netral (abu-abu, tanpa warna brand, logo
masih teks). Saat slicing dimulai, yang diganti cukup class Tailwind-nya —
struktur, routing, dan logika di bawahnya tidak perlu dirombak.

### Yang dibangun

| File | Isi |
|---|---|
| `src/components/layout/Navbar.tsx` | Komponen navbar (client component) |
| `src/lib/navigation.ts` | Sumber tunggal daftar menu + helper `menuUntuk()` |
| `src/lib/auth-state.ts` | **Placeholder** kondisi login — belum ada auth sungguhan |
| `src/app/layout.tsx` | Navbar dipasang di root layout |

Fungsi yang sudah jalan:
- Link ke semua halaman, diambil dari `lib/navigation.ts` (tidak di-hardcode di
  komponen, jadi rute yang berubah cukup diedit di satu tempat).
- Penanda halaman aktif pakai `aria-current="page"` — dibaca screen reader,
  bukan cuma pembeda warna.
- Menu mobile dengan tombol buka/tutup, otomatis menutup saat pindah halaman.
- Pembagian menu General Public vs Student.

### Catatan RBAC

`lib/navigation.ts` menandai tiap menu dengan `akses: "General Public" | "Student"`.
Ini **bukan role baru** — persis 2 kondisi yang sudah ada. Menu Student
(Dashboard, Daftar Mentoring, Profile) belum muncul di navbar karena FE belum
bisa tahu user sudah login atau belum.

### Penataan ulang folder aset

`public/` sebelumnya dikelompokkan per halaman (`images/landing/`,
`images/ticket/`, dst). Diubah jadi **per jenis aset** atas permintaan PM:

```
public/
├── logo/     → logo BKUI, BEM UI, sponsor
├── image/    → foto & ilustrasi
└── icon/     → ikon SVG
```

Karena tidak lagi dipisah per halaman, pembeda pindah ke nama file — konvensi
penamaannya ada di `public/README.md`.

## Referensi Desain

**Belum ada.** Navbar ini dibuat tanpa acuan Figma. Begitu section navbar di
Figma dibuka, style-nya perlu disesuaikan — dan itu ditulis sebagai entry FE
baru, bukan mengedit entry ini.

## Status Integrasi API

**Belum terhubung ke API sama sekali.**

`src/lib/auth-state.ts` adalah placeholder yang selalu mengembalikan
`"General Public"`. Di dalamnya sengaja **tidak ada** fetch, tidak ada tipe
`User`/`Session`, dan tidak ada pembacaan cookie/token — endpoint auth BE belum
ada (per BE ARCH-0002, satu-satunya endpoint yang jalan adalah
`GET /api/v1/health`), jadi mengarang shape-nya melanggar README boundary
nomor 4.

Konsekuensinya sekarang: **menu Student tidak pernah muncul**, dan tombol
"Masuk" dibuat `disabled` karena belum ada tujuan yang bisa dituju.

Saat kontrak auth BE rilis, urutannya:
1. Catat kontraknya di `integrations/backend-api-contract.md`
2. Ganti isi `useAkses()` di `lib/auth-state.ts`
3. Tulis entry FE baru

Cukup satu file itu yang berubah — Navbar tidak perlu disentuh.

## Catatan

**Keputusan kecil:** menu mobile ditutup pakai pola "menyesuaikan state saat
render", bukan `useEffect`. Selain kena lint `react-hooks/set-state-in-effect`,
versi `useEffect` bikin panel sempat ter-render sekali dalam kondisi terbuka
sebelum ditutup. Cara sekarang juga tetap jalan kalau pindah halamannya lewat
tombol back/forward browser.

**Yang sengaja belum dibuat:** Footer, logo gambar (masih teks — asetnya belum
ada di `public/logo/`), dropdown/submenu, dan guard autentikasi di level rute.

**Verifikasi:** `npm run typecheck`, `npm run lint`, dan `npm run build`
semuanya lolos (exit 0). Navbar dicek muncul di 9 rute, `aria-current` benar
menandai halaman aktif, dan menu Student terbukti tidak muncul selama belum
login.
