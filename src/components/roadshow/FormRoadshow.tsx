"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import type { FormEvent } from "react";

import { ApiError, NetworkError, daftarRoadshow } from "@/lib/api";
import * as v from "@/lib/validasi";

interface KolomRoadshowProps {
  label: string;
  name: string;
  placeholder: string;
  type?: "text" | "email" | "tel" | "number";
  autoComplete: string;
  pencarian?: boolean;
  galat?: string;
  petunjuk?: string;
}

function KolomRoadshow({
  label,
  name,
  placeholder,
  type = "text",
  autoComplete,
  pencarian = false,
  galat,
  petunjuk,
}: KolomRoadshowProps) {
  const id = useId();

  return (
    <div className="flex w-full flex-col gap-2">
      <label
        htmlFor={id}
        className="font-body text-base font-medium leading-[1.2] text-bkui-teks"
      >
        {label}
      </label>
      <div
        className={`flex h-11 items-center rounded-xl border-2 px-4 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-bkui-terang ${
          galat ? "border-bkui-galat" : "border-bkui-teks"
        }`}
      >
        <input
          id={id}
          name={name}
          type={type}
          min={type === "number" ? 1 : undefined}
          autoComplete={autoComplete}
          placeholder={placeholder}
          aria-invalid={galat ? true : undefined}
          aria-describedby={galat ? `${id}-galat` : petunjuk ? `${id}-petunjuk` : undefined}
          className="h-6 min-w-0 flex-1 bg-transparent font-body text-base font-medium leading-[1.2] text-bkui-teks placeholder:text-bkui-teks/45 focus:outline-none"
        />
        {pencarian && (
          <Image
            src="/icon/roadshow/pencarian.svg"
            alt=""
            aria-hidden
            width={28}
            height={28}
            className="size-7 shrink-0"
          />
        )}
      </div>

      {galat ? (
        <p id={`${id}-galat`} role="alert" className="font-body text-xs font-medium leading-[1.35] text-bkui-galat">
          {galat}
        </p>
      ) : petunjuk ? (
        <p id={`${id}-petunjuk`} className="font-body text-xs leading-[1.35] text-bkui-teks/60">
          {petunjuk}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Form publik School Roadshow dari Figma node 691:1896.
 *
 * Terhubung ke `POST /school-roadshow-registrations` (BE ARCH-0003). Tetap
 * publik tanpa akun: PRD menegaskan PJ Sekolah tidak butuh role khusus.
 *
 * Yang terjadi setelah submit: BE menyimpan datanya, mengirim email konfirmasi
 * ke email sekolah, lalu meneruskan datanya ke Admin Web — semuanya di luar
 * jalur permintaan ini, jadi halaman success muncul begitu datanya tersimpan.
 */
export function FormRoadshow() {
  const router = useRouter();
  const [pesan, setPesan] = useState("");
  /** Galat per kolom — ditampilkan di bawah kolomnya, bukan dikumpulkan di kaki. */
  const [galatKolom, setGalatKolom] = useState<v.Galat>({});
  const [sedangKirim, setSedangKirim] = useState(false);

  async function kirim(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sedangKirim) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const teks = (nama: string) => String(data.get(nama) ?? "").trim();

    // Diperiksa sendiri, tidak memakai `reportValidity()` bawaan browser:
    // gelembung bawaan muncul satu per satu, bahasanya ikut bahasa browser
    // (sering Inggris), dan hilang begitu diklik. Pesan di bawah kolom tetap
    // terbaca sampai diperbaiki.
    const galat = v.kumpulkan({
      namaSekolah: v.panjangMinimal(teks("namaSekolah"), 3, "Nama sekolah"),
      alamatSekolah: v.panjangMinimal(teks("alamatSekolah"), 5, "Alamat sekolah"),
      emailSekolah: v.email(teks("emailSekolah"), "Email sekolah"),
      jumlahTargetSiswa: v.jumlahPositif(teks("jumlahTargetSiswa"), "Jumlah target siswa"),
      namaPenanggungJawab: v.panjangMinimal(teks("namaPenanggungJawab"), 2, "Nama penanggung jawab"),
      nomorHp: v.telepon(teks("nomorHp"), "Nomor HP"),
      emailPenanggungJawab: v.email(teks("emailPenanggungJawab"), "Email penanggung jawab"),
    });
    setGalatKolom(galat);
    if (v.adaGalat(galat)) {
      setPesan("");
      v.fokuskanGalatPertama(form, galat);
      return;
    }

    setPesan("");
    setSedangKirim(true);

    try {
      await daftarRoadshow({
        schoolName: teks("namaSekolah"),
        schoolAddress: teks("alamatSekolah"),
        schoolEmail: teks("emailSekolah"),
        targetStudentCount: Number(teks("jumlahTargetSiswa")),
        pjName: teks("namaPenanggungJawab"),
        pjEmail: teks("emailPenanggungJawab"),
        pjPhone: v.normalisasiTelepon(teks("nomorHp")),
      });

      router.push("/school-roadshow/success");
    } catch (galat) {
      if (galat instanceof ApiError) {
        setPesan(
          galat.terlaluSering
            ? "Terlalu banyak pendaftaran dari jaringan ini. Coba lagi sebentar lagi."
            : galat.messages.join(" "),
        );
      } else if (galat instanceof NetworkError) {
        setPesan(galat.message);
      } else {
        setPesan("Terjadi kesalahan tak terduga. Coba lagi.");
      }
      setSedangKirim(false);
    }
  }

  return (
    <form
      onSubmit={kirim}
      noValidate
      className="flex w-full flex-col items-center rounded-3xl bg-bkui-krem-kartu px-6 pb-8 pt-10 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] sm:px-9 lg:pt-16"
    >
      <div className="grid w-full max-w-[880px] gap-10 lg:grid-cols-[392px_1px_392px] lg:gap-12">
        <fieldset className="flex min-w-0 flex-col gap-6">
          <legend className="mb-6 w-full text-center font-ui text-[28px] font-semibold leading-[1.2] text-bkui-teks-tua">
            Detail Sekolah
          </legend>
          <KolomRoadshow label="Nama Sekolah" name="namaSekolah" galat={galatKolom.namaSekolah} placeholder="Contoh: SMA Negeri 8 Jakarta" autoComplete="organization" pencarian />
          <KolomRoadshow label="Alamat Sekolah" name="alamatSekolah" galat={galatKolom.alamatSekolah} placeholder="Contoh: Jl. Taman Bukit Duri No. 2" autoComplete="street-address" />
          <KolomRoadshow label="Email Sekolah" name="emailSekolah" galat={galatKolom.emailSekolah} type="email" placeholder="Contoh: humas@sekolah.sch.id" autoComplete="email" />
          <KolomRoadshow label="Jumlah Target Siswa" name="jumlahTargetSiswa" galat={galatKolom.jumlahTargetSiswa} type="number" placeholder="Contoh: 120" autoComplete="off" />
        </fieldset>

        <div aria-hidden className="hidden w-px bg-bkui-teks lg:block" />

        <fieldset className="flex min-w-0 flex-col gap-6">
          <legend className="mb-6 w-full text-center font-ui text-[28px] font-semibold leading-[1.2] text-bkui-teks-tua">
            Kontak Penanggung Jawab
          </legend>
          <KolomRoadshow label="Nama Lengkap" name="namaPenanggungJawab" galat={galatKolom.namaPenanggungJawab} placeholder="Contoh: Andi Pratama" autoComplete="name" />
          <KolomRoadshow label="Nomor HP" name="nomorHp" galat={galatKolom.nomorHp} petunjuk="Boleh diawali 08 atau +62." type="tel" placeholder="Contoh: 0812 3456 7890" autoComplete="tel" />
          <KolomRoadshow label="Email" name="emailPenanggungJawab" galat={galatKolom.emailPenanggungJawab} type="email" placeholder="Contoh: andi@email.com" autoComplete="email" />
        </fieldset>
      </div>

      <div className="mt-12 flex min-h-16 flex-col items-center justify-end gap-3">
        <p className="rounded-3xl bg-[#cc0000] px-3 py-1 text-center font-body text-sm font-medium leading-[1.2] text-bkui-netral sm:text-base">
          Form ini hanya dapat diisi oleh perwakilan guru pada sekolah yang didaftarkan.
        </p>
        <button
          type="submit"
          disabled={sedangKirim}
          aria-busy={sedangKirim}
          className="tombol-kertas h-16 rounded-full bg-gradient-to-b from-bkui-oren to-bkui-oren-muda px-9 font-ui text-xl font-medium capitalize leading-none text-bkui-coklat focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bkui-terang disabled:cursor-wait disabled:opacity-70"
        >
          {sedangKirim ? "Mengirim…" : "Daftar"}
        </button>
        <p role="alert" className="max-w-[620px] text-center font-body text-sm font-medium text-bkui-teks">
          {pesan}
        </p>
      </div>
    </form>
  );
}
