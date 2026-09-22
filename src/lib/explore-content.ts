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
 *   - nama 14 fakultas + Sekolah Vokasi UI
 *   - pengelompokan rumpunnya (Saintek / Soshum / Vokasi)
 *   - daftar program studi sarjana tiap fakultas — mengikuti brosur resmi
 *     penerimaan UI; Kecerdasan Artifisial Fasilkom mengikuti desain BKUI 2026
 *   - daftar program diploma/sarjana terapan Vokasi — mengikuti laman resmi
 *     Sekolah Vokasi UI
 *
 * KONTEN RESMI DARI TIM:
 *   - deskripsi 14 fakultas + Sekolah Vokasi
 *
 * Foto dan logo di bawah berasal dari folder aset resmi tim. Fakultas yang
 * folder fotonya belum lengkap hanya menampilkan berkas yang tersedia.
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
  /** Logo fakultas dari aset Drive yang sudah disalin ke `public/`. */
  logoSrc: string | null;
  /** Foto suasana fakultas yang tampil setelah logo di carousel. */
  fotoSrc: readonly string[];
  /** Sorotan tambahan; null jika konten resmi belum ada. */
  sorotanJudul: string | null;
  sorotanIsi: string | null;
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
    logoSrc: "/image/fakultas-logo/fk-nobg.png",
    fotoSrc: ["/image/fakultas/fk1.jpg", "/image/fakultas/fk2.jpg", "/image/fakultas/fk3.jpeg"],
    prodi: ["Pendidikan Dokter"],
  },
  {
    id: "fkg",
    nama: "Fakultas Kedokteran Gigi",
    rumpun: "Saintek",
    ringkasan:
      "Fakultas Kedokteran Gigi Universitas Indonesia merupakan fakultas kedokteran gigi pertama dan terbaik di Indonesia yang berdiri sejak tahun 1960.",
    logoSrc: "/image/fakultas-logo/fkg-nobg-fix.png",
    fotoSrc: ["/image/fakultas/fkg1.jpg", "/image/fakultas/fkg2.webp", "/image/fakultas/fkg3.jpg"],
    prodi: ["Pendidikan Dokter Gigi"],
  },
  {
    id: "fmipa",
    nama: "Fakultas Matematika dan Ilmu Pengetahuan Alam",
    rumpun: "Saintek",
    ringkasan:
      "Fakultas Matematika dan Ilmu Pengetahuan Alam Universitas Indonesia, atau disingkat FMIPA UI, adalah salah satu fakultas pada Rumpun Ilmu Sains dan Teknologi. Fakultas ini berfokus pada bidang matematika dan ilmu pengetahuan alam.",
    logoSrc: "/image/fakultas-logo/mipa-nobg.png",
    fotoSrc: ["/image/fakultas/mipa1.jpg", "/image/fakultas/mipa2.jpg"],
    prodi: [
      "Matematika",
      "Kimia",
      "Fisika",
      "Biologi",
      "Geografi",
      "Geofisika",
      "Geologi",
      "Statistika",
      "Aktuaria",
    ],
  },
  {
    id: "ft",
    nama: "Fakultas Teknik",
    rumpun: "Saintek",
    ringkasan:
      "FTUI menawarkan berbagai program studi teknik, mulai dari teknik sipil, teknik mesin, teknik elektro, teknik kimia, teknik industri, hingga arsitektur. Fakultas ini mencetak insinyur-insinyur andal yang terlibat langsung dalam pembangunan infrastruktur di Indonesia.",
    logoSrc: "/image/fakultas-logo/ft-nobg.png",
    fotoSrc: ["/image/fakultas/ft1.jpg", "/image/fakultas/ft2.jpg", "/image/fakultas/ft3.jpg"],
    prodi: [
      "Teknik Sipil",
      "Teknik Mesin",
      "Teknik Elektro",
      "Teknik Metalurgi dan Material",
      "Arsitektur",
      "Teknik Kimia",
      "Teknik Industri",
      "Teknik Perkapalan",
      "Teknik Lingkungan",
      "Teknik Komputer",
      "Arsitektur Interior",
      "Teknik Bioproses",
      "Teknik Biomedik",
    ],
  },
  {
    id: "fasilkom",
    nama: "Fakultas Ilmu Komputer",
    rumpun: "Saintek",
    ringkasan:
      "Fakultas Ilmu Komputer Universitas Indonesia (Fasilkom UI) adalah salah satu fakultas ilmu komputer terbaik di Indonesia yang berfokus pada bidang ilmu komputer dan sistem informasi.",
    logoSrc: "/image/fakultas-logo/fasilkom.png",
    fotoSrc: ["/image/fakultas/fasilkom1.webp", "/image/fakultas/fasilkom2.jpg", "/image/fakultas/fasilkom3.jpg"],
    prodi: ["Sistem Informasi", "Kecerdasan Artifisial", "Ilmu Komputer"],
  },
  {
    id: "fkm",
    nama: "Fakultas Kesehatan Masyarakat",
    rumpun: "Saintek",
    ringkasan:
      "Fakultas Kesehatan Masyarakat Universitas Indonesia (FKM UI) merupakan bagian dari Rumpun Ilmu Kesehatan UI (RIK UI). Fakultas ini bertujuan mencetak ahli dan profesional kesehatan masyarakat yang dapat berkontribusi dalam meningkatkan derajat kesehatan masyarakat.",
    logoSrc: "/image/fakultas-logo/fkm-nobg.png",
    fotoSrc: ["/image/fakultas/fkm1.jpg"],
    prodi: [
      "Kesehatan Masyarakat",
      "Gizi",
      "Kesehatan Lingkungan",
      "Keselamatan dan Kesehatan Kerja",
    ],
  },
  {
    id: "fik",
    nama: "Fakultas Ilmu Keperawatan",
    rumpun: "Saintek",
    ringkasan:
      "Fakultas Ilmu Keperawatan Universitas Indonesia (FIK UI) merupakan Fakultas Ilmu Keperawatan pertama dan terbaik di Indonesia. Saat ini FIK UI berfungsi sebagai pusat pendidikan keperawatan dan berperan sebagai pembina beberapa institusi pendidikan tinggi keperawatan di Indonesia.",
    logoSrc: "/image/fakultas-logo/fik.png",
    fotoSrc: ["/image/fakultas/fik1.jpeg", "/image/fakultas/fik2.jpg", "/image/fakultas/fik3.jpg"],
    prodi: ["Ilmu Keperawatan"],
  },
  {
    id: "ff",
    nama: "Fakultas Farmasi",
    rumpun: "Saintek",
    ringkasan:
      "Fakultas Farmasi mempelajari ilmu pembuatan obat dari bahan alam maupun sintetis yang cocok dan nyaman untuk didistribusikan serta digunakan dalam pencegahan dan pengobatan penyakit.",
    logoSrc: "/image/fakultas-logo/ff-nobg.png",
    fotoSrc: ["/image/fakultas/ff1.jpg", "/image/fakultas/ff2.jpg"],
    prodi: ["Farmasi"],
  },
  {
    id: "fh",
    nama: "Fakultas Hukum",
    rumpun: "Soshum",
    ringkasan:
      "FH UI merupakan fakultas hukum tertua di Indonesia. Fakultas ini menghasilkan praktisi hukum, hakim, jaksa, pengacara, notaris, hingga akademisi hukum yang tersebar di berbagai institusi penegak hukum dan lembaga negara.",
    logoSrc: "/image/fakultas-logo/fh-nobg.png",
    fotoSrc: ["/image/fakultas/fh1.jpg"],
    prodi: ["Ilmu Hukum"],
  },
  {
    id: "feb",
    nama: "Fakultas Ekonomi dan Bisnis",
    rumpun: "Soshum",
    ringkasan:
      "Fakultas Ekonomi dan Bisnis Universitas Indonesia (FEB UI) adalah salah satu fakultas ekonomi paling bergengsi di Indonesia yang berfokus pada kajian ekonomi, akuntansi, manajemen, dan bisnis.",
    logoSrc: "/image/fakultas-logo/feb-nobg.png",
    fotoSrc: ["/image/fakultas/feb1.jpg", "/image/fakultas/feb2.jpg", "/image/fakultas/feb3.jpg"],
    prodi: [
      "Ilmu Ekonomi",
      "Manajemen",
      "Akuntansi",
      "Ilmu Ekonomi Islam",
      "Bisnis Islam",
    ],
  },
  {
    id: "fib",
    nama: "Fakultas Ilmu Pengetahuan Budaya",
    rumpun: "Soshum",
    ringkasan:
      "Fakultas Ilmu Pengetahuan Budaya Universitas Indonesia (FIB UI) adalah fakultas di rumpun sosial dan humaniora yang berfokus pada kajian kebudayaan, sastra, sejarah, dan filsafat.",
    logoSrc: "/image/fakultas-logo/fib-nobg.png",
    fotoSrc: ["/image/fakultas/fib1.jpg", "/image/fakultas/fib2.jpg", "/image/fakultas/fib3.jpg"],
    prodi: [
      "Bahasa dan Kebudayaan Korea",
      "Sastra Belanda",
      "Arkeologi",
      "Ilmu Filsafat",
      "Ilmu Perpustakaan",
      "Ilmu Sejarah",
      "Sastra Arab",
      "Sastra Cina",
      "Sastra Daerah/Jawa",
      "Sastra Indonesia",
      "Sastra Inggris",
      "Sastra Jepang",
      "Sastra Jerman",
      "Sastra Perancis",
      "Sastra Rusia",
    ],
  },
  {
    id: "fpsi",
    nama: "Fakultas Psikologi",
    rumpun: "Soshum",
    ringkasan:
      "Fakultas Psikologi UI adalah Fakultas Psikologi yang pertama kali berdiri di Indonesia dan menjadi acuan pengembangan fakultas-fakultas psikologi lain di Indonesia. Fakultas ini menjadi pusat unggulan dalam pendidikan, pengembangan, dan penerapan psikologi yang berorientasi lintas budaya, perkotaan, dan ulayat (indigenous).",
    logoSrc: "/image/fakultas-logo/fpsi.png",
    fotoSrc: ["/image/fakultas/psiko1.jpg", "/image/fakultas/psiko2.jpg", "/image/fakultas/psiko3.webp"],
    prodi: ["Psikologi"],
  },
  {
    id: "fisip",
    nama: "Fakultas Ilmu Sosial dan Ilmu Politik",
    rumpun: "Soshum",
    ringkasan:
      "Fakultas Ilmu Sosial dan Ilmu Politik Universitas Indonesia (FISIP UI) didirikan pada tahun 1968 dan berfokus pada kajian dinamika masyarakat, negara, dan hubungan internasional. Beberapa jurusannya adalah sosiologi, hubungan internasional, kriminologi, dan ilmu komunikasi.",
    logoSrc: "/image/fakultas-logo/fisip-nobg.png",
    fotoSrc: ["/image/fakultas/fisip1.jpg", "/image/fakultas/fisip2.png", "/image/fakultas/fisip3.jpg"],
    prodi: [
      "Ilmu Komunikasi",
      "Ilmu Politik",
      "Sosiologi",
      "Antropologi Sosial",
      "Ilmu Hubungan Internasional",
      "Ilmu Kesejahteraan Sosial",
      "Kriminologi",
    ],
  },
  {
    id: "fia",
    nama: "Fakultas Ilmu Administrasi",
    rumpun: "Soshum",
    ringkasan:
      "Fakultas Ilmu Administrasi Universitas Indonesia, atau disingkat FIA UI, adalah fakultas dalam Rumpun Ilmu Sosial dan Humaniora yang dibentuk pada tahun 2015. Sebelumnya, FIA UI merupakan Departemen Ilmu Administrasi yang bernaung di bawah FISIP UI.",
    logoSrc: "/image/fakultas-logo/fia-nobg.png",
    fotoSrc: [],
    prodi: [
      "Ilmu Administrasi Niaga",
      "Ilmu Administrasi Negara",
      "Ilmu Administrasi Fiskal",
    ],
  },
  {
    id: "vokasi",
    nama: "Sekolah Vokasi",
    rumpun: "Vokasi",
    ringkasan:
      "Sekolah Vokasi UI adalah perguruan tinggi yang bertujuan mempersiapkan tenaga yang dapat menerapkan keahlian dan keterampilan di bidang tertentu, siap kerja, dan mampu bersaing secara global.",
    logoSrc: "/image/fakultas-logo/vokasi.png",
    fotoSrc: ["/image/fakultas/voks1.jpg", "/image/fakultas/voks2.jpg", "/image/fakultas/voks3.webp"],
    prodi: [
      "Administrasi Rumah Sakit",
      "Akuntansi",
      "Hubungan Masyarakat",
      "Periklanan Kreatif",
      "Penyiaran Multimedia",
      "Administrasi Asuransi dan Aktuaria",
      "Administrasi Keuangan dan Perbankan",
      "Administrasi Perkantoran",
      "Administrasi Perpajakan",
      "Fisioterapi",
      "Terapi Okupasi",
      "Manajemen Rekod dan Arsip",
      "Bisnis Kreatif",
      "Produksi Media",
      "Manajemen Bisnis Pariwisata",
    ],
  },
];

export const FAKULTAS: readonly Fakultas[] = DAFTAR_DASAR.map((f) => ({
  prodi: [],
  logoSrc: null,
  fotoSrc: [],
  sorotanJudul: null,
  sorotanIsi: null,
  ...f,
}));

/** Fakultas yang lolos filter. "Semua" mengembalikan daftar apa adanya. */
export function fakultasUntuk(filter: FilterRumpun): readonly Fakultas[] {
  if (filter === "Semua") return FAKULTAS;
  return FAKULTAS.filter((f) => f.rumpun === filter);
}
