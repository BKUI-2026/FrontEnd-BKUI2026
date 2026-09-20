"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import {
  ApiError,
  NetworkError,
  statusMentoring,
  type MentoringRegistrationState,
} from "@/lib/api";
import { useSesi } from "@/lib/auth-state";

import { LatarDashboard } from "./LatarDashboard";
import { SidebarDashboard } from "./SidebarDashboard";

/** Hasil pengambilan status mentoring dari BE. */
type HasilMuat =
  | { jenis: "memuat" }
  | { jenis: "siap"; status: MentoringRegistrationState }
  | { jenis: "galat"; pesan: string };

/** Apa yang digambar di layar — termasuk keadaan yang tidak perlu memanggil BE. */
type Keadaan = HasilMuat | { jenis: "bukanSiswa" };

/**
 * "Acara Saya" — daftar acara yang diikuti pengguna.
 *
 * Satu-satunya acara yang datanya ada di BE saat ini adalah Mentoring, dan
 * statusnya ditarik dari `GET /mentoring-registrations/me`.
 *
 * Detail sesi (tanggal, tautan Zoom, pengumuman) TIDAK ada di endpoint itu.
 * Menurut PRD, isi seperti itu dikelola Admin lewat entity Content, dan slug
 * untuk mentoring belum disepakati — jadi bagian itu masih menunggu, bukan
 * diisi tanggal karangan seperti saat slicing.
 */
export function AcaraSaya() {
  const { user } = useSesi();
  const [hasil, setHasil] = useState<HasilMuat>({ jenis: "memuat" });

  const adalahSiswa = user?.role === "STUDENT";

  useEffect(() => {
    // Endpoint mentoring hanya untuk role STUDENT — memanggilnya sebagai
    // General Public cuma menghasilkan 403 yang sudah bisa kita duga.
    if (!adalahSiswa) return;

    let masihTerpasang = true;

    statusMentoring()
      .then((status) => {
        if (masihTerpasang) setHasil({ jenis: "siap", status });
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
          <h1 className="font-display text-4xl leading-[1.4] text-bkui-teks sm:text-5xl">Acara Saya</h1>

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
                keterangan="Kamu belum mendaftar program Mentoring. Setelah mendaftar, detail sesinya akan muncul di halaman ini."
              />
            )}

            {keadaan.jenis === "siap" && keadaan.status.registered && (
              <KartuMentoring terdaftarSejak={keadaan.status.registeredAt} />
            )}
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

function KartuMentoring({ terdaftarSejak }: { terdaftarSejak: string | null }) {
  return (
    <article className="flex flex-col gap-4 rounded-3xl bg-bkui-navbar px-6 py-6 sm:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-ui text-[28px] font-semibold leading-[1.2] text-bkui-teks">Mentoring</h2>
          <p className="mt-1 flex items-center gap-1.5 font-body text-base font-medium text-bkui-teks sm:text-xl">
            <Image src="/icon/dashboard/calendar.svg" alt="" aria-hidden width={24} height={24} className="size-6" />
            {terdaftarSejak
              ? `Terdaftar ${formatTanggal(terdaftarSejak)}`
              : "Terdaftar"}
          </p>
        </div>

        <button
          type="button"
          disabled
          title="Tautan Zoom akan tersedia setelah diumumkan panitia"
          className="flex h-12 cursor-not-allowed items-center justify-center gap-2 rounded-full bg-gradient-to-b from-bkui-oren to-bkui-oren-muda px-8 font-ui text-base font-medium text-bkui-coklat opacity-70"
        >
          <Image src="/icon/dashboard/external-link.svg" alt="" aria-hidden width={24} height={24} className="size-6" />
          Akses Zoom
        </button>
      </div>

      <p className="text-justify font-body text-base font-medium leading-[1.2] text-bkui-teks">
        Pendaftaran mentoringmu sudah tercatat. Jadwal sesi dan tautan pertemuan
        akan ditampilkan di sini setelah diumumkan oleh panitia BKUI 2026.
      </p>
    </article>
  );
}

/** Tanggal ISO dari BE → format Indonesia, mis. "20 September 2026". */
function formatTanggal(iso: string): string {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
