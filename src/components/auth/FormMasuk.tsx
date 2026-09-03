"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

import { KolomIsian } from "./KolomIsian";

/**
 * Kartu formulir Masuk (Figma `359:4815`), lengkap dengan status galatnya.
 *
 * ---------------------------------------------------------------------------
 * Kenapa tombolnya HIDUP di sini, padahal di halaman Daftar dimatikan
 * ---------------------------------------------------------------------------
 * Bukan karena endpoint auth sudah ada — belum. Bedanya: desain halaman ini
 * punya status galat, dan status itu tidak bisa ditinjau kalau tombolnya mati.
 *
 * Jadi tombolnya hidup dan menjalankan pemeriksaan yang MEMANG milik frontend:
 * email kosong, format email salah, kata sandi kosong. Itu aturan universal,
 * bukan tebakan soal aturan BE (panjang sandi minimum, misalnya, tetap tidak
 * saya tebak).
 *
 * Kalau isiannya lolos pemeriksaan itu, yang muncul bukan pesan "email atau
 * kata sandi salah" — pesan itu jawaban server, dan mengarangnya berarti
 * berbohong kepada pengguna. Yang muncul keterangan jujur bahwa layanan akunnya
 * memang belum tersedia.
 *
 * Halaman Daftar tetap tombolnya mati karena isiannya enam kolom berisi data
 * pribadi; membiarkan orang mengisi semuanya untuk dibuang lebih merugikan
 * daripada dua kolom di sini.
 *
 * Begitu endpoint-nya ada: ganti isi `kirim` dengan panggilan sungguhan, dan
 * `pesanGalat` tinggal diisi pesan dari server.
 */
export function FormMasuk() {
  const [pesanGalat, setPesanGalat] = useState<string | null>(null);

  const kirim = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

    setPesanGalat(
      "Masuk belum bisa diproses. Layanan akun di server belum tersedia.",
    );
  };

  return (
    <div className="mx-auto flex w-full max-w-[600px] flex-col items-center gap-6 rounded-3xl bg-bkui-navbar px-6 py-10 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] sm:px-16 sm:py-16">
      <h1 className="text-center font-display text-4xl leading-[1.4] text-bkui-teks-tua sm:text-5xl lg:text-[72px]">
        Masuk
      </h1>

      <form onSubmit={kirim} noValidate className="flex w-full flex-col items-center gap-8">
        <div className="flex w-full flex-col gap-6 sm:max-w-[392px]">
          <KolomIsian label="Email" name="email" type="email" placeholder="nama@email.com" autoComplete="email" />
          <KolomIsian
            label="Kata Sandi"
            name="sandi"
            type="password"
            placeholder="Kata sandimu"
            autoComplete="current-password"
          />
        </div>

        <div className="flex flex-col items-center gap-6">
          {/*
            `role="alert"` bukan hiasan: pembaca layar mengumumkan isinya begitu
            muncul, tanpa pengguna harus menyusuri halaman untuk menemukannya.
            Elemennya selalu dirender (bukan dicabut lalu dipasang lagi) supaya
            pengumumannya benar-benar terpicu saat isinya berubah.
          */}
          <p
            role="alert"
            className="min-h-6 max-w-[440px] text-center font-body text-base font-medium leading-[1.4] text-bkui-galat"
          >
            {pesanGalat}
          </p>

          <button
            type="submit"
            className="tombol-kertas h-16 cursor-pointer rounded-full bg-bkui-button px-9 font-ui text-lg font-medium capitalize text-bkui-teks focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bkui-hijau lg:text-xl"
          >
            Masuk
          </button>
        </div>
      </form>

      <p className="flex flex-wrap items-center justify-center gap-3 text-center text-base">
        <span className="font-body font-medium leading-[1.2] text-bkui-teks-tua">
          Belum punya akun?
        </span>
        <Link
          href="/daftar"
          className="font-ui font-medium capitalize leading-none text-bkui-coklat-tua-teks hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bkui-hijau"
        >
          Daftar
        </Link>
      </p>
    </div>
  );
}
