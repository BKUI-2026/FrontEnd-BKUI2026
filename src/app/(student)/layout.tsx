import type { ReactNode } from "react";

import { PenjagaSesi } from "@/components/auth/PenjagaSesi";

/**
 * Layout route group (student).
 *
 * Semua halaman di grup ini butuh akun, jadi penjaganya dipasang sekali di
 * sini alih-alih diulang di tiap halaman — halaman baru yang ditambahkan ke
 * grup ini otomatis ikut terjaga.
 *
 * Catatan: "butuh akun" belum tentu sama dengan "role Student". Halaman Profil
 * milik semua pemegang akun; yang benar-benar mensyaratkan role STUDENT hanya
 * Mentoring, dan itu dijaga BE lewat 403.
 */
export default function StudentLayout({ children }: { children: ReactNode }) {
  return <PenjagaSesi>{children}</PenjagaSesi>;
}
