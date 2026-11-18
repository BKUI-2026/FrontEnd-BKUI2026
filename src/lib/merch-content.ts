import type { ItemKatalog } from "@/lib/katalog";

/**
 * Katalog merchandise BKUI 2026, disalin dari e-catalog panitia (16 Nov 2026).
 *
 * Harga dan stok sebenarnya dibaca dari BE (`merch_products`). Harga di sini
 * hanya cadangan kalau BE belum bisa dihubungi. SKU tiap varian dirangkai dari
 * `skuDasar` + kode tiap pilihan, mis. BK26-TSHIRT-PNK-L, dan harus sama
 * persis dengan `prisma/seed-merch-katalog.sql` di repo BE.
 */

export interface OpsiVarian {
  kode: string;
  label: string;
  /** Indeks foto di `foto` yang menampilkan pilihan ini. */
  foto?: number;
}

export interface GrupVarian {
  nama: "Warna" | "Ukuran" | "Desain";
  opsi: readonly OpsiVarian[];
}

export interface ProdukMerch extends ItemKatalog {
  skuDasar: string;
  varian: readonly GrupVarian[];
}

const F = (nama: string) => `/image/merch/produk/${nama}.webp`;
const UKURAN: GrupVarian = {
  nama: "Ukuran",
  opsi: ["S", "M", "L", "XL"].map((u) => ({ kode: u, label: u })),
};

export const PRODUK: readonly ProdukMerch[] = [
  {
    id: "totebag",
    skuDasar: "BK26-TOTEBAG",
    nama: "Totebag",
    harga: 45000,
    stok: null,
    deskripsi: "Totebag kanvas BKUI dengan dua pilihan desain sablon.",
    foto: [F("totebag/utama"), F("totebag/bedah-kampus"), F("totebag/veritas")],
    jumlahFoto: 3,
    varian: [{ nama: "Desain", opsi: [{ kode: "BK", label: "Bedah Kampus UI", foto: 1 }, { kode: "VPI", label: "Veritas Probitas Iustitia", foto: 2 }] }],
  },
  {
    id: "tshirt",
    skuDasar: "BK26-TSHIRT",
    nama: "T-Shirt",
    harga: 75000,
    stok: null,
    deskripsi: "Kaos BKUI 2026 dengan sablon depan dan belakang. Ukuran (cm, dada × panjang × lengan): S 52×70×22, M 54×72×23, L 56×74×24, XL 58×75×25.",
    foto: [
      F("tshirt/utama"), F("tshirt/cream-depan"), F("tshirt/cream-belakang"), F("tshirt/pink-depan"), F("tshirt/pink-belakang"),
      F("tshirt/hitam-depan"), F("tshirt/hitam-belakang"), F("tshirt/biru-depan"), F("tshirt/biru-belakang"), F("tshirt/ukuran"),
    ],
    jumlahFoto: 10,
    varian: [
      { nama: "Warna", opsi: [{ kode: "CRM", label: "Cream", foto: 1 }, { kode: "PNK", label: "Pink", foto: 3 }, { kode: "HTM", label: "Hitam", foto: 5 }, { kode: "BRU", label: "Biru", foto: 7 }] },
      UKURAN,
    ],
  },
  {
    id: "kipas",
    skuDasar: "BK26-KIPAS",
    nama: "Kipas",
    harga: 5000,
    stok: null,
    deskripsi: "Kipas tangan BKUI 2026, desain maskot di depan dan logo BKUI di belakang.",
    foto: [F("kipas/utama"), F("kipas/depan"), F("kipas/belakang")],
    jumlahFoto: 3,
    varian: [],
  },
  {
    id: "topi",
    skuDasar: "BK26-TOPI",
    nama: "Topi",
    harga: 35000,
    stok: null,
    deskripsi: "Topi baseball BKUI dengan empat pilihan desain.",
    foto: [F("topi/utama"), F("topi/hitam"), F("topi/pink"), F("topi/putih-a"), F("topi/putih-b")],
    jumlahFoto: 5,
    varian: [{
      nama: "Desain",
      opsi: [
        { kode: "HTM", label: "Hitam · UI", foto: 1 },
        { kode: "PNK", label: "Pink · BK UI 2026", foto: 2 },
        { kode: "PTHA", label: "Putih · Logo hitam", foto: 3 },
        { kode: "PTHB", label: "Putih · Logo oranye", foto: 4 },
      ],
    }],
  },
  {
    id: "sticker",
    skuDasar: "BK26-STICKER",
    nama: "Sticker",
    harga: 30000,
    stok: null,
    deskripsi: "Satu lembar sticker BKUI 2026 berisi maskot, bus kuning, rektorat, dan logo BKUI.",
    foto: [F("sticker/utama")],
    jumlahFoto: 1,
    varian: [],
  },
  {
    id: "pin",
    skuDasar: "BK26-PIN",
    nama: "Pin",
    harga: 10000,
    stok: null,
    deskripsi: "Pin peniti BKUI dengan tiga pilihan desain.",
    foto: [F("pin/utama"), F("pin/ui-est-1849"), F("pin/bedah-kampus"), F("pin/makara")],
    jumlahFoto: 4,
    varian: [{
      nama: "Desain",
      opsi: [
        { kode: "EMS", label: "Universitas Indonesia (emas)", foto: 1 },
        { kode: "BK", label: "Bedah Kampus", foto: 2 },
        { kode: "HJU", label: "Universitas Indonesia (hijau)", foto: 3 },
      ],
    }],
  },
  {
    id: "keychain",
    skuDasar: "BK26-KEYCHAIN",
    nama: "Keychain",
    harga: 20000,
    stok: null,
    deskripsi: "Gantungan kunci akrilik BKUI dengan tiga pilihan desain.",
    foto: [F("keychain/utama"), F("keychain/rektorat"), F("keychain/maskot"), F("keychain/ui-1849")],
    jumlahFoto: 4,
    varian: [{ nama: "Desain", opsi: [{ kode: "RKT", label: "Rektorat", foto: 1 }, { kode: "MSK", label: "Maskot", foto: 2 }, { kode: "UI49", label: "UI 1849", foto: 3 }] }],
  },
  {
    id: "lanyard",
    skuDasar: "BK26-LANYARD",
    nama: "Lanyard",
    harga: 20000,
    stok: null,
    deskripsi: "Lanyard Bedah Kampus Universitas Indonesia dengan pengait besi.",
    foto: [F("lanyard/utama"), F("lanyard/oranye"), F("lanyard/biru"), F("lanyard/pink")],
    jumlahFoto: 4,
    varian: [{ nama: "Warna", opsi: [{ kode: "ORG", label: "Oranye", foto: 1 }, { kode: "BRU", label: "Biru", foto: 2 }, { kode: "PNK", label: "Pink", foto: 3 }] }],
  },
];

export interface VarianTerpilih {
  produk: ProdukMerch;
  sku: string;
  /** Label varian, mis. "Pink · L". Kosong untuk produk tanpa varian. */
  label: string;
}

function kombinasi(grup: readonly GrupVarian[]): OpsiVarian[][] {
  return grup.reduce<OpsiVarian[][]>((hasil, g) => hasil.flatMap((awal) => g.opsi.map((o) => [...awal, o])), [[]]);
}

/** Semua SKU katalog beserta produk dan labelnya. */
export const SEMUA_VARIAN: ReadonlyMap<string, VarianTerpilih> = new Map(
  PRODUK.flatMap((produk) =>
    kombinasi(produk.varian).map((pilihan) => {
      const sku = [produk.skuDasar, ...pilihan.map((o) => o.kode)].join("-");
      return [sku, { produk, sku, label: pilihan.map((o) => o.label).join(" · ") }] as const;
    }),
  ),
);

export function skuDari(produk: ProdukMerch, pilihan: readonly (string | undefined)[]): string | null {
  if (pilihan.length !== produk.varian.length || pilihan.some((p) => !p)) return null;
  return [produk.skuDasar, ...pilihan].join("-");
}
