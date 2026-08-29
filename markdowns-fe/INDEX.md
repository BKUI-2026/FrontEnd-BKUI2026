# Index — markdowns-fe

Dokumentasi kerja untuk FrontEnd-BKUI2026. Baca `CURRENT_STATE.md` dulu buat tau fitur mana yang udah kekoneksi ke API asli vs masih dummy data.

## Root
| File | Deskripsi | Status |
|---|---|---|
| [CURRENT_STATE.md](./CURRENT_STATE.md) | Status integrasi FE per fitur/halaman ke BE | living doc |
| [glossary/tech-stack.md](./glossary/tech-stack.md) | Kamus istilah teknis yang dipakai di FE | living doc |

## features/
Format nama file: `FE-000X_<Nama>_<Nama Fitur/Update>.md`
- `<Nama>`: nama orang yang mengerjakan
- `<Nama Fitur/Update>`: nama fitur atau ringkasan update singkat

Contoh: `FE-0005_Salman_Slicing-Landing-Page.md`

Tipe (`Components`, `Slides`, atau gabungan mis. `Components(Navbar)+Slides(LandingPage)`) dicatat di field `tipe:` pada frontmatter, **bukan di nama file** — biar nama file tetap pendek dan bebas tanda kurung. Tanda kurung di nama file bikin link Markdown ke file itu putus, karena renderer menganggap link selesai di `)` pertama.

Nomor urut naik terus, file lama gak diedit ulang (append-only, sama seperti ARCH log di BE).

**Kapan wajib bikin entry, kapan enggak:**
- **Wajib bikin `FE-000X` baru** kalau: nambah halaman/route baru, nambah komponen besar (Navbar, Card, dst pertama kali dibuat), fitur baru selesai/pindah status integrasi (mis. dari Dummy Data ke Terhubung ke API), atau keputusan yang mempengaruhi struktur project (lihat contoh FE-0002).
- **Gak perlu bikin entry** kalau perubahannya kecil: fix typo, tweak styling/spacing, fix lint/type error, refactor kecil tanpa ubah behavior, atau update copy teks. Commit seperti biasa aja, gak usah dicatet di log — biar `features/` gak kebanjiran entry receh dan tetep gampang di-scan.
- Kalau ragu, patokan gampangnya: kalau butuh dikasih tau ke partner biar dia gak kaget pas buka kodenya, catet. Kalau enggak, skip.

## integrations/
| File | Deskripsi | Status |
|---|---|---|
| [google-sso-client.md](./integrations/google-sso-client.md) | Tombol & flow login Google SSO di sisi client | belum dimulai |
| [yesplis-redirect.md](./integrations/yesplis-redirect.md) | CTA redirect Tiket & Merchandise ke Yesplis | belum dimulai |
| [backend-api-contract.md](./integrations/backend-api-contract.md) | Pointer ke kontrak API resmi (source of truth ada di repo BE) | living doc |
