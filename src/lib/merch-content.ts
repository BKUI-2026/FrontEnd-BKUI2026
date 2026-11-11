import type { ItemKatalog } from "@/lib/katalog";

/**
 * Katalog sementara dari komposisi Figma. Foto, harga, dan stok resmi menunggu
 * tim. Produk tetap bisa dimasukkan ke keranjang pratinjau; checkout diblokir.
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
  { id: "m1", nama: "Apparel BKUI", kategori: "Apparel" },
  { id: "m2", nama: "Aksesori BKUI", kategori: "Accessories" },
  { id: "m3", nama: "Paket BKUI", kategori: "Bundles" },
  { id: "m4", nama: "Memorabilia BKUI", kategori: "Event Memorabilia" },
  { id: "m5", nama: "Apparel Makara", kategori: "Apparel" },
  { id: "m6", nama: "Aksesori Makara", kategori: "Accessories" },
  { id: "m7", nama: "Apparel Eksklusif", kategori: "Apparel" },
  { id: "m8", nama: "Paket Makara", kategori: "Bundles" },
  { id: "m9", nama: "Suvenir BKUI", kategori: "Event Memorabilia" },
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
