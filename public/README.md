# public/ — Aset Statis FE BKUI 2026

File di folder ini disajikan apa adanya lewat URL. Path-nya = path folder tanpa `public`:

`public/image/hero-landing.webp` → diakses sebagai `/image/hero-landing.webp`

## Struktur

Dikelompokkan berdasarkan **jenis aset**, bukan per halaman:

```
public/
├── logo/     → logo BKUI, logo BEM UI, logo sponsor/partner
├── image/    → foto & ilustrasi (hero, merchandise, dokumentasi, dsb)
└── icon/     → ikon SVG (panah, sosmed, ikon UI kecil)
```

Karena tidak dipisah per halaman, **nama file yang membedakan** — lihat bagian
Konvensi di bawah.

## Cara pakai di komponen

Selalu lewat `next/image`, jangan `<img>` biasa — biar dapat lazy-load dan
optimasi ukuran otomatis:

```tsx
import Image from "next/image";

<Image
  src="/image/hero-landing.webp"
  alt="Deskripsi gambar yang bermakna"
  width={1200}
  height={630}
/>
```

`width` & `height` **wajib diisi** untuk gambar dari `public/`, dan harus sesuai
rasio asli file — ini yang mencegah layout geser saat gambar selesai dimuat.

Khusus ikon SVG kecil yang perlu diwarnai lewat CSS, `<img>` atau inline SVG
lebih cocok daripada `next/image`.

## Konvensi

**Penamaan.** Huruf kecil, pakai tanda hubung. Karena satu folder dipakai
bersama lintas halaman, awali nama dengan konteksnya biar tidak tabrakan dan
gampang dicari. Ikut istilah PRD supaya bisa ditelusuri balik ke requirement:

| Folder | Contoh baik | Contoh buruk |
|---|---|---|
| `logo/` | `logo-bkui.svg`, `logo-bem-ui.svg` | `Logo Final FIX.png` |
| `image/` | `hero-landing.webp`, `arah-petualangan-bg.webp`, `merch-tote-bag.webp` | `Group 12 (1).png`, `IMG_4821.PNG` |
| `icon/` | `icon-panah-kanan.svg`, `icon-instagram.svg` | `Vector.svg`, `Untitled-2.svg` |

**Format.** Foto → `.webp` (jauh lebih kecil dari PNG/JPG). Logo & ikon → `.svg`.
Repo ini sering di-clone; PNG mentah hasil ekspor Figma cepat bikin repo berat,
dan sekali masuk history git ukurannya tidak bisa dihapus tanpa rewrite.

**Ukuran file.** Usahakan di bawah ~300 KB per gambar. Kalau ada aset yang jauh
lebih besar dari itu, kompres dulu sebelum commit.

## Catatan

- **Gambar dari domain luar** (mis. foto merch yang di-host Yesplis) tidak bisa
  langsung dipakai `next/image` — domainnya harus didaftarkan dulu di
  `remotePatterns` pada `next.config.ts`.
- **Jangan taruh apapun yang rahasia di sini.** Seluruh isi folder ini bisa
  diakses publik lewat URL oleh siapa saja, tanpa login.
- File `.gitkeep` di tiap subfolder cuma penanda supaya folder kosong tetap ikut
  ke-commit. Hapus saja kalau folder-nya sudah berisi aset asli.
