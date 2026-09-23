"use client";

import Image from "next/image";
import { useId, useState } from "react";

interface KolomIsianProps {
  label: string;
  /** `name` dipakai autofill browser dan nanti oleh form BE. */
  name: string;
  type?: "text" | "email" | "tel" | "password";
  placeholder?: string;
  /** Nilai `autocomplete` HTML. Wajib diisi sadar, jangan dibiarkan menebak. */
  autoComplete: string;
  /** Pesan galat untuk kolom INI. Kosong berarti tidak ada masalah. */
  galat?: string;
  /** Petunjuk singkat di bawah kolom, mis. contoh format yang diterima. */
  petunjuk?: string;
  inputMode?: "text" | "numeric" | "tel" | "email";
}

/**
 * Satu kolom isian formulir: label di atas, kotak isian di bawah.
 *
 * Label memakai `<label htmlFor>` yang benar-benar terhubung ke input, bukan
 * teks yang kebetulan diletakkan di atasnya. Bedanya nyata: mengklik label
 * memindahkan fokus ke isiannya, dan pembaca layar menyebut namanya saat
 * isian itu difokus.
 *
 * Kolom kata sandi dapat tombol mata untuk menampilkan/menyembunyikan isinya.
 * Tombolnya `<button type="button">` — tanpa `type`, tombol di dalam form
 * dianggap tombol kirim oleh browser, dan menekan mata malah mengirim formulir.
 */
export function KolomIsian({
  label,
  name,
  type = "text",
  placeholder,
  autoComplete,
  galat,
  petunjuk,
  inputMode,
}: KolomIsianProps) {
  const id = useId();
  const idGalat = `${id}-galat`;
  const idPetunjuk = `${id}-petunjuk`;
  const [terlihat, setTerlihat] = useState(false);
  const sandi = type === "password";

  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={id} className="font-body text-sm font-medium leading-[1.35] text-bkui-teks">
        {label}
      </label>

      {/*
        Tepi kolom ikut memerah saat bermasalah. Warna saja tidak pernah jadi
        satu-satunya penanda — pesannya tetap ditulis di bawah, supaya yang
        tidak bisa membedakan warna tetap tahu apa yang salah.
      */}
      <div
        className={`flex h-10 items-center gap-1 rounded-lg border px-4 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-bkui-hijau sm:gap-3 ${
          galat ? "border-2 border-bkui-galat" : "border-bkui-teks"
        }`}
      >
        <input
          id={id}
          name={name}
          type={sandi && terlihat ? "text" : type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={inputMode}
          aria-invalid={galat ? true : undefined}
          aria-describedby={galat ? idGalat : petunjuk ? idPetunjuk : undefined}
          className="h-6 min-w-0 flex-1 bg-transparent font-body text-sm font-medium leading-[1.2] text-bkui-teks placeholder:text-bkui-teks/65 focus:outline-none"
        />

        {sandi && (
          <button
            type="button"
            onClick={() => setTerlihat((v) => !v)}
            aria-label={terlihat ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
            aria-pressed={terlihat}
            className="-my-0.5 -mr-3 inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-lg transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bkui-hijau"
          >
            <Image
              src={terlihat ? "/icon/auth/mata.svg" : "/icon/auth/mata-tutup.svg"}
              alt=""
              aria-hidden
              width={24}
              height={24}
              className="size-6"
            />
          </button>
        )}
      </div>

      {/*
        Pesan galat menggantikan petunjuk, tidak menumpuknya — dua baris teks
        kecil di bawah satu kolom sempit justru saling mengaburkan.
      */}
      {galat ? (
        <p id={idGalat} role="alert" className="font-body text-xs font-medium leading-[1.35] text-bkui-galat">
          {galat}
        </p>
      ) : petunjuk ? (
        <p id={idPetunjuk} className="font-body text-xs leading-[1.35] text-bkui-teks/60">
          {petunjuk}
        </p>
      ) : null}
    </div>
  );
}
