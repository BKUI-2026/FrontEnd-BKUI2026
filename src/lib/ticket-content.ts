import type { ItemKatalog } from "@/lib/katalog";

/**
 * Tier tiket BKUI 2026 — MASIH DUMMY.
 *
 * Sumber aslinya entity `Content` di BE dan endpoint-nya belum ada, jadi shape
 * response-nya tidak boleh dikarang duluan (README boundary nomor 4).
 *
 * Nama tier (Gold, Silver, Bronze) diambil dari Figma. Harga dan stok masih
 * nilai placeholder dari Figma juga; deskripsinya belum ditulis PM.
 *
 * TIDAK ADA payment gateway di sini dan tidak boleh ada. Halaman tiket cuma
 * menampilkan info tier + CTA redirect keluar ke Yesplis (AGENTS.md bagian 5.4).
 */

/** Deskripsi placeholder — belum ada isi resmi per tier. */
const DESKRIPSI_MENYUSUL =
  "Rincian benefit tiap tier belum tersedia. Isi resmi menyusul dari panitia.";

const DAFTAR_DASAR: readonly (Pick<ItemKatalog, "id" | "nama"> & Partial<ItemKatalog>)[] = [
  { id: "gold", nama: "Gold" },
  { id: "silver", nama: "Silver" },
  { id: "bronze", nama: "Bronze" },
];

export const TIER: readonly ItemKatalog[] = DAFTAR_DASAR.map((t) => ({
  harga: 1_000_000_000,
  stok: 24,
  deskripsi: DESKRIPSI_MENYUSUL,
  jumlahFoto: 4,
  ...t,
}));
