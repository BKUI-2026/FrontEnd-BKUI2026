# FrontEnd-BKUI2026

Frontend untuk platform BKUI Website (Bedah Kampus Universitas Indonesia) — BEM UI. Bagian dari 2 repo terpisah: repo ini (FE) dan `BackEnd-BKUI2026` (BE), dikerjakan paralel oleh 2 orang, masing-masing dibantu AI coding agent.

## Dokumentasi
Sebelum ngoding apapun di repo ini, baca dulu:
- `markdowns-fe/CURRENT_STATE.md` — status integrasi tiap fitur/halaman ke API BE
- `markdowns-fe/glossary/tech-stack.md` — istilah teknis
- `markdowns-fe/integrations/backend-api-contract.md` — pointer ke kontrak API resmi (source of truth ada di repo BE)

## Tech Stack
- Styling: Tailwind CSS
- Auth: konsumsi Email/Password + Google SSO (OAuth2) dari BE
- Desain: acuan Figma sudah final — fokus slicing & build, bukan eksplorasi desain baru

## Boundaries / Batasan Repo Ini (WAJIB DIPATUHI)

Constraint ini berlaku juga buat AI coding agent yang bantu ngerjain repo ini — cek di sini dulu sebelum tanya ulang atau berasumsi.

1. **Jangan bikin checkout/cart/payment flow apapun.** Halaman Ticket & Merchandise cuma menampilkan info + CTA redirect keluar ke Yesplis.
2. **Jangan ubah keputusan desain Figma tanpa diminta.** Desain UI/UX sudah final dari tim designer — treat sebagai acuan visual, fokus implementasi.
3. **Jangan nambah role/state RBAC baru** di sisi client tanpa konfirmasi ke PM. Cuma ada 2 kondisi: General Public (belum login) & Student (login).
4. **Jangan ngarang bentuk response API sendiri.** Kalau endpoint belum ada atau statusnya masih "belum dimulai" di `../BackEnd-BKUI2026/markdowns-be/integrations/`, pakai dummy data dan catat statusnya `Masih Dummy Data` di `markdowns-fe/CURRENT_STATE.md` — jangan asumsi shape data dari BE.
5. **Jangan edit file lama di `markdowns-fe/features/`.** File `FE-000X` bersifat immutable/append-only — update baru = file baru, bukan edit file lama.
6. **Jangan sentuh isi folder `BackEnd-BKUI2026/`.** Batas repo = batas tanggung jawab. Kebutuhan perubahan kontrak API dicatat di `markdowns-fe/integrations/backend-api-contract.md` dan dikoordinasikan langsung ke partner BE.
7. **Ikuti penamaan istilah dari PRD** (CASA, PJ Sekolah, Arah Petualangan, dst) di code/comment/nama komponen.

## Yang Masih Perlu Diklarifikasi
Lihat AGENTS.md bagian 9 — konten Student Dashboard, ERD/IA final, dan framework teknis pasti belum ditentukan. Jangan diasumsikan, tanya ke PM dulu.
