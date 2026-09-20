"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { ApiError, NetworkError } from "@/lib/api";
import { useSesi } from "@/lib/auth-state";

import { KolomIsian } from "./KolomIsian";

/**
 * Kartu formulir Daftar Akun (Figma `824:1117`).
 *
 * Sejak endpoint auth BE tersedia (BE ARCH-0003), tombolnya hidup dan formulir
 * ini mengirim ke `POST /auth/register`.
 *
 * ---------------------------------------------------------------------------
 * Enam kolomnya mengikuti Figma persis
 * ---------------------------------------------------------------------------
 * Nama Lengkap, Sekolah, Nomor HP, Email, Kata Sandi, Konfirmasi Kata Sandi.
 *
 * Tidak ada pertanyaan "Are you a high school student?" di layar ini — di PRD
 * pertanyaan itu ada di pengisian profil setelah daftar, dan itulah yang
 * memberi role Student. Akun yang lahir dari sini karenanya berstatus General
 * Public, dan BE memang menerima pendaftaran tanpa jawaban itu.
 *
 * Akibatnya yang perlu diketahui: sampai PM memutuskan di layar mana
 * pertanyaan itu diajukan, belum ada jalan bagi pengguna untuk menjadi Student
 * sendiri — fitur Mentoring belum bisa dijangkau. Jangan tambahkan
 * pertanyaannya di sini tanpa konfirmasi PM (boundary repo nomor 3).
 */
export function FormDaftar() {
  const router = useRouter();
  const { daftar } = useSesi();

  const [pesanGalat, setPesanGalat] = useState<string | null>(null);
  const [sedangKirim, setSedangKirim] = useState(false);

  const kirim = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sedangKirim) return;

    const data = new FormData(e.currentTarget);
    const nama = String(data.get("nama") ?? "").trim();
    const sekolah = String(data.get("sekolah") ?? "").trim();
    const telepon = String(data.get("telepon") ?? "").replace(/\s/g, "");
    const email = String(data.get("email") ?? "").trim();
    const sandi = String(data.get("sandi") ?? "");
    const konfirmasi = String(data.get("konfirmasi-sandi") ?? "");

    if (!nama || !email || !sandi) {
      setPesanGalat("Nama lengkap, email, dan kata sandi wajib diisi.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setPesanGalat("Format email belum benar.");
      return;
    }
    // Batas 8 karakter ini bukan tebakan — itu aturan BE yang sudah tertulis di
    // kontrak. Diperiksa di sini supaya pengguna tahu sebelum mengirim.
    if (sandi.length < 8) {
      setPesanGalat("Kata sandi minimal 8 karakter.");
      return;
    }
    // Murni urusan frontend: BE tidak pernah menerima kolom konfirmasi.
    if (sandi !== konfirmasi) {
      setPesanGalat("Konfirmasi kata sandi belum sama dengan kata sandinya.");
      return;
    }

    setPesanGalat(null);
    setSedangKirim(true);

    try {
      await daftar({
        fullName: nama,
        email,
        password: sandi,
        // Kolom opsional hanya dikirim kalau memang diisi — string kosong akan
        // tersimpan sebagai data kosong yang menyesatkan.
        ...(sekolah ? { institution: sekolah } : {}),
        ...(telepon ? { phoneNumber: telepon } : {}),
      });
      router.replace("/profile");
    } catch (galat) {
      if (galat instanceof ApiError) {
        setPesanGalat(
          galat.terlaluSering
            ? "Terlalu banyak percobaan pendaftaran. Coba lagi sebentar lagi."
            : galat.messages.join(" "),
        );
      } else if (galat instanceof NetworkError) {
        setPesanGalat(galat.message);
      } else {
        setPesanGalat("Terjadi kesalahan tak terduga. Coba lagi.");
      }
      setSedangKirim(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-[1000px] flex-col items-center rounded-3xl bg-bkui-navbar px-6 py-10 shadow-[0_4px_4px_rgba(0,0,0,0.25)] sm:min-h-[641px] sm:px-12 sm:py-14 lg:px-24 lg:pt-16">
      <h1 className="text-center font-display text-4xl leading-[1.4] text-bkui-teks-tua sm:text-5xl lg:text-[72px]">
        Daftar
      </h1>

      <form onSubmit={kirim} noValidate className="mt-6 flex w-full max-w-[808px] flex-col items-center gap-8">
        <div className="grid w-full gap-x-6 gap-y-6 md:grid-cols-2">
          <KolomIsian label="Nama Lengkap" name="nama" placeholder="Contoh: Kasandra Putri" autoComplete="name" />
          <KolomIsian label="Sekolah" name="sekolah" placeholder="Contoh: SMA Negeri 8 Jakarta" autoComplete="organization" />
          <KolomIsian label="Nomor HP" name="telepon" type="tel" placeholder="Contoh: 0812 3456 7890" autoComplete="tel" />
          <KolomIsian label="Email" name="email" type="email" placeholder="Contoh: nama@email.com" autoComplete="email" />
          <KolomIsian
            label="Kata Sandi"
            name="sandi"
            type="password"
            placeholder="Minimal 8 karakter"
            autoComplete="new-password"
          />
          <KolomIsian
            label="Konfirmasi Kata Sandi"
            name="konfirmasi-sandi"
            type="password"
            placeholder="Masukkan kembali kata sandi"
            autoComplete="new-password"
          />
        </div>

        <div className="flex flex-col items-center gap-3">
          <p
            role="alert"
            className="min-h-6 max-w-[520px] text-center font-body text-base font-medium leading-[1.4] text-bkui-galat"
          >
            {pesanGalat}
          </p>

          <button
            type="submit"
            disabled={sedangKirim}
            aria-busy={sedangKirim}
            className="tombol-kertas h-16 cursor-pointer rounded-full bg-bkui-button px-6 font-ui text-lg font-medium capitalize text-bkui-teks focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bkui-hijau disabled:cursor-wait disabled:opacity-70 lg:text-xl"
          >
            {sedangKirim ? "Memproses…" : "Daftar"}
          </button>
        </div>
      </form>

      <p className="mt-14 flex flex-wrap items-center justify-center gap-2 text-center text-sm">
        <span className="font-body font-medium leading-[1.2] text-bkui-teks-tua">
          Sudah punya akun?
        </span>
        <Link
          href="/masuk"
          className="inline-flex min-h-11 items-center px-1 font-ui font-medium capitalize leading-none text-bkui-coklat-tua-teks hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bkui-hijau"
        >
          Masuk
        </Link>
      </p>
    </div>
  );
}
