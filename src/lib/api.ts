import { env } from './env';

/**
 * Pemanggil API BE.
 *
 * Tipe di file ini BUKAN karangan — semuanya disalin dari kontrak resmi BE
 * (BackEnd-BKUI2026 ARCH-0003, ringkasannya di
 * `markdowns-fe/integrations/backend-api-contract.md`). Aturan lama tetap
 * berlaku: jangan tambah tipe untuk endpoint yang belum ada kontraknya.
 *
 * ---------------------------------------------------------------------------
 * Cara token bekerja
 * ---------------------------------------------------------------------------
 * - Access token hidup di MEMORI modul ini saja, tidak di localStorage. Token
 *   di localStorage bisa dibaca skrip mana pun yang berhasil masuk ke halaman.
 * - Refresh token tidak pernah disentuh FE: BE menaruhnya di cookie httpOnly,
 *   jadi `credentials: 'include'` di bawah yang membawanya.
 * - Konsekuensi yang disengaja: refresh halaman menghapus access token, dan
 *   sesi dipulihkan lewat `POST /auth/refresh` (lihat `auth-state.tsx`).
 */

// ---------------------------------------------------------------------------
// Bentuk data — salinan kontrak BE
// ---------------------------------------------------------------------------

/** Dua kondisi RBAC di BE. Tidak ada yang ketiga. */
export type RoleName = 'GENERAL_PUBLIC' | 'STUDENT';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: RoleName;
  /** Turunan dari role — jawaban "Are you a high school student?". */
  isHighSchoolStudent: boolean;
  /** Sekolah/universitas asal. */
  institution: string | null;
  phoneNumber: string | null;
  authProvider: 'EMAIL_PASSWORD' | 'GOOGLE';
  createdAt: string;
}

export interface AuthResponse {
  user: UserProfile;
  accessToken: string;
  /** Umur access token dalam detik. */
  expiresIn: number;
}

export interface HealthCheckResponse {
  status: 'ok' | 'degraded';
  timestamp: string;
  /** Detik sejak proses BE start. */
  uptime: number;
  database: 'up' | 'down';
}

export interface MentoringRegistrationState {
  /** false = dashboard pre-registration, true = post-registration. */
  registered: boolean;
  registrationId: string | null;
  status: 'SUBMITTED' | 'FORWARDED' | 'FAILED' | null;
  registeredAt: string | null;
}

export interface SchoolRoadshowReceipt {
  id: string;
  schoolName: string;
  submittedAt: string;
}

export interface CasaRegistrationReceipt {
  id: string;
  fullName: string;
  submittedAt: string;
}

export interface ContentView {
  slug: string;
  title: string;
  body: string;
  excerpt: string | null;
  publishedAt: string | null;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// Galat
// ---------------------------------------------------------------------------

/** Bentuk galat seragam dari BE (AllExceptionsFilter). */
interface ErrorBody {
  statusCode: number;
  message: string | string[];
  error: string;
}

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    /** Semua pesan validasi, kalau BE mengirim lebih dari satu. */
    readonly messages: string[] = [message],
  ) {
    super(message);
    this.name = 'ApiError';
  }

  /** Sesi tidak valid / belum masuk. */
  get tidakBerwenang(): boolean {
    return this.status === 401;
  }

  /** Terlalu sering — BE membatasi laju form publik & login. */
  get terlaluSering(): boolean {
    return this.status === 429;
  }
}

/** Galat jaringan: server tidak terjangkau sama sekali. */
export class NetworkError extends Error {
  constructor() {
    super('Tidak bisa menghubungi server. Periksa koneksi internetmu.');
    this.name = 'NetworkError';
  }
}

// ---------------------------------------------------------------------------
// Access token (memori)
// ---------------------------------------------------------------------------

let accessToken: string | null = null;

export function setAccessToken(token: string | null): void {
  accessToken = token;
}

export function getAccessToken(): string | null {
  return accessToken;
}

// ---------------------------------------------------------------------------
// Transport
// ---------------------------------------------------------------------------

interface OpsiPermintaan extends Omit<RequestInit, 'body'> {
  body?: unknown;
  /**
   * Kalau true, respons 401 memicu satu kali percobaan refresh token lalu
   * permintaannya diulang. Dimatikan untuk endpoint auth itu sendiri supaya
   * tidak saling memanggil tanpa henti.
   */
  autoRefresh?: boolean;
}

async function kirim<T>(path: string, opsi: OpsiPermintaan = {}): Promise<T> {
  const { body, autoRefresh = true, headers, ...sisa } = opsi;

  // FormData dikirim apa adanya. Content-Type-nya TIDAK boleh diset manual:
  // browser harus mengisinya sendiri lengkap dengan boundary multipart, dan
  // menimpanya bikin server gagal mem-parse berkasnya.
  const adalahFormData =
    typeof FormData !== 'undefined' && body instanceof FormData;

  const jalankan = async (): Promise<Response> => {
    const header = new Headers(headers);
    if (body !== undefined && !adalahFormData) {
      header.set('Content-Type', 'application/json');
    }
    if (accessToken) header.set('Authorization', `Bearer ${accessToken}`);

    try {
      return await fetch(`${env.apiBaseUrl}${path}`, {
        ...sisa,
        headers: header,
        // Wajib: refresh token ada di cookie httpOnly milik BE.
        credentials: 'include',
        body:
          body === undefined
            ? undefined
            : adalahFormData
              ? (body as FormData)
              : JSON.stringify(body),
      });
    } catch {
      // fetch hanya melempar kalau permintaannya tidak sampai — bukan untuk
      // status 4xx/5xx. Jadi di sini pasti soal jaringan/CORS.
      throw new NetworkError();
    }
  };

  let response = await jalankan();

  // Access token berumur pendek (15 menit). Daripada memaksa pengguna masuk
  // ulang, sekali 401 dicoba disegarkan diam-diam lalu permintaannya diulang.
  if (response.status === 401 && autoRefresh && accessToken !== null) {
    const berhasil = await segarkanToken();
    if (berhasil) response = await jalankan();
  }

  if (!response.ok) throw await bacaGalat(response, path);

  // 204 No Content (mis. logout) tidak punya body untuk di-parse.
  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

async function bacaGalat(response: Response, path: string): Promise<ApiError> {
  let pesan = `Permintaan ke ${path} gagal (${response.status}).`;
  let semua = [pesan];

  try {
    const isi = (await response.json()) as Partial<ErrorBody>;
    if (isi?.message) {
      semua = Array.isArray(isi.message) ? isi.message : [isi.message];
      pesan = semua[0] ?? pesan;
    }
  } catch {
    // Body bukan JSON (mis. halaman galat proxy) — pakai pesan bawaan.
  }

  return new ApiError(pesan, response.status, semua);
}

/**
 * Satu permintaan refresh dipakai bersama semua pemanggil yang sedang menunggu.
 * Tanpa ini, beberapa permintaan yang berbarengan kena 401 akan memicu refresh
 * masing-masing — dan karena BE merotasi refresh token, yang kalah balapan
 * akan dianggap memakai token curian dan SELURUH sesi dicabut.
 */
let refreshBerjalan: Promise<boolean> | null = null;

export function segarkanToken(): Promise<boolean> {
  refreshBerjalan ??= (async () => {
    try {
      const hasil = await kirim<AuthResponse>('/auth/refresh', {
        method: 'POST',
        autoRefresh: false,
      });
      setAccessToken(hasil.accessToken);
      pemberitahuSesi.forEach((dengar) => dengar(hasil.user));
      return true;
    } catch {
      setAccessToken(null);
      pemberitahuSesi.forEach((dengar) => dengar(null));
      return false;
    } finally {
      refreshBerjalan = null;
    }
  })();

  return refreshBerjalan;
}

/**
 * Jembatan ke React: refresh bisa terjadi dari mana saja (mis. saat permintaan
 * biasa kena 401), dan `auth-state` perlu tahu supaya UI ikut berubah.
 */
type PendengarSesi = (user: UserProfile | null) => void;
const pemberitahuSesi = new Set<PendengarSesi>();

export function dengarkanSesi(dengar: PendengarSesi): () => void {
  pemberitahuSesi.add(dengar);
  return () => pemberitahuSesi.delete(dengar);
}

// ---------------------------------------------------------------------------
// Endpoint
// ---------------------------------------------------------------------------

export function getHealth(): Promise<HealthCheckResponse> {
  return kirim<HealthCheckResponse>('/health');
}

export interface DataDaftar {
  email: string;
  password: string;
  fullName: string;
  /** Sekolah/universitas asal. */
  institution?: string;
  phoneNumber?: string;
  /**
   * Jawaban "Are you a high school student?".
   *
   * Opsional di BE dan defaultnya `false` (role GENERAL_PUBLIC). Dikirim
   * `true` dari form Mentoring, karena form itu menanyakan NISN dan kelas
   * X/XI/XII — yang mengisinya memang siswa, dan role STUDENT diperlukan
   * supaya pendaftaran mentoringnya bisa langsung dikirim.
   */
  isHighSchoolStudent?: boolean;
}

export function daftarAkun(data: DataDaftar): Promise<AuthResponse> {
  return kirim<AuthResponse>('/auth/register', {
    method: 'POST',
    body: data,
    autoRefresh: false,
  });
}

export function masuk(
  email: string,
  password: string,
): Promise<AuthResponse> {
  return kirim<AuthResponse>('/auth/login', {
    method: 'POST',
    body: { email, password },
    autoRefresh: false,
  });
}

export function keluar(): Promise<void> {
  return kirim<void>('/auth/logout', { method: 'POST', autoRefresh: false });
}

/** URL awal alur Google SSO. Dibuka lewat navigasi browser, bukan fetch. */
export function urlMasukGoogle(): string {
  return `${env.apiBaseUrl}/auth/google`;
}

export function ambilProfil(): Promise<UserProfile> {
  return kirim<UserProfile>('/users/me');
}

export interface PerubahanProfil {
  fullName?: string;
  institution?: string;
  phoneNumber?: string;
  /** Mengubah ini memindahkan role STUDENT <-> GENERAL_PUBLIC di BE. */
  isHighSchoolStudent?: boolean;
}

export function simpanProfil(
  perubahan: PerubahanProfil,
): Promise<UserProfile> {
  return kirim<UserProfile>('/users/me', {
    method: 'PATCH',
    body: perubahan,
  });
}

export function statusMentoring(): Promise<MentoringRegistrationState> {
  return kirim<MentoringRegistrationState>('/mentoring-registrations/me');
}

/** Satu acara di "Acara Saya", dikelola panitia lewat panel admin. */
export interface Acara {
  id: string;
  judul: string;
  deskripsi: string;
  /** ISO 8601 dari BE. */
  waktuMulai: string;
  /** Tautan pertemuan. `null` selama panitia belum mengisinya. */
  tautan: string | null;
}

/**
 * Acara yang tampil di dashboard siswa.
 *
 * Butuh sesi ber-role STUDENT: isinya bisa memuat tautan Zoom, dan tautan
 * yang bisa diambil tanpa login sama saja dengan membuka ruang mentoring ke
 * publik. Yang berstatus draf tidak pernah ikut terkirim.
 */
export function ambilAcara(): Promise<Acara[]> {
  return kirim<Acara[]>('/acara');
}

/** Isi form Mentoring, selain berkas. Nama field mengikuti kontrak BE. */
export interface DataMentoring {
  jenisKelamin: 'LAKI_LAKI' | 'PEREMPUAN';
  usia: number;
  /** 10 digit angka. */
  nisn: string;
  kelas: 'X' | 'XI' | 'XII';
  provinsi: string;
  idLine?: string;
  minat: string;
  kelebihanKekurangan: string;
  kontribusi: string;
  komitmen: string;
}

/** Kelima berkas bukti yang wajib diunggah. */
export interface BerkasMentoring {
  kartuPelajar: File;
  buktiInstagram: File;
  buktiTiktok: File;
  buktiX: File;
  buktiStory: File;
}

/**
 * Kirim pendaftaran Mentoring beserta berkasnya.
 *
 * Dikirim sebagai `multipart/form-data` karena membawa 5 berkas. Gambarnya
 * sebaiknya sudah dikecilkan lebih dulu lewat `kompresGambar` — BE menolak
 * berkas di atas 5 MB.
 */
export function daftarMentoring(
  data: DataMentoring,
  berkas: BerkasMentoring,
): Promise<MentoringRegistrationState> {
  const form = new FormData();
  for (const [kunci, nilai] of Object.entries(data)) {
    if (nilai !== undefined && nilai !== '') form.append(kunci, String(nilai));
  }
  for (const [kunci, file] of Object.entries(berkas)) {
    form.append(kunci, file);
  }

  return kirim<MentoringRegistrationState>('/mentoring-registrations', {
    method: 'POST',
    body: form,
  });
}

export interface DataRoadshow {
  schoolName: string;
  schoolAddress: string;
  schoolEmail: string;
  targetStudentCount: number;
  /** PJ Sekolah — istilah PRD. */
  pjName: string;
  pjEmail: string;
  pjPhone: string;
}

export function daftarRoadshow(
  data: DataRoadshow,
): Promise<SchoolRoadshowReceipt> {
  return kirim<SchoolRoadshowReceipt>('/school-roadshow-registrations', {
    method: 'POST',
    body: data,
  });
}

export interface DataCASA {
  fullName: string;
  email: string;
  /** Nomor WhatsApp — BE mengirim konfirmasi ke sini. */
  phoneNumber: string;
}

export function daftarCASA(
  data: DataCASA,
): Promise<CasaRegistrationReceipt> {
  return kirim<CasaRegistrationReceipt>('/casa-registrations', {
    method: 'POST',
    body: data,
  });
}

export function ambilKonten(slug: string): Promise<ContentView> {
  return kirim<ContentView>(`/contents/${slug}`);
}

export function ambilSemuaKonten(): Promise<ContentView[]> {
  return kirim<ContentView[]>('/contents');
}
