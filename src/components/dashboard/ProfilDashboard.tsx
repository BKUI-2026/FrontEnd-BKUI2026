"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import { LatarDashboard } from "./LatarDashboard";
import { SidebarDashboard } from "./SidebarDashboard";

const KOLOM_PROFIL = [
  { label: "Nama Lengkap", name: "nama", type: "text", autoComplete: "name", placeholder: "Contoh: Kasandra Putri" },
  { label: "Sekolah", name: "sekolah", type: "text", autoComplete: "organization", placeholder: "Contoh: SMA Negeri 8 Jakarta" },
  { label: "Nomor HP", name: "telepon", type: "tel", autoComplete: "tel", placeholder: "Contoh: 0812 3456 7890" },
  { label: "Email", name: "email", type: "email", autoComplete: "email", placeholder: "Contoh: nama@email.com" },
] as const;

export function ProfilDashboard() {
  const [sedangEdit, setSedangEdit] = useState(false);
  const [pesan, setPesan] = useState("");

  function simpan(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setPesan("Perubahan belum dikirim karena layanan profil di server belum tersedia.");
  }

  return (
    <LatarDashboard>
      <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-stretch">
        <SidebarDashboard aktif="profil" />

        <form onSubmit={simpan} className="flex min-h-[748px] min-w-0 flex-1 flex-col items-center justify-center gap-10 rounded-3xl bg-bkui-navbar px-6 py-12 sm:px-10 lg:px-12">
          <div className="flex w-full max-w-[392px] flex-col items-center gap-6">
            <h1 className="font-display text-4xl leading-[1.4] text-bkui-teks sm:text-5xl">Profil Saya</h1>

            <div className="flex w-full flex-col gap-6">
              {KOLOM_PROFIL.map((kolom) => (
                <label key={kolom.name} className="flex flex-col gap-2 font-body text-base font-medium leading-[1.2] text-bkui-teks">
                  {kolom.label}
                  <input
                    name={kolom.name}
                    type={kolom.type}
                    autoComplete={kolom.autoComplete}
                    placeholder={sedangEdit ? kolom.placeholder : "Belum diisi"}
                    readOnly={!sedangEdit}
                    required={sedangEdit}
                    className={`h-11 rounded-xl border-2 border-bkui-teks bg-transparent px-4 font-body text-base font-medium text-bkui-teks placeholder:text-bkui-teks/45 focus:outline-2 focus:outline-offset-2 focus:outline-bkui-hijau ${!sedangEdit ? "cursor-default" : ""}`}
                  />
                </label>
              ))}
            </div>
          </div>

          {sedangEdit ? (
            <div className="flex flex-wrap justify-center gap-4">
              <button type="button" onClick={() => { setSedangEdit(false); setPesan(""); }} className="tombol-kertas h-16 rounded-full bg-gradient-to-b from-bkui-button to-bkui-navbar px-9 font-ui text-xl font-medium text-bkui-teks">
                Batal
              </button>
              <button type="submit" className="tombol-kertas h-16 rounded-full bg-gradient-to-b from-bkui-oren to-bkui-oren-muda px-9 font-ui text-xl font-medium text-bkui-coklat">
                Simpan
              </button>
            </div>
          ) : (
            <button type="button" onClick={() => setSedangEdit(true)} className="tombol-kertas h-16 rounded-full bg-gradient-to-b from-bkui-button to-bkui-navbar px-9 font-ui text-xl font-medium text-bkui-teks">
              Edit Profil
            </button>
          )}

          {pesan && <p role="status" className="-mt-6 max-w-md text-center font-body text-sm font-medium text-bkui-teks">{pesan}</p>}
        </form>
      </div>
    </LatarDashboard>
  );
}
