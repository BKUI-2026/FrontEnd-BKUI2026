import type { ItemKatalog } from "@/lib/katalog";

/**
 * Katalog dari komposisi Figma. `id` dipakai sebagai SKU: harga dan stok diambil
 * dari tabel `merch_products` di BE dengan SKU yang sama (lihat `lib/merch.ts`).
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
  { id: "M1", nama: "Apparel BKUI", kategori: "Apparel" },
  { id: "M2", nama: "Aksesori BKUI", kategori: "Accessories" },
  { id: "M3", nama: "Paket BKUI", kategori: "Bundles" },
  { id: "M4", nama: "Memorabilia BKUI", kategori: "Event Memorabilia" },
  { id: "M5", nama: "Apparel Makara", kategori: "Apparel" },
  { id: "M6", nama: "Aksesori Makara", kategori: "Accessories" },
  { id: "M7", nama: "Apparel Eksklusif", kategori: "Apparel" },
  { id: "M8", nama: "Paket Makara", kategori: "Bundles" },
  { id: "M9", nama: "Suvenir BKUI", kategori: "Event Memorabilia" },
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
export function produkUntuk(daftar: readonly Produk[], terpilih: readonly Kategori[]): readonly Produk[] {
  if (terpilih.length === 0) return daftar;
  return daftar.filter((p) => terpilih.includes(p.kategori));
}
