/**
 * Konten Landing Page — SEMUANYA MASIH DUMMY.
 *
 * Tidak ada satupun data di file ini yang diambil dari API. Endpoint BE untuk
 * entity `Content` belum ada (per BE ARCH-0002 satu-satunya endpoint yang jalan
 * adalah `GET /api/v1/health`), dan sesuai README boundary nomor 4 bentuk
 * response-nya tidak boleh dikarang duluan.
 *
 * Semua konten di bawah ini dikumpulkan di satu file supaya:
 * 1. jelas mana yang masih dummy dan mana yang sudah asli — komponennya sendiri
 *    tidak menyimpan teks konten sama sekali;
 * 2. saat endpoint Content rilis, cukup file ini yang diganti jadi pemanggil
 *    API; komponen section tidak perlu disentuh.
 *
 * AGENTS.md bagian 7 menyebut URL video, pengumuman, dan timeline mentoring
 * WAJIB dinamis dari Admin — jadi jangan hardcode nilai aslinya di komponen.
 *
 * ---------------------------------------------------------------------------
 * Catatan soal teks "Lorem ipsum"
 * ---------------------------------------------------------------------------
 * Sebagian teks di bawah masih Lorem ipsum, persis seperti di Figma. Itu memang
 * belum ditulis oleh PM, jadi sengaja TIDAK dikarang sendiri — teks karangan
 * yang terlihat masuk akal lebih berbahaya daripada Lorem ipsum, karena bisa
 * ikut terbawa ke produksi tanpa ada yang sadar itu bukan konten resmi.
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
export const DAFTAR_TOKOH: readonly Tokoh[] = [
  { id: "tokoh-1", nama: "Nama Tokoh 1", keterangan: "Peran atau institusi", foto: null },
  { id: "tokoh-2", nama: "Nama Tokoh 2", keterangan: "Peran atau institusi", foto: null },
  { id: "tokoh-3", nama: "Nama Tokoh 3", keterangan: "Peran atau institusi", foto: null },
  { id: "tokoh-4", nama: "Nama Tokoh 4", keterangan: "Peran atau institusi", foto: null },
  { id: "tokoh-5", nama: "Nama Tokoh 5", keterangan: "Peran atau institusi", foto: null },
  { id: "tokoh-6", nama: "Nama Tokoh 6", keterangan: "Peran atau institusi", foto: null },
  { id: "tokoh-7", nama: "Nama Tokoh 7", keterangan: "Peran atau institusi", foto: null },
  { id: "tokoh-8", nama: "Nama Tokoh 8", keterangan: "Peran atau institusi", foto: null },
] as const;

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
    nama: "Lorem ipsum dolor",
    asalSekolah: "Sekolahnya lorem ipsum",
    isi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    foto: null,
  },
  {
    id: "testimoni-2",
    nama: "Lorem ipsum dolor",
    asalSekolah: "Sekolahnya lorem ipsum",
    isi: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    foto: null,
  },
  {
    id: "testimoni-3",
    nama: "Lorem ipsum dolor",
    asalSekolah: "Sekolahnya lorem ipsum",
    isi: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    foto: null,
  },
] as const;

/** Satu baris accordion FAQ. */
export interface ItemFAQ {
  id: string;
  pertanyaan: string;
  jawaban: string;
}

/** TODO: ganti dengan daftar FAQ asli dari PM. */
export const DAFTAR_FAQ: readonly ItemFAQ[] = [
  {
    id: "faq-1",
    pertanyaan: "Mengapa bumi berbentuk segitiga dan Fasilkom bernama itu?",
    jawaban:
      "Tugas bomba lebih dari pada itu, bomba ni penyelamat. Kucing atas pohon, kerbau masuk parit, kuda terlepas, ular dalam rumah, semua kami selamatkan.",
  },
  {
    id: "faq-2",
    pertanyaan: "Mengapa bumi berbentuk segitiga dan Fasilkom bernama itu?",
    jawaban:
      "Jawaban belum diisi. Konten FAQ menunggu daftar resmi dari PM.",
  },
  {
    id: "faq-3",
    pertanyaan: "Mengapa bumi berbentuk segitiga dan Fasilkom bernama itu?",
    jawaban:
      "Jawaban belum diisi. Konten FAQ menunggu daftar resmi dari PM.",
  },
  {
    id: "faq-4",
    pertanyaan: "Mengapa bumi berbentuk segitiga dan Fasilkom bernama itu?",
    jawaban:
      "Jawaban belum diisi. Konten FAQ menunggu daftar resmi dari PM.",
  },
  {
    id: "faq-5",
    pertanyaan: "Mengapa bumi berbentuk segitiga dan Fasilkom bernama itu?",
    jawaban:
      "Jawaban belum diisi. Konten FAQ menunggu daftar resmi dari PM.",
  },
  {
    id: "faq-6",
    pertanyaan: "Mengapa bumi berbentuk segitiga dan Fasilkom bernama itu?",
    jawaban:
      "Jawaban belum diisi. Konten FAQ menunggu daftar resmi dari PM.",
  },
] as const;

/**
 * Deskripsi "Apa itu BKUI 2026".
 * TODO: ganti dengan deskripsi resmi dari PM.
 */
export const DESKRIPSI_BKUI =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

/** Subjudul kecil di bawah judul "Tentukan Arah Petualanganmu". */
export const SUBJUDUL_ARAH_PETUALANGAN =
  "Lorem ipsum dolor sit amet, consectetur";

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
