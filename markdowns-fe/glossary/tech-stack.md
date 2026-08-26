# Glossary — Tech Stack & Istilah (Frontend)

| Istilah | Penjelasan | Konteks di BKUI |
|---|---|---|
| Slides | Istilah internal tim untuk halaman/page besar (mis. Landing Page) | Dipakai di penamaan file `features/FE-000X_Slides(...)` |
| Components | Istilah internal untuk komponen UI reusable (mis. Navbar, Card) | Dipakai di penamaan file `features/FE-000X_Components(...)` |
| Arah Petualangan | Section role-routing di Landing Page (ke Mentoring/School Registration) | Lihat AGENTS.md bagian 4 |
| Dummy Data | Data statis/mock dipakai sebelum endpoint BE siap | Dicatat statusnya di CURRENT_STATE.md |
| App Router | Sistem routing Next.js berbasis struktur folder di `src/app/` | Dipakai sejak FE-0002, 1 folder = 1 rute |
| Route group | Folder berkurung mis. `(public)` — mengelompokkan file tanpa ikut jadi URL | Dipakai memisah halaman General Public vs Student. Bukan role baru |
| Placeholder | Halaman kosong yang menandai rutenya sudah ada, UI-nya belum dislicing | Komponen `PagePlaceholder`, dihapus per halaman saat slicing dimulai |
| Design token | Nilai desain (warna, font, spacing) yang dipakai ulang lintas komponen | Belum diisi — nunggu Figma. Nanti masuk `globals.css` lewat `@theme` |
| Env NEXT_PUBLIC_ | Prefix env Next.js yang bikin nilainya ikut ter-bundle ke browser | Boleh untuk base URL & Client ID, HARAM untuk secret |

> Tambah baris baru tiap ada istilah baru yang dipakai di code/diskusi.
