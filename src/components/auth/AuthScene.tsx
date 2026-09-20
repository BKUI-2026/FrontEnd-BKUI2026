import Image from "next/image";

/** Decorative Figma artwork only; forms remain live HTML above this layer. */
export function AuthScene({ variant }: { variant: "daftar" | "masuk" }) {
  return (
    <div aria-hidden className="auth-scene pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#84c2f6]">
      <div className="absolute left-1/2 top-1/2 h-[982px] w-[1512px] shrink-0 -translate-x-1/2 -translate-y-1/2">
        {variant === "daftar" && (
          <Image src="/image/auth/figma-daftar-scene.png" alt="" fill sizes="1512px" priority className="hidden object-cover sm:block" />
        )}
        <div className={variant === "daftar" ? "sm:hidden" : ""}>
            <Image src="/icon/auth/figma-trunk.svg" alt="" width={445} height={950} className="absolute left-[1244px] top-[70px] h-[950px] w-[445px]" />
            <Image src="/image/auth/figma-tree-left.png" alt="" width={794} height={974} className="absolute left-0 top-0 h-[974px] w-[794px]" />
            <Image src="/image/auth/figma-tree-right.png" alt="" width={743} height={461} className="absolute right-0 top-0 h-[461px] w-[743px]" />
            <Image src="/icon/auth/figma-ground.svg" alt="" width={1280} height={733} className="absolute left-[-350px] top-[570px] h-[733px] w-[1280px]" />
            <Image src="/icon/auth/figma-hill-green.svg" alt="" width={1291} height={652} className="absolute left-[345px] top-[585px] h-[652px] w-[1291px]" />
            <Image src="/icon/auth/figma-grass.svg" alt="" width={2501} height={830} className="absolute left-[-900px] top-[750px] h-[830px] w-[2501px]" />
        </div>
      </div>
      <Image
        src="/image/landing/awan-tekstur.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-35 mix-blend-soft-light"
      />
    </div>
  );
}
