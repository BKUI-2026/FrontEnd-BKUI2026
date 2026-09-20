"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { setAccessToken } from "@/lib/api";
import { useSesi } from "@/lib/auth-state";

/**
 * Menerima hasil Google SSO dan memasang sesinya.
 *
 * Access token datang lewat query string karena langkah ini adalah navigasi
 * browser penuh dari Google, bukan fetch dari FE — tidak ada tempat lain untuk
 * menitipkannya. Refresh token TIDAK ikut ke sini: BE sudah memasangnya
 * sebagai cookie httpOnly.
 *
 * Dua hal yang dikerjakan setelah token diterima:
 * 1. URL dibersihkan lewat `replace`, supaya token tidak tertinggal di riwayat
 *    peramban dan tidak ikut terbawa kalau alamatnya disalin atau dibagikan.
 * 2. Profil ditarik dari BE. Query string hanya membawa token, sementara UI
 *    butuh tahu nama dan role penggunanya.
 */
export function TerimaCallbackGoogle() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { muatUlangProfil } = useSesi();

  const accessToken = searchParams.get("access_token");
  // Keadaan gagal murni turunan dari ada/tidaknya token di URL — tidak perlu
  // state tersendiri, dan menghitungnya saat render menghindari render
  // berantai yang timbul kalau setState dipanggil di dalam effect.
  const gagal = !accessToken;

  useEffect(() => {
    if (!accessToken) return;

    setAccessToken(accessToken);
    void muatUlangProfil().then(() => router.replace("/profile"));
  }, [accessToken, muatUlangProfil, router]);

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-24">
      {gagal ? (
        <div className="flex max-w-md flex-col items-center gap-4 text-center">
          <p role="alert" className="font-body text-base font-medium text-bkui-galat">
            Proses masuk lewat Google tidak selesai. Coba ulangi dari halaman Masuk.
          </p>
          <button
            type="button"
            onClick={() => router.replace("/masuk")}
            className="tombol-kertas h-14 cursor-pointer rounded-full bg-bkui-button px-8 font-ui text-lg font-medium text-bkui-teks"
          >
            Ke halaman Masuk
          </button>
        </div>
      ) : (
        <p role="status" className="font-body text-base font-medium text-bkui-teks">
          Menyelesaikan proses masuk…
        </p>
      )}
    </main>
  );
}
