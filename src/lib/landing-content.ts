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
  /** Foto dari Admin. `null` → tampil siluet placeholder seperti di Figma. */
  foto: string | null;
}

/**
 * Delapan kartu, sesuai grid 4x2 di Figma.
 *
 * Nama tokohnya SENGAJA tidak memakai nama orang sungguhan. Di Figma
 * placeholder-nya memakai nama seorang publik figur; menampilkan nama orang
 * asli sebagai pembicara yang belum tentu diundang bisa terbaca sebagai klaim
 * palsu, jadi diganti penomoran netral sampai daftar aslinya diberikan PM.
 */
export const DAFTAR_TOKOH: readonly Tokoh[] = Array.from({ length: 8 }, (_, i) => ({
  id: `tokoh-${i + 1}`,
  nama: "Segera Diumumkan",
  keterangan: "Nantikan tokoh inspiratif BKUI 2026",
  foto: null,
}));

/** Satu tahap di section Timeline. */
export interface TahapTimeline {
  id: string;
  judul: string;
  /** Tanggal & lokasi. `null` → pil polos tanpa kartu tanggal di belakangnya. */
  detail: string | null;
}

/**
 * Empat tahap, label & tanggalnya diambil apa adanya dari Figma.
 *
 * Ini satu-satunya bagian Landing Page yang isinya benar-benar berurutan, jadi
 * di UI-nya boleh ditandai sebagai urutan (nomor + `<ol>`).
 */
export const TAHAP_TIMELINE: readonly TahapTimeline[] = [
  { id: "roadshow", judul: "Roadshow", detail: null },
  { id: "ambassador", judul: "Campus & Student Ambassador", detail: null },
  {
    id: "mentoring",
    judul: "Program Mentoring",
    detail: "13 September 2026 - Sekolah Pilihan",
  },
  { id: "puncak", judul: "Puncak Acara BKUI 2026", detail: null },
] as const;

/** Satu testimoni di section "Apa Kata Mereka". */
export interface Testimoni {
  id: string;
  nama: string;
  asalSekolah: string;
  isi: string;
  foto: string | null;
}

/** TODO: ganti dengan testimoni asli peserta CASA dari PM. */
export const DAFTAR_TESTIMONI: readonly Testimoni[] = [
  {
    id: "testimoni-1",
    nama: "Kesan Peserta",
    asalSekolah: "Alumni CASA BKUI",
    isi: "Cerita resmi peserta tentang pengalaman mengikuti rangkaian BKUI akan ditampilkan di sini setelah dikurasi oleh panitia.",
    foto: null,
  },
  {
    id: "testimoni-2",
    nama: "Perjalanan Menuju UI",
    asalSekolah: "Alumni CASA BKUI",
    isi: "Nantikan pengalaman peserta saat mengenal kehidupan kampus, mengeksplorasi fakultas, dan menemukan program studi yang sesuai dengan minatnya.",
    foto: null,
  },
  {
    id: "testimoni-3",
    nama: "Langkah Menentukan Pilihan",
    asalSekolah: "Alumni CASA BKUI",
    isi: "Kisah peserta tentang proses memantapkan pilihan pendidikan bersama BKUI 2026 akan hadir setelah testimoni resmi tersedia.",
    foto: null,
  },
] as const;

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
  judul: "After Movie",
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
