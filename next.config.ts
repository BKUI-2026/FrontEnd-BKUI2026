import { networkInterfaces } from "node:os";
import type { NextConfig } from "next";

/**
 * Daftar alamat IPv4 mesin ini di jaringan lokal (mis. 192.168.1.9).
 *
 * Dibaca otomatis, bukan ditulis manual, karena alamat dari router bisa berubah
 * sewaktu-waktu — kalau di-hardcode, error "Blocked cross-origin request" bakal
 * balik lagi tiap IP-nya ganti dan orang berikutnya harus menebak sendiri.
 */
function alamatLokal(): string[] {
  return Object.values(networkInterfaces())
    .flat()
    .filter((n) => n && n.family === "IPv4" && !n.internal)
    .map((n) => n!.address);
}

const nextConfig: NextConfig = {
  /**
   * Izinkan dev server diakses dari device lain di jaringan yang sama (HP,
   * tablet, laptop partner) lewat http://<ip-lokal>:3001.
   *
   * Tanpa ini Next 16 memblokir permintaan ke /_next/* dari host selain
   * localhost, jadi halamannya kebuka tapi CSS & JS-nya gagal dimuat.
   *
   * Hanya berlaku di `next dev` — tidak berpengaruh sama sekali ke production
   * build, jadi aman ditinggal di sini.
   */
  allowedDevOrigins: alamatLokal(),
};

export default nextConfig;
