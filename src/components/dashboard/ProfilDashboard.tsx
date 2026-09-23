"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import { ApiError, NetworkError, simpanProfil } from "@/lib/api";
import * as v from "@/lib/validasi";
import { useSesi } from "@/lib/auth-state";

import { LatarDashboard } from "./LatarDashboard";
import { SidebarDashboard } from "./SidebarDashboard";

/**
 * Empat kolom dari Figma, dipetakan ke field profil di BE.
 *
 * Email sengaja `hanyaBaca`: BE tidak menerima perubahan email lewat
 * `PATCH /users/me` — mengganti alamat masuk seseorang butuh verifikasi
 * kepemilikan alamat barunya, dan alur itu belum ada. Kolomnya tetap
 * ditampilkan sesuai desain, hanya tidak bisa disunting.
 */
const KOLOM_PROFIL = [
  { label: "Nama Lengkap", name: "fullName", type: "text", autoComplete: "name", placeholder: "Contoh: Kasandra Putri", wajib: true, hanyaBaca: false },
  { label: "Sekolah", name: "institution", type: "text", autoComplete: "organization", placeholder: "Contoh: SMA Negeri 8 Jakarta", wajib: false, hanyaBaca: false },
  { label: "Nomor HP", name: "phoneNumber", type: "tel", autoComplete: "tel", placeholder: "Contoh: 0812 3456 7890", wajib: false, hanyaBaca: false },
  { label: "Email", name: "email", type: "email", autoComplete: "email", placeholder: "—", wajib: false, hanyaBaca: true },
] as const;

export function ProfilDashboard() {
  const { user, perbaruiProfil } = useSesi();
  const [sedangEdit, setSedangEdit] = useState(false);
  const [sedangSimpan, setSedangSimpan] = useState(false);
  const [pesan, setPesan] = useState("");
  const [galat, setGalat] = useState("");
  /** Galat per kolom — ditampilkan di bawah kolomnya masing-masing. */
  const [galatKolom, setGalatKolom] = useState<v.Galat>({});

  // PenjagaSesi memastikan halaman ini hanya dirender saat sudah masuk, jadi
  // `user` praktis selalu ada di sini. Penjagaan ini untuk meyakinkan compiler.
  if (!user) return null;

  const nilaiAwal: Record<string, string> = {
    fullName: user.fullName,
    institution: user.institution ?? "",
    phoneNumber: user.phoneNumber ?? "",
    email: user.email,
  };

  async function simpan(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sedangSimpan) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const teks = (nama: string) => String(data.get(nama) ?? "").trim();

    // Nomor HP opsional: kalau dikosongkan itu memang cara menghapusnya, jadi
    // yang diperiksa hanya kalau ada isinya.
    const nomor = teks("phoneNumber");
    const galatBaru = v.kumpulkan({
      fullName: v.panjangMinimal(teks("fullName"), 2, "Nama lengkap"),
      phoneNumber: nomor ? v.telepon(nomor, "Nomor HP") : null,
    });
    setGalatKolom(galatBaru);
    if (v.adaGalat(galatBaru)) {
      setGalat("");
      setPesan("");
      v.fokuskanGalatPertama(form, galatBaru);
      return;
    }

    setGalat("");
    setPesan("");
    setSedangSimpan(true);

    try {
      const terbaru = await simpanProfil({
        fullName: teks("fullName"),
        // Dikirim apa adanya termasuk saat dikosongkan — itu cara pengguna
        // menghapus isian yang sebelumnya terisi.
        institution: teks("institution"),
        // Dinormalkan ke +62; BE menolak bentuk lain, dan 08 justru yang
        // paling lazim diketik.
        phoneNumber: nomor ? v.normalisasiTelepon(nomor) : "",
      });

      perbaruiProfil(terbaru);
      setSedangEdit(false);
      setPesan("Perubahan profil tersimpan.");
    } catch (kesalahan) {
      if (kesalahan instanceof ApiError) {
        setGalat(kesalahan.messages.join(" "));
      } else if (kesalahan instanceof NetworkError) {
        setGalat(kesalahan.message);
      } else {
        setGalat("Terjadi kesalahan tak terduga. Coba lagi.");
      }
    } finally {
      setSedangSimpan(false);
    }
  }

  return (
    <LatarDashboard>
      <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-stretch">
        <SidebarDashboard aktif="profil" />

        <form onSubmit={simpan} className="flex min-h-[748px] min-w-0 flex-1 flex-col items-center justify-center gap-10 rounded-3xl bg-bkui-navbar px-6 py-12 sm:px-10 lg:px-12">
          <div className="flex w-full max-w-[392px] flex-col items-center gap-6">
            <h1 className="font-display text-4xl leading-[1.4] text-bkui-teks sm:text-5xl">Profil Saya</h1>

            <div className="flex w-full flex-col gap-6">
              {KOLOM_PROFIL.map((kolom) => {
                const bisaDisunting = sedangEdit && !kolom.hanyaBaca;
                return (
                  <label key={kolom.name} className="flex flex-col gap-2 font-body text-base font-medium leading-[1.2] text-bkui-teks">
                    {kolom.label}
                    <input
                      // `key` pada nilai awal: saat keluar dari mode edit,
                      // input dipasang ulang supaya isiannya kembali ke data
                      // tersimpan — pembatalan yang tidak menyisakan ketikan.
                      key={`${kolom.name}-${sedangEdit}`}
                      name={kolom.name}
                      type={kolom.type}
                      autoComplete={kolom.autoComplete}
                      defaultValue={nilaiAwal[kolom.name]}
                      placeholder={bisaDisunting ? kolom.placeholder : "Belum diisi"}
                      readOnly={!bisaDisunting}
                      aria-invalid={galatKolom[kolom.name] ? true : undefined}
                      aria-describedby={
                        galatKolom[kolom.name]
                          ? `galat-${kolom.name}`
                          : kolom.hanyaBaca && sedangEdit
                            ? "ket-email"
                            : undefined
                      }
                      className={`h-11 rounded-xl border-2 bg-transparent px-4 font-body text-base font-medium text-bkui-teks placeholder:text-bkui-teks/45 focus:outline-2 focus:outline-offset-2 focus:outline-bkui-hijau ${galatKolom[kolom.name] ? "border-bkui-galat" : "border-bkui-teks"} ${!bisaDisunting ? "cursor-default" : ""} ${kolom.hanyaBaca && sedangEdit ? "opacity-70" : ""}`}
                    />
                    {galatKolom[kolom.name] && (
                      <span id={`galat-${kolom.name}`} role="alert" className="font-body text-xs font-medium leading-[1.35] text-bkui-galat">
                        {galatKolom[kolom.name]}
                      </span>
                    )}
                  </label>
                );
              })}

              {sedangEdit && (
                <p id="ket-email" className="-mt-3 font-body text-sm leading-[1.4] text-bkui-teks/70">
                  Email tidak bisa diubah sendiri. Hubungi panitia bila alamatmu salah.
                </p>
              )}
            </div>
          </div>

          {sedangEdit ? (
            <div className="flex flex-wrap justify-center gap-4">
              <button type="button" disabled={sedangSimpan} onClick={() => { setSedangEdit(false); setPesan(""); setGalat(""); setGalatKolom({}); }} className="tombol-kertas h-16 rounded-full bg-gradient-to-b from-bkui-button to-bkui-navbar px-9 font-ui text-xl font-medium text-bkui-teks disabled:opacity-60">
                Batal
              </button>
              <button type="submit" disabled={sedangSimpan} aria-busy={sedangSimpan} className="tombol-kertas h-16 rounded-full bg-gradient-to-b from-bkui-oren to-bkui-oren-muda px-9 font-ui text-xl font-medium text-bkui-coklat disabled:cursor-wait disabled:opacity-70">
                {sedangSimpan ? "Menyimpan…" : "Simpan"}
              </button>
            </div>
          ) : (
            <button type="button" onClick={() => { setSedangEdit(true); setPesan(""); setGalat(""); setGalatKolom({}); }} className="tombol-kertas h-16 rounded-full bg-gradient-to-b from-bkui-button to-bkui-navbar px-9 font-ui text-xl font-medium text-bkui-teks">
              Edit Profil
            </button>
          )}

          {galat && <p role="alert" className="-mt-6 max-w-md text-center font-body text-sm font-medium text-bkui-galat">{galat}</p>}
          {pesan && <p role="status" className="-mt-6 max-w-md text-center font-body text-sm font-medium text-bkui-teks">{pesan}</p>}
        </form>
      </div>
    </LatarDashboard>
  );
}
