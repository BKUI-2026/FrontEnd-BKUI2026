"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";

import { ApiError, NetworkError } from "@/lib/api";
import { useSesi } from "@/lib/auth-state";

import { KolomIsian } from "./KolomIsian";

/**
 * Kartu formulir Masuk (Figma `707:3918` / `824:744`), lengkap dengan status galatnya.
 *
 * Sejak endpoint auth BE tersedia (BE ARCH-0003), formulir ini benar-benar
 * mengirim ke `POST /auth/login`.
 *
 * Pemeriksaan di sisi klien sengaja dibatasi pada yang memang milik frontend —
 * kolom kosong dan bentuk email — supaya pengguna tidak perlu menunggu
 * perjalanan ke server untuk kesalahan sesederhana itu. Sisanya, termasuk
 * "email atau kata sandi salah", adalah jawaban server dan ditampilkan apa
 * adanya; menebaknya di sini berarti berbohong kepada pengguna.
 */
export function FormMasuk() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { masuk } = useSesi();

  const [pesanGalat, setPesanGalat] = useState<string | null>(null);
  const [sedangKirim, setSedangKirim] = useState(false);

  const kirim = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sedangKirim) return;

    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const sandi = String(data.get("sandi") ?? "");

    if (!email || !sandi) {
      setPesanGalat("Email dan kata sandi wajib diisi.");
      return;
    }
    // Pemeriksaan format paling longgar yang tetap berguna: ada karakter
    // sebelum @, sesudah @, dan sebuah titik di domainnya. Aturan email yang
    // "ketat" terkenal menolak alamat yang sebenarnya sah.
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setPesanGalat("Format email belum benar.");
      return;
    }

    setPesanGalat(null);
    setSedangKirim(true);

    try {
      const user = await masuk(email, sandi);

      // Kembalikan ke halaman yang tadi dijaga, kalau memang datang dari sana.
      // Hanya path internal yang diterima — string dari URL tidak boleh bisa
      // mengarahkan pengguna ke domain lain setelah masuk.
      const tujuan = searchParams.get("next");
      const tujuanAman =
        tujuan && tujuan.startsWith("/") && !tujuan.startsWith("//")
          ? tujuan
          : null;

      router.replace(
        tujuanAman ?? (user.role === "STUDENT" ? "/dashboard" : "/profile"),
      );
    } catch (galat) {
      if (galat instanceof ApiError) {
        setPesanGalat(
          galat.terlaluSering
            ? "Terlalu banyak percobaan masuk. Coba lagi sebentar lagi."
            : galat.message,
        );
      } else if (galat instanceof NetworkError) {
        setPesanGalat(galat.message);
      } else {
        setPesanGalat("Terjadi kesalahan tak terduga. Coba lagi.");
      }
      setSedangKirim(false);
    }
    // Sengaja tidak menyalakan ulang tombol setelah berhasil: halamannya
    // sedang berpindah, dan tombol yang hidup lagi mengundang klik kedua.
  };

  return (
    <div className="auth-card-enter mx-auto flex w-full max-w-[600px] flex-col items-center rounded-3xl bg-bkui-navbar px-6 py-10 shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition-transform duration-300 ease-out hover:-translate-y-1 sm:min-h-[550px] sm:px-16 sm:py-14">
      <h1 className="text-center font-display text-4xl leading-[1.4] text-bkui-teks-tua sm:text-5xl lg:text-[72px]">
        Masuk
      </h1>

      <form onSubmit={kirim} noValidate className="mt-6 flex w-full flex-col items-center gap-8">
        <div className="flex w-full flex-col gap-6 sm:max-w-[392px]">
          <KolomIsian label="Email" name="email" type="email" placeholder="Contoh: nama@email.com" autoComplete="email" />
          <KolomIsian
            label="Kata Sandi"
            name="sandi"
            type="password"
            placeholder="Masukkan kata sandi"
            autoComplete="current-password"
          />
        </div>

        <div className="flex flex-col items-center gap-4">
          {/*
            `role="alert"` bukan hiasan: pembaca layar mengumumkan isinya begitu
            muncul, tanpa pengguna harus menyusuri halaman untuk menemukannya.
            Elemennya selalu dirender (bukan dicabut lalu dipasang lagi) supaya
            pengumumannya benar-benar terpicu saat isinya berubah.
          */}
          <p
            role="alert"
            className="min-h-6 max-w-[440px] text-center font-body text-sm font-medium leading-[1.4] text-bkui-galat"
          >
            {pesanGalat}
          </p>

          <button
            type="submit"
            disabled={sedangKirim}
            aria-busy={sedangKirim}
            className="tombol-kertas h-16 cursor-pointer rounded-full bg-bkui-button px-9 font-ui text-lg font-medium capitalize text-bkui-teks focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bkui-hijau disabled:cursor-wait disabled:opacity-70 lg:text-xl"
          >
            {sedangKirim ? "Memproses…" : "Masuk"}
          </button>
        </div>
      </form>

      <p className="mt-9 flex flex-wrap items-center justify-center gap-2 text-center text-sm">
        <span className="font-body font-medium leading-[1.2] text-bkui-teks-tua">
          Belum punya akun?
        </span>
        <Link
          href="/daftar"
          className="inline-flex min-h-11 items-center px-1 font-ui font-medium capitalize leading-none text-bkui-coklat-tua-teks hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bkui-hijau"
        >
          Daftar
        </Link>
      </p>
    </div>
  );
}
