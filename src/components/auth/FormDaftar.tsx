import Link from "next/link";

import { KolomIsian } from "./KolomIsian";

/**
 * Kartu formulir Daftar Akun (Figma `824:1117`).
 *
 * ---------------------------------------------------------------------------
 * Tombol "Daftar" SENGAJA dimatikan
 * ---------------------------------------------------------------------------
 * Endpoint auth di BE belum ada, dan shape request/response-nya tidak boleh
 * dikarang duluan (README boundary nomor 4). Tanpa tujuan yang pasti, formulir
 * ini tidak punya tempat mengirim apa pun.
 *
 * Yang dimatikan tombolnya, BUKAN isiannya — dan itu disengaja:
 * isiannya tetap bisa dicoba, difokus lewat keyboard, dan dinilai desainer.
 *
 * Alasannya tombol, bukan sekadar tidak memasang handler: tombol yang bisa
 * ditekan tapi tidak melakukan apa-apa membuat orang mengetik nama, nomor HP,
 * dan KATA SANDI ke formulir yang membuang semuanya. Tombol mati plus
 * keterangan di atasnya mengatakan hal itu sejak awal.
 *
 * Begitu endpoint-nya ada: bungkus `<form>` di sini dengan handler-nya,
 * hidupkan tombolnya, dan tambahkan validasi yang mengikuti aturan BE — bukan
 * aturan yang saya tebak sekarang.
 *
 * ---------------------------------------------------------------------------
 * Enam kolomnya mengikuti Figma persis
 * ---------------------------------------------------------------------------
 * Nama Lengkap, Sekolah, Nomor HP, Email, Kata Sandi, Konfirmasi Kata Sandi.
 * Tidak ada pertanyaan "Are you a high school student?" di layar ini — di PRD
 * pertanyaan itu ada di pengisian profil setelah daftar, dan itulah yang
 * memberi role Student. Jangan ditambahkan di sini tanpa konfirmasi PM.
 */
export function FormDaftar() {
  return (
    <div className="mx-auto flex w-full max-w-[1000px] flex-col items-center rounded-3xl bg-bkui-navbar px-6 py-10 shadow-[0_4px_4px_rgba(0,0,0,0.25)] sm:min-h-[641px] sm:px-12 sm:py-14 lg:px-24 lg:pt-16">
      <h1 className="text-center font-display text-4xl leading-[1.4] text-bkui-teks-tua sm:text-5xl lg:text-[72px]">
        Daftar
      </h1>

      <form className="mt-6 flex w-full max-w-[808px] flex-col items-center gap-8">
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
          <p id="status-daftar" className="sr-only">Pendaftaran belum tersedia di web ini.</p>
          <button
            type="submit"
            disabled
            aria-describedby="status-daftar"
            title="Pendaftaran belum tersedia"
            className="h-16 cursor-not-allowed rounded-full bg-bkui-button px-6 font-ui text-lg font-medium capitalize text-bkui-teks lg:text-xl"
          >
            Daftar
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
