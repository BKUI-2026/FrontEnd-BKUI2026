/** Kabut CSS di batas After Movie dan Arah Petualangan; bukan aset foto. */
export function FogTransition() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 -bottom-10 z-20 h-28 overflow-hidden bg-[linear-gradient(to_bottom,transparent_0%,rgba(236,249,255,0.6)_42%,rgba(132,194,246,0.74)_100%)] [mask-image:linear-gradient(to_bottom,transparent,black_28%,black_70%,transparent)] sm:-bottom-14 sm:h-40"
    >
      <div className="absolute -bottom-10 -left-[8%] h-24 w-[50%] rounded-[50%] bg-[#e9f7ff]/65 blur-2xl sm:h-32" />
      <div className="absolute -bottom-8 left-[25%] h-24 w-[55%] rounded-[50%] bg-[#f2fbff]/55 blur-3xl sm:h-36" />
      <div className="absolute -bottom-10 -right-[12%] h-28 w-[50%] rounded-[50%] bg-[#e6f5ff]/70 blur-2xl sm:h-36" />
    </div>
  );
}
