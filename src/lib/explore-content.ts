/**
 * Konten halaman Explore UI — SEMUANYA MASIH DUMMY.
 *
 * Sumber aslinya entity `Content` di BE dan endpoint-nya belum ada, jadi
 * jangan karang shape response-nya (README boundary nomor 4). File ini
 * sengaja dipisah dari komponen supaya waktu endpoint-nya siap cukup satu
 * tempat yang diganti — polanya sama persis dengan `landing-content.ts`.
 *
 * ---------------------------------------------------------------------------
 * Apa yang nyata dan apa yang belum
 * ---------------------------------------------------------------------------
 * NYATA (fakta publik, aman dipakai):
 *   - nama 14 fakultas + Program Pendidikan Vokasi UI
 *   - pengelompokan rumpunnya (Saintek / Soshum / Vokasi)
 *   - tiga program studi Fakultas Ilmu Komputer — diambil dari Figma, jadi
 *     itu isian desainer, bukan karangan saya
 *
 * PLACEHOLDER (WAJIB diganti konten resmi sebelum live):
 *   - seluruh deskripsi (masih Lorem ipsum, persis seperti di Figma)
 *   - daftar program studi selain Fasilkom
 *   - foto fakultas (di Figma pun masih bingkai kosong)
 *
 * Daftar prodi TIDAK saya isi sendiri untuk fakultas lain: salah menulis
 * program studi di situs resmi universitas jauh lebih merugikan daripada
 * menampilkan placeholder yang jelas terbaca sebagai placeholder.
 */

/**
 * Rumpun keilmuan — dipakai tab filter di atas daftar fakultas.
 *
 * "Semua" bukan rumpun, melainkan kondisi "tidak memfilter", jadi tipenya
 * dipisah supaya tidak ada fakultas yang bisa salah diberi rumpun "Semua".
 */
export type Rumpun = "Saintek" | "Soshum" | "Vokasi";
export type FilterRumpun = "Semua" | Rumpun;

export const FILTER_RUMPUN: readonly FilterRumpun[] = [
  "Semua",
  "Saintek",
  "Soshum",
  "Vokasi",
] as const;

export interface Fakultas {
  /** Dipakai sebagai key React sekaligus anchor `#id` kalau nanti dibutuhkan. */
  id: string;
  nama: string;
  rumpun: Rumpun;
  /** Paragraf pembuka di bagian atas kartu. */
  ringkasan: string;
  /** Chip hijau berisi nama program studi. */
  prodi: readonly string[];
  /** Judul kecil di bawah chip. */
  sorotanJudul: string;
  sorotanIsi: string;
  /**
   * Jumlah slide di carousel foto. Fotonya sendiri belum ada — di Figma pun
   * masih bingkai kosong — jadi yang disimpan baru cacahnya, biar titik
   * navigasinya tetap sesuai desain (4 titik).
   */
  jumlahFoto: number;
}

const LOREM_PENDEK =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const LOREM_PANJANG =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

/** Chip program studi sementara, untuk fakultas yang datanya belum diberikan. */
const PRODI_MENYUSUL = ["Program Studi 1", "Program Studi 2", "Program Studi 3"] as const;

/**
 * Hanya bagian yang datanya sudah pasti. Sisanya diisi placeholder seragam
 * lewat `map` di bawah, jadi kalau nanti konten resminya turun cukup tambahkan
 * field-nya di sini — tidak perlu menyalin ulang lima field yang sama.
 */
type FakultasDasar = Pick<Fakultas, "id" | "nama" | "rumpun"> & Partial<Fakultas>;

const DAFTAR_DASAR: readonly FakultasDasar[] = [
  { id: "fk", nama: "Fakultas Kedokteran", rumpun: "Saintek" },
  { id: "fkg", nama: "Fakultas Kedokteran Gigi", rumpun: "Saintek" },
  { id: "fmipa", nama: "Fakultas Matematika dan Ilmu Pengetahuan Alam", rumpun: "Saintek" },
  { id: "ft", nama: "Fakultas Teknik", rumpun: "Saintek" },
  {
    id: "fasilkom",
    nama: "Fakultas Ilmu Komputer",
    rumpun: "Saintek",
    // Satu-satunya daftar prodi yang sudah diisi desainer di Figma.
    prodi: ["Sistem Informasi", "Kecerdasan Artifisial", "Ilmu Komputer"],
  },
  { id: "fkm", nama: "Fakultas Kesehatan Masyarakat", rumpun: "Saintek" },
  { id: "fik", nama: "Fakultas Ilmu Keperawatan", rumpun: "Saintek" },
  { id: "ff", nama: "Fakultas Farmasi", rumpun: "Saintek" },
  { id: "fh", nama: "Fakultas Hukum", rumpun: "Soshum" },
  { id: "feb", nama: "Fakultas Ekonomi dan Bisnis", rumpun: "Soshum" },
  { id: "fib", nama: "Fakultas Ilmu Pengetahuan Budaya", rumpun: "Soshum" },
  { id: "fpsi", nama: "Fakultas Psikologi", rumpun: "Soshum" },
  { id: "fisip", nama: "Fakultas Ilmu Sosial dan Ilmu Politik", rumpun: "Soshum" },
  { id: "fia", nama: "Fakultas Ilmu Administrasi", rumpun: "Soshum" },
  { id: "vokasi", nama: "Program Pendidikan Vokasi", rumpun: "Vokasi" },
];

export const FAKULTAS: readonly Fakultas[] = DAFTAR_DASAR.map((f) => ({
  ringkasan: LOREM_PENDEK,
  prodi: PRODI_MENYUSUL,
  sorotanJudul: "Lorem ipsum dolor sit amet",
  sorotanIsi: LOREM_PANJANG,
  jumlahFoto: 4,
  ...f,
}));

/** Fakultas yang lolos filter. "Semua" mengembalikan daftar apa adanya. */
export function fakultasUntuk(filter: FilterRumpun): readonly Fakultas[] {
  if (filter === "Semua") return FAKULTAS;
  return FAKULTAS.filter((f) => f.rumpun === filter);
}
