"use client";

import type { Akses } from "./navigation";

/**
 * PLACEHOLDER — belum ada autentikasi sungguhan.
 *
 * Endpoint auth di BE belum ada (per BE ARCH-0002, satu-satunya endpoint yang
 * jalan adalah GET /api/v1/health), jadi FE BELUM BISA tahu user sudah login
 * atau belum. Sesuai README boundary nomor 4, shape response auth tidak boleh
 * dikarang duluan — makanya di sini tidak ada fetch, tidak ada tipe `User`,
 * dan tidak ada pembacaan cookie/token.
 *
 * Untuk sekarang semua pengunjung dianggap General Public, jadi menu khusus
 * Student belum muncul di Navbar.
 *
 * Saat kontrak auth BE sudah rilis:
 * 1. Catat kontraknya di markdowns-fe/integrations/backend-api-contract.md
 * 2. Ganti isi fungsi ini supaya membaca session sungguhan
 * 3. Tulis entry FE baru untuk perubahannya
 *
 * Cukup file ini yang perlu diubah — Navbar dan komponen lain tidak.
 */
export function useAkses(): Akses {
  return "General Public";
}
