"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { ApiError, NetworkError, riwayatMerchandise, type MerchOrder } from "@/lib/api";
import { rupiah } from "@/lib/katalog";
import { JAM_WIB, STATUS_PESANAN, linkBayar } from "@/lib/merch";
import { kelasTombol } from "@/lib/tombol";

import { LatarDashboard } from "./LatarDashboard";
import { SidebarDashboard } from "./SidebarDashboard";

type Keadaan =
  | { jenis: "memuat" }
  | { jenis: "siap"; pesanan: MerchOrder[] }
  | { jenis: "galat"; pesan: string };

const WARNA_STATUS: Record<MerchOrder["status"], string> = {
  PENDING: "bg-bkui-oren-muda text-bkui-coklat",
  PAID: "bg-bkui-hijau-tua text-white",
  EXPIRED: "bg-bkui-coklat/15 text-bkui-teks",
  CANCELLED: "bg-bkui-coklat/15 text-bkui-teks",
  FAILED: "bg-bkui-merah-muda text-bkui-merah",
};

export function PesananSaya() {
  const params = useSearchParams();
  const sorot = params.get("id") ?? params.get("order_id");
  const [keadaan, setKeadaan] = useState<Keadaan>({ jenis: "memuat" });
  const adaPending = keadaan.jenis === "siap" && keadaan.pesanan.some((p) => p.status === "PENDING");

  useEffect(() => {
    let aktif = true;
    const muat = () =>
      riwayatMerchandise().then(
        (pesanan) => aktif && setKeadaan({ jenis: "siap", pesanan }),
        (galat: unknown) => {
          if (!aktif) return;
          setKeadaan((lama) => lama.jenis === "siap" ? lama : {
            jenis: "galat",
            pesan: galat instanceof ApiError || galat instanceof NetworkError ? galat.message : "Gagal memuat pesanan.",
          });
        },
      );
    void muat();
    const timer = adaPending ? window.setInterval(() => void muat(), 5000) : undefined;
    return () => {
      aktif = false;
      if (timer) window.clearInterval(timer);
    };
  }, [adaPending]);

  return (
    <LatarDashboard>
      <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-stretch">
        <SidebarDashboard aktif="pesanan" />

        <main className="@container flex min-h-[748px] min-w-0 flex-1 flex-col items-center rounded-3xl px-0 py-8 lg:px-12 lg:py-12">
          <h1 className="font-display text-4xl leading-[1.4] text-bkui-teks sm:text-5xl">Pesanan Merch</h1>

          <div className="mt-6 flex w-full flex-col gap-6">
            {keadaan.jenis === "memuat" && (
              <p role="status" className="py-12 text-center font-body text-base font-medium text-bkui-teks">Memuat pesanan…</p>
            )}

            {keadaan.jenis === "galat" && (
              <p role="alert" className="py-12 text-center font-body text-base font-medium text-bkui-galat">{keadaan.pesan}</p>
            )}

            {keadaan.jenis === "siap" && keadaan.pesanan.length === 0 && (
              <article className="flex flex-col items-center gap-3 rounded-3xl bg-bkui-navbar px-6 py-8 text-center sm:px-8">
                <h2 className="font-ui text-[28px] font-semibold leading-[1.2] text-bkui-teks">Belum ada pesanan</h2>
                <p className="font-body text-base font-medium text-bkui-teks">Pesanan merchandise yang kamu buat akan muncul di sini.</p>
                <Link href="/merchandise" className={`${kelasTombol("sekunder")} mt-2`}>Lihat Merchandise</Link>
              </article>
            )}

            {keadaan.jenis === "siap" && keadaan.pesanan.map((pesanan) => (
              <KartuPesanan key={pesanan.id} pesanan={pesanan} disorot={pesanan.id === sorot} />
            ))}
          </div>
        </main>
      </div>
    </LatarDashboard>
  );
}

function KartuPesanan({ pesanan, disorot }: { pesanan: MerchOrder; disorot: boolean }) {
  const url = linkBayar(pesanan);
  return (
    <article
      aria-label={`Pesanan ${pesanan.id}`}
      className={`flex flex-col gap-4 rounded-3xl bg-bkui-navbar px-6 py-6 text-bkui-teks sm:px-8 ${disorot ? "ring-4 ring-bkui-oren" : ""}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="break-all font-body text-sm font-medium leading-[1.35]">No. {pesanan.id}</p>
          <p className="font-body text-sm font-medium leading-[1.35]">{JAM_WIB.format(new Date(pesanan.createdAt))} WIB</p>
        </div>
        <span className={`rounded-full px-4 py-1.5 font-ui text-sm font-semibold ${WARNA_STATUS[pesanan.status]}`} aria-live="polite">
          {STATUS_PESANAN[pesanan.status]}
        </span>
      </div>

      <ul className="divide-y divide-bkui-coklat/15">
        {pesanan.items.map((item) => (
          <li key={item.sku} className="flex flex-wrap justify-between gap-2 py-3 font-body text-xl font-medium leading-[1.2]">
            <span>{item.productName} × {item.quantity}</span>
            <span>{rupiah(item.subtotal)}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-ui text-[28px] font-semibold leading-[1.2]">{rupiah(pesanan.grossAmount)}</p>
        <p className="font-body text-sm font-medium leading-[1.35]">
          Ambil: {pesanan.pickupSession}{pesanan.pickupName ? ` · diwakilkan ${pesanan.pickupName}` : ""}
        </p>
      </div>

      {pesanan.status === "PENDING" && (
        <div className="flex flex-wrap items-center gap-3">
          <p className="font-body text-sm font-medium leading-[1.35]">Bayar sebelum {JAM_WIB.format(new Date(pesanan.expiresAt))} WIB.</p>
          {url && (
            <a href={url} className={kelasTombol("sekunder")}>
              Lanjut Bayar QRIS
            </a>
          )}
        </div>
      )}
      {pesanan.status === "PAID" && (
        <p className="font-body text-sm font-medium leading-[1.35]">Tunjukkan nomor pesanan ini di booth BKUI saat mengambil merchandise.</p>
      )}
    </article>
  );
}
