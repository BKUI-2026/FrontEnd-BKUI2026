import type { ItemKatalog } from "@/lib/katalog";

/**
 * Konten katalog Merchandise — SEMUANYA MASIH DUMMY.
 *
 * Sumber aslinya entity `Content` di BE dan endpoint-nya belum ada, jadi shape
 * response-nya tidak boleh dikarang duluan (README boundary nomor 4). Polanya
 * sama dengan `landing-content.ts` dan `explore-content.ts`.
 *
 * ---------------------------------------------------------------------------
 * TIDAK ADA transaksi di sini, dan tidak boleh ada
 * ---------------------------------------------------------------------------
 * Tipe di bawah sengaja TIDAK punya field keranjang, jumlah beli, atau varian
 * terpilih. Halaman ini cuma katalog: seluruh pembelian keluar ke Yesplis
 * (AGENTS.md bagian 5.4 dan README boundary nomor 1).
 *
 * Nama, harga, dan stok masih placeholder persis seperti di Figma. Kategori
 * sengaja divariasikan supaya penyaringnya bisa dicoba — begitu konten resmi
 * turun, seluruh isi `PRODUK` diganti.
 */

/** Kategori di panel Filter, urutannya mengikuti Figma. */
export const KATEGORI = [
  "Apparel",
  "Accessories",
  "Bundles",
  "Event Memorabilia",
] as const;

export type Kategori = (typeof KATEGORI)[number];

/** Produk = item katalog + kategori untuk penyaring. */
export type Produk = ItemKatalog & { kategori: Kategori };

/** Hanya bagian yang berbeda per produk; sisanya diisi seragam lewat `map`. */
type ProdukDasar = Pick<Produk, "id" | "nama" | "kategori"> & Partial<Produk>;

const DAFTAR_DASAR: readonly ProdukDasar[] = [
  { id: "m1", nama: "Nama Merchandise 1", kategori: "Apparel" },
  { id: "m2", nama: "Nama Merchandise 2", kategori: "Accessories" },
  { id: "m3", nama: "Nama Merchandise 3", kategori: "Bundles" },
  { id: "m4", nama: "Nama Merchandise 4", kategori: "Event Memorabilia" },
  { id: "m5", nama: "Nama Merchandise 5", kategori: "Apparel" },
  { id: "m6", nama: "Nama Merchandise 6", kategori: "Accessories" },
  { id: "m7", nama: "Nama Merchandise 7", kategori: "Apparel" },
  { id: "m8", nama: "Nama Merchandise 8", kategori: "Bundles" },
  { id: "m9", nama: "Nama Merchandise 9", kategori: "Event Memorabilia" },
];

/** Deskripsi placeholder, disalin apa adanya dari Figma. */
const DESKRIPSI_MENYUSUL =
  "PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.";

export const PRODUK: readonly Produk[] = DAFTAR_DASAR.map((p) => ({
  harga: 1_000_000_000,
  stok: 24,
  deskripsi: DESKRIPSI_MENYUSUL,
  jumlahFoto: 4,
  ...p,
}));

/** Produk yang lolos penyaring. Tanpa kategori terpilih = tampilkan semua. */
export function produkUntuk(terpilih: readonly Kategori[]): readonly Produk[] {
  if (terpilih.length === 0) return PRODUK;
  return PRODUK.filter((p) => terpilih.includes(p.kategori));
}
