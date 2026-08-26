---
nama_integrasi: Kontrak API Backend (referensi lintas repo)
status: living doc
owner: BE
---

## Deskripsi
File ini BUKAN salinan kontrak API, cuma pointer. Source of truth kontrak API ada di repo BackEnd-BKUI2026, karena BE yang mendefinisikan bentuk endpoint.

## Lokasi Source of Truth
../../BackEnd-BKUI2026/markdowns-be/integrations/ (tiap file per integrasi) dan ../../BackEnd-BKUI2026/markdowns-be/architecture/CURRENT_STATE.md (bagian "Struktur API").

> Link relatif ini jalan selama folder FrontEnd-BKUI2026 dan BackEnd-BKUI2026 tetap sibling di dalam folder project-bkui2026 seperti sekarang.

## Catatan Sinkronisasi
Tiap kali kontrak API berubah di BE, catat di sini: tanggal & jam, endpoint yang berubah, ARCH/commit terkait di BE.

| Tanggal & Jam | Endpoint | Perubahan | Ref BE |
|---|---|---|---|
| 2026-08-26 20:45 WIB | `GET /api/v1/health` | Endpoint pertama BE. Response `{ status: 'ok'\|'degraded', timestamp: string, uptime: number, database: 'up'\|'down' }`. Base path semua endpoint: `/api/v1`, BE jalan di port 3000. CORS `credentials: true`, origin FE harus terdaftar di env `CORS_ORIGINS` sisi BE. | BE ARCH-0002 |

> Per 2026-08-26, `GET /api/v1/health` adalah **satu-satunya** endpoint BE yang sudah ada. Endpoint auth, form registrasi (CASA / School Roadshow / Mentoring), dan Content **belum didefinisikan** — jangan bikin tipe response-nya duluan di FE (README boundary nomor 4). Tipe yang sudah ditulis di `src/lib/api.ts` baru `HealthCheckResponse`.
