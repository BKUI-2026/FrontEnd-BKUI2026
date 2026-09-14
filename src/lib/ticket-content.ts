import type { ItemKatalog } from "@/lib/katalog";

/**
 * Tier tiket BKUI 2026 — MASIH DUMMY.
 *
 * Sumber aslinya entity `Content` di BE dan endpoint-nya belum ada, jadi shape
 * response-nya tidak boleh dikarang duluan (README boundary nomor 4).
 *
 * Nama tier (Gold, Silver, Bronze) diambil dari Figma. Harga dan stok dibiarkan
 * kosong sampai informasi resmi tersedia; deskripsinya belum ditulis PM.
 *
 * TIDAK ADA payment gateway di sini dan tidak boleh ada. Halaman tiket cuma
 * menampilkan info tier + CTA redirect keluar ke Yesplis (AGENTS.md bagian 5.4).
 */

/** Deskripsi placeholder — belum ada isi resmi per tier. */
const DESKRIPSI_MENYUSUL =
  "Rincian fasilitas dan manfaat untuk tier ini akan diperbarui setelah informasi resmi diumumkan oleh panitia BKUI 2026.";

const DAFTAR_DASAR: readonly (Pick<ItemKatalog, "id" | "nama"> & Partial<ItemKatalog>)[] = [
  { id: "gold", nama: "Gold" },
  { id: "silver", nama: "Silver" },
  { id: "bronze", nama: "Bronze" },
];

export const TIER: readonly ItemKatalog[] = DAFTAR_DASAR.map((t) => ({
  harga: null,
  stok: null,
  deskripsi: DESKRIPSI_MENYUSUL,
  jumlahFoto: 4,
  ...t,
}));
