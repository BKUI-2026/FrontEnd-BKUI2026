import Image from "next/image";
import Link from "next/link";

/**
 * Ikon avatar di ujung kanan navbar — muncul saat sudah login (Student).
 * Mengarah ke halaman Profile.
 *
 * Aset: public/logo/lucide/circle-user-round.svg
 *
 * Belum menampilkan foto profil user, karena endpoint profil di BE belum ada
 * dan shape response-nya tidak boleh dikarang duluan.
 */
export function AvatarProfil({ ukuran = 44 }: { ukuran?: number }) {
  return (
    <Link href="/profile" aria-label="Buka halaman Profile">
      <Image
        src="/logo/lucide/circle-user-round.svg"
        alt=""
        width={ukuran}
        height={ukuran}
        aria-hidden
      />
    </Link>
  );
}
