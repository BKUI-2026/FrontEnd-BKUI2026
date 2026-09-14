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
 * Nama sementara dibuat informatif tanpa mengarang produk spesifik. Harga dan
 * stok dibiarkan null sampai katalog resmi turun. Kategori sengaja divariasikan
 * supaya penyaringnya tetap bisa dicoba.
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
  { id: "m1", nama: "Koleksi Apparel BKUI", kategori: "Apparel" },
  { id: "m2", nama: "Koleksi Aksesori BKUI", kategori: "Accessories" },
  { id: "m3", nama: "Paket Merchandise BKUI", kategori: "Bundles" },
  { id: "m4", nama: "Memorabilia BKUI 2026", kategori: "Event Memorabilia" },
  { id: "m5", nama: "Apparel Makara Expedition", kategori: "Apparel" },
  { id: "m6", nama: "Aksesori Makara Expedition", kategori: "Accessories" },
  { id: "m7", nama: "Koleksi Apparel Eksklusif", kategori: "Apparel" },
  { id: "m8", nama: "Paket Makara Expedition", kategori: "Bundles" },
  { id: "m9", nama: "Kenang-kenangan BKUI 2026", kategori: "Event Memorabilia" },
];

/** Informasi sementara yang jujur sampai katalog resmi tersedia. */
const DESKRIPSI_MENYUSUL =
  "Detail produk, bahan, ukuran, dan pilihan varian akan diperbarui setelah katalog resmi merchandise BKUI 2026 diumumkan.";

export const PRODUK: readonly Produk[] = DAFTAR_DASAR.map((p) => ({
  harga: null,
  stok: null,
  deskripsi: DESKRIPSI_MENYUSUL,
  jumlahFoto: 4,
  ...p,
}));

/** Produk yang lolos penyaring. Tanpa kategori terpilih = tampilkan semua. */
export function produkUntuk(terpilih: readonly Kategori[]): readonly Produk[] {
  if (terpilih.length === 0) return PRODUK;
  return PRODUK.filter((p) => terpilih.includes(p.kategori));
}
