/**
 * Konten halaman Explore UI.
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
 * KONTEN RESMI DARI TIM:
 *   - deskripsi 14 fakultas + Program Pendidikan Vokasi
 *
 * PLACEHOLDER (WAJIB diganti konten resmi sebelum live):
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
  /** Chip hijau berisi nama program studi; kosong jika konten resmi belum ada. */
  prodi: readonly string[];
  /** Sorotan tambahan; null jika konten resmi belum ada. */
  sorotanJudul: string | null;
  sorotanIsi: string | null;
  /**
   * Jumlah slide di carousel foto. Fotonya sendiri belum ada — di Figma pun
   * masih bingkai kosong — jadi yang disimpan baru cacahnya, biar titik
   * navigasinya tetap sesuai desain (4 titik).
   */
  jumlahFoto: number;
}

/**
 * Hanya bagian yang datanya sudah pasti. Data yang belum tersedia dibiarkan
 * kosong, bukan ditampilkan sebagai placeholder yang bisa disangka konten.
 */
type FakultasDasar = Pick<Fakultas, "id" | "nama" | "rumpun" | "ringkasan"> &
  Partial<Fakultas>;

const DAFTAR_DASAR: readonly FakultasDasar[] = [
  {
    id: "fk",
    nama: "Fakultas Kedokteran",
    rumpun: "Saintek",
    ringkasan:
      "FKUI merupakan fakultas tertua dan pertama di UI yang berdiri sejak tahun 1950. FKUI menjadi pusat pendidikan kedokteran terkemuka di Indonesia serta mencetak dokter umum maupun spesialis yang tersebar di seluruh penjuru negeri.",
  },
  {
    id: "fkg",
    nama: "Fakultas Kedokteran Gigi",
    rumpun: "Saintek",
    ringkasan:
      "Fakultas Kedokteran Gigi Universitas Indonesia merupakan fakultas kedokteran gigi pertama dan terbaik di Indonesia yang berdiri sejak tahun 1960.",
  },
  {
    id: "fmipa",
    nama: "Fakultas Matematika dan Ilmu Pengetahuan Alam",
    rumpun: "Saintek",
    ringkasan:
      "Fakultas Matematika dan Ilmu Pengetahuan Alam Universitas Indonesia, atau disingkat FMIPA UI, adalah salah satu fakultas pada Rumpun Ilmu Sains dan Teknologi. Fakultas ini berfokus pada bidang matematika dan ilmu pengetahuan alam.",
  },
  {
    id: "ft",
    nama: "Fakultas Teknik",
    rumpun: "Saintek",
    ringkasan:
      "FTUI menawarkan berbagai program studi teknik, mulai dari teknik sipil, teknik mesin, teknik elektro, teknik kimia, teknik industri, hingga arsitektur. Fakultas ini mencetak insinyur-insinyur andal yang terlibat langsung dalam pembangunan infrastruktur di Indonesia.",
  },
  {
    id: "fasilkom",
    nama: "Fakultas Ilmu Komputer",
    rumpun: "Saintek",
    ringkasan:
      "Fakultas Ilmu Komputer Universitas Indonesia (Fasilkom UI) adalah salah satu fakultas ilmu komputer terbaik di Indonesia yang berfokus pada bidang ilmu komputer dan sistem informasi.",
    prodi: ["Sistem Informasi", "Kecerdasan Artifisial", "Ilmu Komputer"],
  },
  {
    id: "fkm",
    nama: "Fakultas Kesehatan Masyarakat",
    rumpun: "Saintek",
    ringkasan:
      "Fakultas Kesehatan Masyarakat Universitas Indonesia (FKM UI) merupakan bagian dari Rumpun Ilmu Kesehatan UI (RIK UI). Fakultas ini bertujuan mencetak ahli dan profesional kesehatan masyarakat yang dapat berkontribusi dalam meningkatkan derajat kesehatan masyarakat.",
  },
  {
    id: "fik",
    nama: "Fakultas Ilmu Keperawatan",
    rumpun: "Saintek",
    ringkasan:
      "Fakultas Ilmu Keperawatan Universitas Indonesia (FIK UI) merupakan Fakultas Ilmu Keperawatan pertama dan terbaik di Indonesia. Saat ini FIK UI berfungsi sebagai pusat pendidikan keperawatan dan berperan sebagai pembina beberapa institusi pendidikan tinggi keperawatan di Indonesia.",
  },
  {
    id: "ff",
    nama: "Fakultas Farmasi",
    rumpun: "Saintek",
    ringkasan:
      "Fakultas Farmasi mempelajari ilmu pembuatan obat dari bahan alam maupun sintetis yang cocok dan nyaman untuk didistribusikan serta digunakan dalam pencegahan dan pengobatan penyakit.",
  },
  {
    id: "fh",
    nama: "Fakultas Hukum",
    rumpun: "Soshum",
    ringkasan:
      "FH UI merupakan fakultas hukum tertua di Indonesia. Fakultas ini menghasilkan praktisi hukum, hakim, jaksa, pengacara, notaris, hingga akademisi hukum yang tersebar di berbagai institusi penegak hukum dan lembaga negara.",
  },
  {
    id: "feb",
    nama: "Fakultas Ekonomi dan Bisnis",
    rumpun: "Soshum",
    ringkasan:
      "Fakultas Ekonomi dan Bisnis Universitas Indonesia (FEB UI) adalah salah satu fakultas ekonomi paling bergengsi di Indonesia yang berfokus pada kajian ekonomi, akuntansi, manajemen, dan bisnis.",
  },
  {
    id: "fib",
    nama: "Fakultas Ilmu Pengetahuan Budaya",
    rumpun: "Soshum",
    ringkasan:
      "Fakultas Ilmu Pengetahuan Budaya Universitas Indonesia (FIB UI) adalah fakultas di rumpun sosial dan humaniora yang berfokus pada kajian kebudayaan, sastra, sejarah, dan filsafat.",
  },
  {
    id: "fpsi",
    nama: "Fakultas Psikologi",
    rumpun: "Soshum",
    ringkasan:
      "Fakultas Psikologi UI adalah Fakultas Psikologi yang pertama kali berdiri di Indonesia dan menjadi acuan pengembangan fakultas-fakultas psikologi lain di Indonesia. Fakultas ini menjadi pusat unggulan dalam pendidikan, pengembangan, dan penerapan psikologi yang berorientasi lintas budaya, perkotaan, dan ulayat (indigenous).",
  },
  {
    id: "fisip",
    nama: "Fakultas Ilmu Sosial dan Ilmu Politik",
    rumpun: "Soshum",
    ringkasan:
      "Fakultas Ilmu Sosial dan Ilmu Politik Universitas Indonesia (FISIP UI) didirikan pada tahun 1968 dan berfokus pada kajian dinamika masyarakat, negara, dan hubungan internasional. Beberapa jurusannya adalah sosiologi, hubungan internasional, kriminologi, dan ilmu komunikasi.",
  },
  {
    id: "fia",
    nama: "Fakultas Ilmu Administrasi",
    rumpun: "Soshum",
    ringkasan:
      "Fakultas Ilmu Administrasi Universitas Indonesia, atau disingkat FIA UI, adalah fakultas dalam Rumpun Ilmu Sosial dan Humaniora yang dibentuk pada tahun 2015. Sebelumnya, FIA UI merupakan Departemen Ilmu Administrasi yang bernaung di bawah FISIP UI.",
  },
  {
    id: "vokasi",
    nama: "Program Pendidikan Vokasi",
    rumpun: "Vokasi",
    ringkasan:
      "Program Pendidikan Vokasi UI adalah perguruan tinggi yang bertujuan mempersiapkan tenaga yang dapat menerapkan keahlian dan keterampilan di bidang tertentu, siap kerja, dan mampu bersaing secara global.",
  },
];

export const FAKULTAS: readonly Fakultas[] = DAFTAR_DASAR.map((f) => ({
  prodi: [],
  sorotanJudul: null,
  sorotanIsi: null,
  jumlahFoto: 4,
  ...f,
}));

/** Fakultas yang lolos filter. "Semua" mengembalikan daftar apa adanya. */
export function fakultasUntuk(filter: FilterRumpun): readonly Fakultas[] {
  if (filter === "Semua") return FAKULTAS;
  return FAKULTAS.filter((f) => f.rumpun === filter);
}
