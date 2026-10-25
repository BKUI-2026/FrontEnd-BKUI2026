/**
 * Konten Landing Page — sebagian masih dummy.
 *
 * Tidak ada satupun data di file ini yang diambil dari API. Endpoint BE untuk
 * entity `Content` belum ada (per BE ARCH-0002 satu-satunya endpoint yang jalan
 * adalah `GET /api/v1/health`), dan sesuai README boundary nomor 4 bentuk
 * response-nya tidak boleh dikarang duluan.
 *
 * FAQ sudah memakai dokumen konten tim. Konten lainnya dikumpulkan di satu
 * file supaya:
 * 1. jelas mana yang masih dummy dan mana yang sudah asli — komponennya sendiri
 *    tidak menyimpan teks konten sama sekali;
 * 2. saat endpoint Content rilis, cukup file ini yang diganti jadi pemanggil
 *    API; komponen section tidak perlu disentuh.
 *
 * AGENTS.md bagian 7 menyebut URL video, pengumuman, dan timeline mentoring
 * WAJIB dinamis dari Admin — jadi jangan hardcode nilai aslinya di komponen.
 *
 * Konten yang belum diberikan tim ditulis sebagai pengumuman yang jujur dan
 * layak tampil, bukan teks acak atau klaim yang mengarang nama orang.
 */

/** Satu tokoh di section "Tokoh Inspirasi" (Speakers). */
export interface Tokoh {
  id: string;
  nama: string;
  keterangan: string;
  /** Foto narasumber yang diberikan tim; `null` hanya untuk konten tanpa foto. */
  foto: string | null;
}

/** Enam previous speakers dan foto dari dokumen tim "Prev speaker". */
export const DAFTAR_TOKOH: readonly Tokoh[] = [
  { id: "rossa", nama: "Rossa", keterangan: "Penyanyi", foto: "/image/landing/speakers/rossa.png" },
  { id: "jovial-da-lopez", nama: "Jovial Da Lopez", keterangan: "YouTuber, aktor, komedian", foto: "/image/landing/speakers/jovial-da-lopez.png" },
  { id: "sri-mulyani", nama: "Sri Mulyani", keterangan: "Mantan Menteri Keuangan", foto: "/image/landing/speakers/sri-mulyani.png" },
  { id: "najwa-shihab", nama: "Najwa Shihab", keterangan: "Jurnalis", foto: "/image/landing/speakers/najwa-shihab.png" },
  { id: "fathia-izzati", nama: "Fathia Izzati", keterangan: "Vokalis dan musisi", foto: "/image/landing/speakers/fathia-izzati.png" },
  { id: "shakira-amirah", nama: "Shakira Amirah", keterangan: "Dokter dan content creator", foto: "/image/landing/speakers/shakira-amirah.png" },
];

/** Satu tahap di section Timeline. */
export interface TahapTimeline {
  id: string;
  judul: string;
  /** Tanggal & lokasi. `null` → pil polos tanpa kartu tanggal di belakangnya. */
  detail: string | null;
}

/**
 * Empat tahap dengan rentang waktu terbaru yang diberikan tim BKUI.
 *
 * Ini satu-satunya bagian Landing Page yang isinya benar-benar berurutan, jadi
 * di UI-nya boleh ditandai sebagai urutan (nomor + `<ol>`).
 */
export const TAHAP_TIMELINE: readonly TahapTimeline[] = [
  { id: "roadshow", judul: "Roadshow", detail: "Agustus – Desember" },
  { id: "ambassador", judul: "Campus & Student Ambassador", detail: "September – Desember" },
  {
    id: "mentoring",
    judul: "Program Mentoring",
    detail: "September – Desember",
  },
  { id: "puncak", judul: "Puncak Acara BKUI 2026", detail: "Desember" },
] as const;

/** CASA dari folder foto dan nama resmi tim; kutipan masih menunggu. */
export interface Testimoni {
  id: string;
  nama: string;
  /** Sekolah atau program studi, sesuai nama file sumber. */
  asalSekolah: string;
  peran: "Campus Ambassador" | "Student Ambassador";
  /** null sampai kutipan asli diberikan oleh CASA. */
  isi: string | null;
  foto: string;
}

export const DAFTAR_TESTIMONI: readonly Testimoni[] = [
  {
    "id": "aurelya-batara-randa",
    "nama": "Aurelya Batara Randa",
    "asalSekolah": "Geografi’26",
    "peran": "Campus Ambassador",
    "isi": null,
    "foto": "/image/landing/casa/aurelya-batara-randa.webp"
  },
  {
    "id": "exsel-cornelio",
    "nama": "Exsel Cornelio",
    "asalSekolah": "Hubungan Masyarakat’26",
    "peran": "Campus Ambassador",
    "isi": null,
    "foto": "/image/landing/casa/exsel-cornelio.webp"
  },
  {
    "id": "hanna-awliya-lesmana-putri",
    "nama": "Hanna Awliya Lesmana Putri",
    "asalSekolah": "Periklanan Kreatif’26",
    "peran": "Campus Ambassador",
    "isi": null,
    "foto": "/image/landing/casa/hanna-awliya-lesmana-putri.webp"
  },
  {
    "id": "nayyara-azarine-farrashila",
    "nama": "Nayyara Azarine Farrashila",
    "asalSekolah": "Ilmu Hukum’25",
    "peran": "Campus Ambassador",
    "isi": null,
    "foto": "/image/landing/casa/nayyara-azarine-farrashila.webp"
  },
  {
    "id": "neysa-chandria-melisenda",
    "nama": "Neysa Chandria Melisenda",
    "asalSekolah": "Administrasi Perpajakan’26",
    "peran": "Campus Ambassador",
    "isi": null,
    "foto": "/image/landing/casa/neysa-chandria-melisenda.webp"
  },
  {
    "id": "zerlitha-syakilla-meydra",
    "nama": "Zerlitha Syakilla Meydra",
    "asalSekolah": "Ilmu Komunikasi’26",
    "peran": "Campus Ambassador",
    "isi": null,
    "foto": "/image/landing/casa/zerlitha-syakilla-meydra.webp"
  },
  {
    "id": "sandrin-alivia-syahri",
    "nama": "Sandrin Alivia Syahri",
    "asalSekolah": "Ilmu Keperawatan’25",
    "peran": "Campus Ambassador",
    "isi": null,
    "foto": "/image/landing/casa/sandrin-alivia-syahri.webp"
  },
  {
    "id": "abiyu-mahasika",
    "nama": "Abiyu Mahasika",
    "asalSekolah": "Teknik Metalurgi dan Material’25",
    "peran": "Campus Ambassador",
    "isi": null,
    "foto": "/image/landing/casa/abiyu-mahasika.webp"
  },
  {
    "id": "rafik-muhammad-adil",
    "nama": "Rafik Muhammad Adil",
    "asalSekolah": "SMA Negeri 1 Cianjur",
    "peran": "Student Ambassador",
    "isi": null,
    "foto": "/image/landing/casa/rafik-muhammad-adil.webp"
  },
  {
    "id": "fajrea-zaina-nafisha",
    "nama": "Fajrea Zaina Nafisha",
    "asalSekolah": "SMA Islam Al Azhar 22",
    "peran": "Student Ambassador",
    "isi": null,
    "foto": "/image/landing/casa/fajrea-zaina-nafisha.webp"
  },
  {
    "id": "ashlee-naveeja-mardiono",
    "nama": "Ashlee Naveeja Mardiono",
    "asalSekolah": "SMA Labschool Cibubur",
    "peran": "Student Ambassador",
    "isi": null,
    "foto": "/image/landing/casa/ashlee-naveeja-mardiono.webp"
  },
  {
    "id": "aqyla-zahya-ayufarista",
    "nama": "Aqyla Zahya Ayufarista",
    "asalSekolah": "SMK Negeri 2 Buduran Sidoarjo",
    "peran": "Student Ambassador",
    "isi": null,
    "foto": "/image/landing/casa/aqyla-zahya-ayufarista.webp"
  },
  {
    "id": "rizky-fairus-arisandi",
    "nama": "Rizky Fairus Arisandi",
    "asalSekolah": "SMA Negeri 1 Taman Sidoarjo",
    "peran": "Student Ambassador",
    "isi": null,
    "foto": "/image/landing/casa/rizky-fairus-arisandi.webp"
  },
  {
    "id": "ratu-adeline-fidelia-permata",
    "nama": "Ratu Adeline Fidelia Permata",
    "asalSekolah": "SMA Labschool Kebayoran",
    "peran": "Student Ambassador",
    "isi": null,
    "foto": "/image/landing/casa/ratu-adeline-fidelia-permata.webp"
  },
  {
    "id": "raisha-fathi-azzura-rasyid",
    "nama": "Raisha Fathi Azzura Rasyid",
    "asalSekolah": "SMA Negeri 2 Bandung",
    "peran": "Student Ambassador",
    "isi": null,
    "foto": "/image/landing/casa/raisha-fathi-azzura-rasyid.webp"
  },
  {
    "id": "mohammad-hanif-baihaqi",
    "nama": "Mohammad Hanif Baihaqi",
    "asalSekolah": "MAN 1 Bliter",
    "peran": "Student Ambassador",
    "isi": null,
    "foto": "/image/landing/casa/mohammad-hanif-baihaqi.webp"
  },
  {
    "id": "mochammad-raffa-satria-ardhani",
    "nama": "Mochammad Raffa Satria Ardhani",
    "asalSekolah": "SMAN 1 GEDANGAN",
    "peran": "Student Ambassador",
    "isi": null,
    "foto": "/image/landing/casa/mochammad-raffa-satria-ardhani.webp"
  },
  {
    "id": "kanesha-syahquita-izzati",
    "nama": "Kanesha Syahquita Izzati",
    "asalSekolah": "SMA Negeri 1 Tangerang",
    "peran": "Student Ambassador",
    "isi": null,
    "foto": "/image/landing/casa/kanesha-syahquita-izzati.webp"
  },
  {
    "id": "emily-gaizka-kirana",
    "nama": "Emily Gaizka Kirana",
    "asalSekolah": "SMAN 7 Jakarta",
    "peran": "Student Ambassador",
    "isi": null,
    "foto": "/image/landing/casa/emily-gaizka-kirana.webp"
  },
  {
    "id": "alexa-salsabila-putri-rahmanto",
    "nama": "Alexa Salsabila Putri Rahmanto",
    "asalSekolah": "SMA Negeri 1 Sooko",
    "peran": "Student Ambassador",
    "isi": null,
    "foto": "/image/landing/casa/alexa-salsabila-putri-rahmanto.webp"
  }
];

/** Satu baris accordion FAQ. */
export interface ItemFAQ {
  id: string;
  pertanyaan: string;
  jawaban: string;
}

/** FAQ resmi dari dokumen konten tim BKUI, tab "QNA MATA ACARA BKUI". */
export const DAFTAR_FAQ: readonly ItemFAQ[] = [
  {
    id: "faq-1",
    pertanyaan:
      "Kak, kalau aku mau ngerasain langsung gimana suasana belajar di UI kayak mahasiswa itu bisa gak sih, Kak?",
    jawaban:
      "Bisa banget! Kamu bisa ngerasain langsung suasana belajar di UI dengan mengikuti rangkaian kegiatan Bedah Fakultas. Kamu bisa mengeksplorasi seluruh fakultas di UI untuk mencari tahu suasana belajar, fasilitas, dan kehidupan sebagai mahasiswa UI secara langsung!",
  },
  {
    id: "faq-2",
    pertanyaan: "Bedah Universitas itu ngapain aja sih, Kak? Gabut gak acaranya?",
    jawaban:
      "Enggak dong, acaranya pasti bakal seru banget! Di Bedah Universitas kamu bakal ketemu alumni-alumni UI keren untuk ngobrol santai soal kehidupan selama kuliah dan prospek kerja ke depannya. Terus bakal ada mini parade yang bikin kamu makin merasa seperti mahasiswa UI. Jadi, jangan lupa beli tiketnya, ya!",
  },
  {
    id: "faq-3",
    pertanyaan:
      "Kalau aku mau cari tahu soal mata kuliah dan dosen di Teknik Industri, apakah bisa dengan ikut BKUI?",
    jawaban:
      "Bisa banget! Kalau kamu ikut BKUI 2026, kamu bisa mencari tahu soal Teknik Industri, bahkan 80 jurusan lainnya yang ada di UI. Kamu bisa cari tahu langsung tentang mata kuliah, dosen, dan cara belajar dari seluruh jurusan di UI!",
  },
  {
    id: "faq-4",
    pertanyaan:
      "Kak, kalau aku ikut BKUI 2026, aku bisa keliling seluruh fakultas yang ada di UI gak?",
    jawaban:
      "Tentunya bisa banget! Kalau kamu ikut BKUI 2026, kamu bisa keliling seluruh fakultas yang ada di UI sekaligus mencari tahu langsung kurikulum dan cara belajarnya.",
  },
  {
    id: "faq-5",
    pertanyaan: "Aku masih bingung soal prospek kerja jurusan yang aku pilih, gimana ya, Kak?",
    jawaban:
      "Tenang aja, kalau kamu ikut BKUI 2026 kamu bisa tanya-tanya ke alumni UI tentang berbagai macam prospek kerja lulusan UI. Jadi, jangan lupa ikut BKUI 2026, ya!",
  },
  {
    id: "faq-6",
    pertanyaan: "Kak, bedanya Bedah Universitas, Bedah Fakultas, dan Bedah Jurusan apa sih?",
    jawaban:
      "Simpelnya, Bedah Universitas buat kenalan sama UI secara utuh, Bedah Fakultas buat mengeksplorasi fakultas incaranmu, dan Bedah Jurusan buat mendalami jurusan impianmu. Ketiganya seru dan saling melengkapi, jadi jangan sampai kelewatan BKUI 2026!",
  },
  {
    id: "faq-7",
    pertanyaan: "Kak, aku belum yakin mau jurusan apa. Mulai dari mana buat nentuinnya?",
    jawaban:
      "Santai aja, semua jawabannya ada di BKUI 2026! Kamu bisa mulai dari Bedah Fakultas untuk melihat gambaran besarnya, lalu lanjut ke Bedah Jurusan sampai menemukan jurusan yang paling cocok. Yuk, beli tiketnya sekarang!",
  },
  {
    id: "faq-8",
    pertanyaan: "Kalau aku ikut ketiga acara BKUI 2026 sekaligus, untungnya apa, Kak?",
    jawaban:
      "Untungnya gede banget! Kamu bakal dapat gambaran lengkap dari tingkat universitas, fakultas, sampai jurusan, sehingga keputusanmu dalam memilih jurusan makin mantap dan gak asal pilih. Paket lengkap ini cuma ada di BKUI 2026. Yuk, beli tiketnya sekarang!",
  },
  {
    id: "faq-9",
    pertanyaan: "Kak, aku masih anak SMA kelas 10. Apa masih terlalu dini kalau ikut BKUI?",
    jawaban:
      "Enggak dong, justru ini waktu yang pas banget! Makin cepat kamu kenalan sama dunia kuliah, makin siap juga kamu menentukan jurusan yang cocok tanpa harus buru-buru nanti. Yuk, mulai langkah pertamamu dengan ikut BKUI 2026!",
  },
  {
    id: "faq-10",
    pertanyaan:
      "Kak, kalau aku dari luar Jabodetabek dan datang jauh-jauh untuk ikut BKUI, worth it gak? Takut rugi ongkos doang.",
    jawaban:
      "Worth it banget! Ini kesempatan emas untuk langsung ngerasain suasana UI, ketemu kakak tingkat dan alumni, sampai mengenal jurusan impianmu secara nyata. Daripada menyesal salah pilih nanti, lebih baik mantapkan pilihanmu dari sekarang di BKUI 2026. Yuk, beli tiketnya!",
  },
] as const;

/**
 * Deskripsi "Apa itu BKUI 2026".
 * Disusun dari cakupan acara yang diberikan tim: Bedah Universitas, Bedah
 * Fakultas, dan Bedah Jurusan.
 */
export const DESKRIPSI_BKUI =
  "Bedah Kampus Universitas Indonesia (BKUI) 2026 adalah ruang eksplorasi bagi pelajar untuk mengenal kehidupan kampus UI secara lebih dekat. Melalui rangkaian Bedah Universitas, Bedah Fakultas, dan Bedah Jurusan, peserta dapat menggali informasi tentang pengalaman kuliah, lingkungan belajar, pilihan program studi, hingga gambaran karier langsung dari sivitas dan alumni UI. BKUI membantu kamu melangkah lebih yakin dalam menentukan arah pendidikan dan masa depan.";

/** Subjudul kecil di bawah judul "Tentukan Arah Petualanganmu". */
export const SUBJUDUL_ARAH_PETUALANGAN =
  "Temukan pengalaman BKUI yang paling sesuai untukmu.";

/**
 * Video Landing Page.
 *
 * AGENTS.md bagian 7: URL video (Teaser → Trailer → After Movie) HARUS bisa
 * diganti dari Admin, bukan hardcode. `url: null` berarti belum ada video —
 * komponennya menampilkan bingkai kosong, bukan menebak URL YouTube.
 */
export interface VideoLanding {
  /** Label yang tampil sebagai judul section. Di Figma: "After Movie". */
  judul: string;
  url: string | null;
}

export const VIDEO_LANDING: VideoLanding = {
  // Di Figma judulnya ditulis kapital semua.
  judul: "TRAILER BKUI 2026",
  url: null,
};

/**
 * Sponsor & partner.
 *
 * Di Figma masih lingkaran kosong — logo aslinya belum diberikan. Jangan
 * menebak sponsor apa saja yang ikut; sampai daftarnya ada, yang tampil cukup
 * lingkaran placeholder sebanyak yang ada di desain.
 */
export interface Sponsor {
  id: string;
  nama: string;
  logo: string | null;
}

export const DAFTAR_SPONSOR: readonly Sponsor[] = Array.from(
  { length: 7 },
  (_, i) => ({ id: `sponsor-${i + 1}`, nama: `Sponsor ${i + 1}`, logo: null }),
);
