/**
 * Placeholder sementara untuk halaman yang rutenya sudah ada tapi UI-nya belum
 * dislicing dari Figma (FE-0002).
 *
 * Ini BUKAN komponen desain — tampilannya sengaja polos supaya tidak ada yang
 * mengira ini hasil implementasi Figma. Hapus pemakaiannya di tiap halaman
 * begitu slicing halaman itu dimulai.
 */

interface PagePlaceholderProps {
  /** Nama halaman sesuai istilah PRD. */
  title: string;
  /** Siapa yang boleh mengakses — General Public atau Student. */
  akses: "General Public" | "Student";
  /** Ringkas: halaman ini nanti isinya apa. */
  keterangan: string;
}

export function PagePlaceholder({
  title,
  akses,
  keterangan,
}: PagePlaceholderProps) {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-3 px-6 py-16">
      <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
        Akses: {akses}
      </p>
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-gray-600">{keterangan}</p>
      <p className="mt-4 border-l-2 border-gray-300 pl-3 text-sm text-gray-500">
        Placeholder — UI belum dislicing dari Figma. Rute ini dibuat di FE-0002
        (scaffold framework &amp; routing skeleton).
      </p>
    </main>
  );
}
