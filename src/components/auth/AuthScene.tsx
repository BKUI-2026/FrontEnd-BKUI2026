import Image from "next/image";

/** Background artwork shared by the Masuk and Daftar pages. */
export function AuthScene({ variant }: { variant: "daftar" | "masuk" }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-bkui-button"
    >
      <Image
        src="/image/auth/auth-background.png"
        alt=""
        fill
        priority={variant === "masuk"}
        sizes="100vw"
        className="object-cover object-center"
      />
    </div>
  );
}
