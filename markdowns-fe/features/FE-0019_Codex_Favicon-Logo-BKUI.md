---
id: FE-0019
tipe: Fix(Branding)
author: Codex
fitur: Favicon logo BKUI
tanggal: 2026-09-13 22:00 WIB
status_integrasi: Selesai
---

## Perubahan

- Menghapus favicon bawaan Next.js.
- Menambahkan `src/app/icon.png` berukuran 512×512 dari aset logo resmi BKUI
  yang sudah tersedia di project.
- Next.js App Router otomatis memakai file tersebut sebagai favicon website,
  termasuk pada deployment Vercel berikutnya.

## Verifikasi

- File PNG transparan diperiksa secara visual.
- Typecheck, lint, dan production build dijalankan setelah perubahan.
