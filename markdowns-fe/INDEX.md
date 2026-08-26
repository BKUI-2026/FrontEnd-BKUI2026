# Index — markdowns-fe

Dokumentasi kerja untuk FrontEnd-BKUI2026. Baca `CURRENT_STATE.md` dulu buat tau fitur mana yang udah kekoneksi ke API asli vs masih dummy data.

## Root
| File | Deskripsi | Status |
|---|---|---|
| [CURRENT_STATE.md](./CURRENT_STATE.md) | Status integrasi FE per fitur/halaman ke BE | living doc |
| [glossary/tech-stack.md](./glossary/tech-stack.md) | Kamus istilah teknis yang dipakai di FE | living doc |

## features/
Format nama file: `FE-000X_<Tipe>_<Nama>_<Nama Fitur/Update>.md`
- `<Tipe>`: `Components`, `Slides`, atau gabungan kalau lebih dari satu, mis. `Components(Navbar)+Slides(LandingPage)`
- `<Nama>`: nama orang yang mengerjakan
- `<Nama Fitur/Update>`: nama fitur atau ringkasan update singkat

Nomor urut naik terus, file lama gak diedit ulang (append-only, sama seperti ARCH log di BE).

## integrations/
| File | Deskripsi | Status |
|---|---|---|
| [google-sso-client.md](./integrations/google-sso-client.md) | Tombol & flow login Google SSO di sisi client | belum dimulai |
| [yesplis-redirect.md](./integrations/yesplis-redirect.md) | CTA redirect Tiket & Merchandise ke Yesplis | belum dimulai |
| [backend-api-contract.md](./integrations/backend-api-contract.md) | Pointer ke kontrak API resmi (source of truth ada di repo BE) | living doc |
