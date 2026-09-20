"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  ambilProfil,
  dengarkanSesi,
  keluar as keluarApi,
  masuk as masukApi,
  daftarAkun as daftarAkunApi,
  segarkanToken,
  setAccessToken,
  type DataDaftar,
  type UserProfile,
} from "./api";
import type { Akses } from "./navigation";

/**
 * Sumber tunggal keadaan sesi di FE.
 *
 * ---------------------------------------------------------------------------
 * Kenapa perlu status "memuat"
 * ---------------------------------------------------------------------------
 * Access token hanya hidup di memori (lihat `api.ts`), jadi setiap kali halaman
 * dimuat ulang FE mulai dari keadaan tidak tahu apa-apa dan harus bertanya ke
 * BE lewat `POST /auth/refresh` yang membawa cookie httpOnly.
 *
 * Selama pertanyaan itu belum dijawab, kita BELUM BOLEH menyimpulkan pengguna
 * adalah tamu. Tanpa status "memuat", setiap muat ulang halaman akan sekejap
 * menampilkan tombol "Masuk" kepada orang yang sebenarnya sudah masuk, dan
 * penjaga rute akan melempar mereka keluar dari halaman miliknya sendiri.
 */

export type StatusSesi = "memuat" | "masuk" | "tamu";

interface Sesi {
  status: StatusSesi;
  user: UserProfile | null;
  masuk: (email: string, sandi: string) => Promise<UserProfile>;
  daftar: (data: DataDaftar) => Promise<UserProfile>;
  keluar: () => Promise<void>;
  /** Perbarui profil di state setelah disimpan, tanpa memanggil ulang BE. */
  perbaruiProfil: (user: UserProfile) => void;
  /** Tarik ulang profil dari BE — dipakai setelah role berpotensi berubah. */
  muatUlangProfil: () => Promise<void>;
}

const KonteksSesi = createContext<Sesi | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<StatusSesi>("memuat");
  const [user, setUser] = useState<UserProfile | null>(null);

  const pasangSesi = useCallback((profil: UserProfile | null) => {
    setUser(profil);
    setStatus(profil ? "masuk" : "tamu");
  }, []);

  // Pulihkan sesi sekali saat aplikasi dimuat. Kalau cookie refresh-nya masih
  // sah, BE mengembalikan access token baru beserta profilnya.
  useEffect(() => {
    let masihTerpasang = true;

    void segarkanToken().then((berhasil) => {
      if (!masihTerpasang) return;
      // Kalau gagal, pendengar di bawah sudah memasang sesi ke null; yang
      // penting di sini status berpindah dari "memuat".
      if (!berhasil) pasangSesi(null);
    });

    return () => {
      masihTerpasang = false;
    };
  }, [pasangSesi]);

  // Sesi juga bisa berubah di luar React: permintaan biasa yang kena 401 akan
  // memicu refresh diam-diam, dan kalau refresh-nya gagal sesi harus ikut
  // berakhir di UI — bukan menunggu pengguna menekan sesuatu.
  useEffect(() => dengarkanSesi(pasangSesi), [pasangSesi]);

  const masuk = useCallback(
    async (email: string, sandi: string) => {
      const hasil = await masukApi(email, sandi);
      setAccessToken(hasil.accessToken);
      pasangSesi(hasil.user);
      return hasil.user;
    },
    [pasangSesi],
  );

  const daftar = useCallback(
    async (data: DataDaftar) => {
      const hasil = await daftarAkunApi(data);
      setAccessToken(hasil.accessToken);
      pasangSesi(hasil.user);
      return hasil.user;
    },
    [pasangSesi],
  );

  const keluar = useCallback(async () => {
    try {
      await keluarApi();
    } finally {
      // Apa pun jawaban server, sisi klien harus bersih. Sesi yang sudah
      // kedaluwarsa pun tetap menghasilkan logout yang benar di sini.
      setAccessToken(null);
      pasangSesi(null);
    }
  }, [pasangSesi]);

  const muatUlangProfil = useCallback(async () => {
    try {
      pasangSesi(await ambilProfil());
    } catch {
      // Dibiarkan: kalau sesinya memang sudah tidak sah, pendengar sesi di atas
      // yang akan memindahkan UI ke keadaan tamu.
    }
  }, [pasangSesi]);

  /**
   * Pasang profil terbaru — dan kalau ROLE-nya berubah, tukar juga access
   * token-nya.
   *
   * Ini bukan kerapian, tapi perbaikan keadaan yang benar-benar salah: role
   * ikut tertulis di dalam access token, sementara token yang sedang dipegang
   * dibuat sebelum perubahan. Tanpa penukaran ini, pengguna yang baru saja
   * menyatakan dirinya siswa akan melihat menu Mentoring terbuka di layar,
   * lalu ditolak 403 begitu membukanya — karena BE masih membaca role lama
   * dari tokennya. Sudah terbukti terjadi saat pengujian integrasi.
   */
  const perbaruiProfil = useCallback(
    (profil: UserProfile) => {
      const roleBerubah = profil.role !== user?.role;
      pasangSesi(profil);
      if (roleBerubah) void segarkanToken();
    },
    [pasangSesi, user?.role],
  );

  const nilai = useMemo<Sesi>(
    () => ({
      status,
      user,
      masuk,
      daftar,
      keluar,
      perbaruiProfil,
      muatUlangProfil,
    }),
    [status, user, masuk, daftar, keluar, perbaruiProfil, muatUlangProfil],
  );

  return <KonteksSesi.Provider value={nilai}>{children}</KonteksSesi.Provider>;
}

export function useSesi(): Sesi {
  const sesi = useContext(KonteksSesi);
  if (!sesi) {
    throw new Error("useSesi dipakai di luar <AuthProvider>.");
  }
  return sesi;
}

/**
 * Kondisi RBAC pengunjung saat ini.
 *
 * Hanya pengguna dengan role STUDENT di BE yang dihitung sebagai "Student" —
 * bukan sekadar sudah masuk. Ini sengaja: akun yang belum menjawab pertanyaan
 * status siswa memang belum berhak atas menu Mentoring.
 */
export function useAkses(): Akses {
  const { user } = useSesi();
  return user?.role === "STUDENT" ? "Student" : "General Public";
}

/** Sudah masuk, apa pun role-nya. Dipakai Navbar untuk memilih avatar vs tombol masuk. */
export function useSudahMasuk(): boolean {
  return useSesi().status === "masuk";
}
