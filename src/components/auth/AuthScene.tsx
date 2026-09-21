import Image from "next/image";

/** Decorative Figma artwork only; forms remain live HTML above this layer. */
export function AuthScene({ variant }: { variant: "daftar" | "masuk" }) {
  return (
    <div aria-hidden className="auth-scene pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#84c2f6]">
      <div className="absolute left-1/2 top-1/2 h-[982px] w-[1512px] shrink-0 -translate-x-1/2 -translate-y-1/2">
        <Image
          src="/image/auth/figma-masuk-cloud-texture.png"
          alt=""
          width={2382}
          height={1350}
          priority={variant === "masuk"}
          className="auth-clouds absolute left-[-320px] top-[-150px] h-[1154px] w-[2036px] max-w-none object-cover opacity-45 mix-blend-soft-light"
        />
        <Image
          src="/image/auth/figma-masuk-cloud-texture.png"
          alt=""
          width={2382}
          height={1350}
          className="auth-clouds absolute left-[-340px] top-[-170px] h-[1234px] w-[2178px] max-w-none object-cover opacity-35 mix-blend-soft-light"
        />
        <Image src="/image/auth/figma-masuk-orange-hill.svg" alt="" width={1280} height={733} className="auth-rise absolute left-[-370px] top-[570px] h-[733px] w-[1280px] max-w-none" />
        <Image src="/image/auth/figma-masuk-yellow-hill.svg" alt="" width={1966} height={1837} className="auth-rise absolute left-[-900px] top-[500px] h-[980px] w-[1050px] max-w-none rotate-[-30deg]" />
        <Image src="/icon/auth/figma-trunk.svg" alt="" width={445} height={950} className="auth-float-slow absolute left-[1244px] top-[70px] h-[950px] w-[445px]" />
        <Image src="/image/auth/figma-tree-left.png" alt="" width={794} height={974} priority={variant === "masuk"} className="auth-sway-left absolute left-0 top-0 h-[974px] w-[794px]" />
        <Image src="/image/auth/figma-tree-right.png" alt="" width={743} height={461} className="auth-sway-right absolute right-0 top-0 h-[461px] w-[743px]" />
        <Image src="/icon/auth/figma-hill-green.svg" alt="" width={1291} height={652} className="auth-rise absolute left-[345px] top-[585px] h-[652px] w-[1291px]" />
        <Image src="/image/auth/figma-masuk-bush-right.svg" alt="" width={267} height={253} className="auth-sway-right absolute left-[1100px] top-[610px] h-[253px] w-[267px] max-w-none rotate-[-70deg]" />
        <Image src="/image/auth/figma-masuk-flower-center.png" alt="" width={318} height={325} className="auth-float-slow absolute left-[620px] top-[780px] h-[276px] w-[270px] max-w-none rotate-[10deg]" />
        <Image src="/image/auth/figma-masuk-grass-wide.svg" alt="" width={2501} height={830} className="auth-grass absolute left-[-900px] top-[750px] h-[830px] w-[2501px] max-w-none rotate-[-4deg]" />
        <Image src="/image/auth/figma-masuk-flower-large.svg" alt="" width={416} height={122} className="auth-flower-sway absolute left-[1040px] top-[820px] h-[122px] w-[416px] max-w-none rotate-[-19deg]" />
        <Image src="/image/auth/figma-masuk-flower-2.svg" alt="" width={76} height={51} className="auth-flower-sway absolute left-[625px] top-[910px] h-[51px] w-[76px] max-w-none rotate-[-19deg]" />
        <Image src="/image/auth/figma-masuk-flower-3.svg" alt="" width={61} height={41} className="auth-flower-sway absolute left-[465px] top-[913px] h-[41px] w-[61px] max-w-none rotate-[-19deg]" />
        <Image src="/image/auth/figma-masuk-flower-4.svg" alt="" width={76} height={51} className="auth-flower-sway absolute left-[150px] top-[916px] h-[51px] w-[76px] max-w-none rotate-[-19deg]" />
        <Image src="/image/auth/figma-masuk-flower-5.svg" alt="" width={61} height={41} className="auth-flower-sway absolute left-[-12px] top-[918px] h-[41px] w-[61px] max-w-none rotate-[-19deg]" />
        <Image src="/image/auth/figma-masuk-flower-6.svg" alt="" width={61} height={41} className="auth-flower-sway absolute left-[102px] top-[846px] h-[41px] w-[61px] max-w-none rotate-[-19deg]" />
        <Image src="/image/auth/figma-masuk-flower-7.svg" alt="" width={61} height={41} className="auth-flower-sway absolute left-[520px] top-[840px] h-[41px] w-[61px] max-w-none rotate-[-19deg]" />
      </div>
    </div>
  );
}
