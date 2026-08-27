/**
 * Tombol "Masuk sebagai Siswa" — muncul saat pengunjung belum login.
 *
 * MASIH DINONAKTIFKAN. Endpoint auth di BE belum ada (per BE ARCH-0002, satu-
 * satunya endpoint yang jalan adalah GET /api/v1/health), jadi belum ada tujuan
 * yang bisa dituju. Sengaja `disabled` daripada menebak URL login atau bikin
 * rute yang ujungnya 404.
 *
 * Warnanya sengaja TIDAK dipudarkan meski disabled, biar tampilannya tetap sama
 * dengan Figma. Yang menandakan tombol ini belum aktif: bentuk kursor + tooltip.
 *
 * Begitu kontrak auth BE rilis: catat di integrations/backend-api-contract.md,
 * lalu ganti <button> ini jadi <Link> / pemicu flow Google SSO.
 */
export function ButtonMasukSiswa({ className }: { className?: string }) {
  return (
    <button
      type="button"
      disabled
      title="Login belum tersedia — endpoint auth di BE belum ada"
      className={`cursor-not-allowed rounded-full bg-bkui-button px-6 py-3 text-base font-medium text-black ${className ?? ""}`}
    >
      Masuk sebagai Siswa
    </button>
  );
}
