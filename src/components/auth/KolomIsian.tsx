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
}: KolomIsianProps) {
  const id = useId();
  const [terlihat, setTerlihat] = useState(false);
  const sandi = type === "password";

  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={id} className="font-body text-base font-medium leading-[1.2] text-bkui-teks">
        {label}
      </label>

      <div className="flex items-center gap-3 rounded-xl border-2 border-bkui-teks px-4 py-2 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-bkui-hijau">
        <input
          id={id}
          name={name}
          type={sandi && terlihat ? "text" : type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="h-6 min-w-0 flex-1 bg-transparent font-body text-base font-medium leading-[1.2] text-bkui-teks placeholder:text-bkui-teks/45 focus:outline-none"
        />

        {sandi && (
          <button
            type="button"
            onClick={() => setTerlihat((v) => !v)}
            aria-label={terlihat ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
            aria-pressed={terlihat}
            className="shrink-0 cursor-pointer rounded transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bkui-hijau"
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
    </div>
  );
}
