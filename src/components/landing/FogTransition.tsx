/** Gelombang putih yang menutup sambungan antarseksi tanpa menambah tinggi. */
export function FogTransition() {
  return (
    <div aria-hidden className="pointer-events-none relative z-20 h-0">
      <svg
        viewBox="0 0 1512 64"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-0 h-6 w-full -translate-y-1/2 sm:h-8 lg:h-9"
      >
        <path
          d="M0 5C132 20 215 -2 327 10C439 22 514 30 625 12C736 -6 815 21 923 9C1031 -3 1145 25 1256 10C1367 -5 1431 10 1512 4V64H0V5Z"
          fill="white"
          opacity="0.38"
        />
        <path
          d="M0 11C102 -2 196 25 303 14C410 3 494 26 605 18C716 10 793 -1 901 15C1009 31 1101 4 1208 13C1315 22 1405 -1 1512 10V64H0V11Z"
          fill="white"
          opacity="0.68"
        />
        <path
          d="M0 17C120 2 207 6 306 20C405 34 481 4 590 11C699 18 752 29 861 13C970 -3 1055 25 1162 15C1269 5 1376 1 1512 17V64H0V17Z"
          fill="white"
        />
      </svg>
    </div>
  );
}
