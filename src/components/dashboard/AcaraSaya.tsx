"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import {
  ApiError,
  NetworkError,
  ambilAcara,
  statusMentoring,
  type Acara,
  type MentoringRegistrationState,
} from "@/lib/api";
import { useSesi } from "@/lib/auth-state";

import { LatarDashboard } from "./LatarDashboard";
import { SidebarDashboard } from "./SidebarDashboard";

/** Hasil pengambilan data dari BE. */
type HasilMuat =
  | { jenis: "memuat" }
  | {
      jenis: "siap";
      status: MentoringRegistrationState;
      acara: Acara[];
      /** Daftar acara gagal diambil — status pendaftaran tetap ditampilkan. */
      acaraGagal: boolean;
    }
  | { jenis: "galat"; pesan: string };

/** Apa yang digambar di layar — termasuk keadaan yang tidak perlu memanggil BE. */
type Keadaan = HasilMuat | { jenis: "bukanSiswa" };

/**
 * "Acara Saya" — acara yang diumumkan panitia untuk peserta mentoring.
 *
 * Isinya dikelola panitia lewat panel admin (`/acara` di BE), bukan ditulis
 * di sini. Acara berstatus draf tidak pernah ikut terkirim, jadi panitia bisa
 * menyiapkan jadwal jauh hari tanpa terlihat siswa.
 */
export function AcaraSaya() {
  const { user } = useSesi();
  const [hasil, setHasil] = useState<HasilMuat>({ jenis: "memuat" });

  const adalahSiswa = user?.role === "STUDENT";

  useEffect(() => {
    // Kedua endpoint hanya untuk role STUDENT — memanggilnya sebagai General
    // Public cuma menghasilkan 403 yang sudah bisa kita duga.
    if (!adalahSiswa) return;

    let masihTerpasang = true;

    // Diminta bersamaan, bukan berurutan: keduanya tidak saling bergantung,
    // dan menunggunya satu per satu membuat dashboard terasa dua kali lebih
    // lambat dibuka.
    //
    // Kegagalan daftar acara sengaja DITELAN di sini. Status pendaftaran itu
    // hal yang paling ingin dipastikan peserta saat membuka halaman ini, dan
    // tidak ada alasan menghapusnya dari layar cuma karena daftar acaranya
    // sedang bermasalah.
    Promise.all([
      statusMentoring(),
      ambilAcara().then(
        (acara) => ({ acara, gagal: false }),
        () => ({ acara: [] as Acara[], gagal: true }),
      ),
    ])
      .then(([status, hasilAcara]) => {
        if (masihTerpasang) {
          setHasil({
            jenis: "siap",
            status,
            acara: hasilAcara.acara,
            acaraGagal: hasilAcara.gagal,
          });
        }
      })
      .catch((galat: unknown) => {
        if (!masihTerpasang) return;
        const pesan =
          galat instanceof ApiError || galat instanceof NetworkError
            ? galat.message
            : "Gagal memuat data acara. Coba muat ulang halaman.";
        setHasil({ jenis: "galat", pesan });
      });

    return () => {
      masihTerpasang = false;
    };
  }, [adalahSiswa]);

  // Bukan-siswa dihitung saat render, bukan disimpan lewat setState di effect:
  // nilainya sepenuhnya turunan dari role, dan menyimpannya hanya akan memicu
  // render berantai.
  const keadaan: Keadaan = adalahSiswa ? hasil : { jenis: "bukanSiswa" };

  return (
    <LatarDashboard>
      <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-stretch">
        <SidebarDashboard aktif="acara" />

        <main className="flex min-h-[748px] min-w-0 flex-1 flex-col items-center rounded-3xl px-0 py-8 lg:px-12 lg:py-12">
          <h1 className="font-display text-4xl leading-[1.4] text-bkui-teks sm:text-5xl">
            Acara Saya
          </h1>

          <div className="mt-6 flex w-full flex-col gap-6">
            {keadaan.jenis === "memuat" && (
              <p role="status" className="py-12 text-center font-body text-base font-medium text-bkui-teks">
                Memuat acara…
              </p>
            )}

            {keadaan.jenis === "galat" && (
              <p role="alert" className="py-12 text-center font-body text-base font-medium text-bkui-galat">
                {keadaan.pesan}
              </p>
            )}

            {keadaan.jenis === "bukanSiswa" && (
              <KartuKosong
                judul="Belum ada acara"
                keterangan="Program Mentoring diperuntukkan bagi siswa SMA. Akunmu belum berstatus siswa, jadi belum ada acara yang tercatat di sini."
              />
            )}

            {keadaan.jenis === "siap" && !keadaan.status.registered && (
              <KartuKosong
                judul="Belum ada acara"
                keterangan="Kamu belum mendaftar program Mentoring. Setelah mendaftar, acara yang diumumkan panitia akan muncul di halaman ini."
              />
            )}

            {keadaan.jenis === "siap" && keadaan.acaraGagal && (
              <p role="alert" className="text-center font-body text-sm font-medium text-bkui-galat">
                Daftar acara belum bisa dimuat. Coba muat ulang halaman ini
                sebentar lagi.
              </p>
            )}

            {/*
              Sudah terdaftar tapi panitia belum mengumumkan acara apa pun.
              Dibedakan dari "belum mendaftar" dengan sengaja: keduanya sama-sama
              kosong di layar, tapi yang harus dilakukan pembacanya berbeda.
            */}
            {keadaan.jenis === "siap" &&
              keadaan.status.registered &&
              keadaan.acara.length === 0 &&
              !keadaan.acaraGagal && (
                <KartuKosong
                  judul="Pendaftaranmu sudah tercatat"
                  keterangan="Jadwal sesi dan tautan pertemuan akan muncul di sini setelah diumumkan panitia BKUI 2026."
                />
              )}

            {keadaan.jenis === "siap" &&
              keadaan.status.registered &&
              keadaan.acaraGagal && (
                <KartuKosong
                  judul="Pendaftaranmu sudah tercatat"
                  keterangan="Status pendaftaranmu aman. Hanya daftar acaranya yang sedang tidak bisa diambil."
                />
              )}

            {keadaan.jenis === "siap" &&
              keadaan.status.registered &&
              keadaan.acara.map((acara) => (
                <KartuAcara key={acara.id} acara={acara} />
              ))}
          </div>
        </main>
      </div>
    </LatarDashboard>
  );
}

function KartuKosong({ judul, keterangan }: { judul: string; keterangan: string }) {
  return (
    <article className="flex flex-col gap-2 rounded-3xl bg-bkui-navbar px-6 py-8 text-center sm:px-8">
      <h2 className="font-ui text-[28px] font-semibold leading-[1.2] text-bkui-teks">{judul}</h2>
      <p className="font-body text-base font-medium leading-[1.4] text-bkui-teks">{keterangan}</p>
    </article>
  );
}

function KartuAcara({ acara }: { acara: Acara }) {
  return (
    <article className="flex flex-col gap-4 rounded-3xl bg-bkui-navbar px-6 py-6 sm:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          {/* `break-words`: judul acara diketik panitia dan bisa apa saja. */}
          <h2 className="font-ui text-[28px] font-semibold leading-[1.2] break-words text-bkui-teks">
            {acara.judul}
          </h2>
          <p className="mt-1 flex items-center gap-1.5 font-body text-base font-medium text-bkui-teks sm:text-xl">
            <Image src="/icon/dashboard/calendar.svg" alt="" aria-hidden width={24} height={24} className="size-6" />
            {formatTanggal(acara.waktuMulai)}
          </p>
        </div>

        <TombolAkses tautan={acara.tautan} />
      </div>

      <p className="whitespace-pre-wrap break-words text-justify font-body text-base font-medium leading-[1.4] text-bkui-teks">
        {acara.deskripsi}
      </p>
    </article>
  );
}

/**
 * Tombol menuju ruang pertemuan.
 *
 * Selama panitia belum mengisi tautannya, tombolnya tetap ditampilkan tapi
 * mati — bukan disembunyikan. Tombol yang muncul tiba-tiba di hari-H membuat
 * peserta ragu apakah ia melewatkan sesuatu; tombol mati dengan keterangan
 * justru memberi tahu bahwa memang belum waktunya.
 */
function TombolAkses({ tautan }: { tautan: string | null }) {
  const kelas =
    "flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-b from-bkui-oren to-bkui-oren-muda px-8 font-ui text-base font-medium text-bkui-coklat";

  const ikon = (
    <Image src="/icon/dashboard/external-link.svg" alt="" aria-hidden width={24} height={24} className="size-6" />
  );

  if (!tautan) {
    return (
      <button
        type="button"
        disabled
        title="Tautan akan tersedia setelah diumumkan panitia"
        className={`${kelas} cursor-not-allowed opacity-70`}
      >
        {ikon}
        Belum tersedia
      </button>
    );
  }

  return (
    <a
      href={tautan}
      target="_blank"
      // `noopener` penting: tautannya diketik panitia dan mengarah ke luar.
      rel="noopener noreferrer"
      className={`${kelas} transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bkui-hijau`}
    >
      {ikon}
      Akses Acara
    </a>
  );
}

/** Tanggal ISO dari BE → format Indonesia beserta jamnya, dalam WIB. */
function formatTanggal(iso: string): string {
  return new Date(iso).toLocaleString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
  });
}
