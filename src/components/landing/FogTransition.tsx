/** Gelombang putih yang memudar ke transparan di sambungan antarseksi. */
export function FogTransition() {
  return (
    <div aria-hidden className="pointer-events-none relative z-20 h-0">
      <svg
        viewBox="0 0 1512 64"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-0 h-6 w-full -translate-y-1/2 sm:h-8 lg:h-9"
      >
        <defs>
          {/* Setiap lapis kabut tetap punya intensitas sendiri, lalu memudar
              vertikal agar batas section tidak tampak seperti blok putih. */}
          <linearGradient id="fog-back" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.38" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="fog-middle" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.68" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="fog-front" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0 5C132 20 215 -2 327 10C439 22 514 30 625 12C736 -6 815 21 923 9C1031 -3 1145 25 1256 10C1367 -5 1431 10 1512 4V47C1388 58 1294 42 1181 51C1068 60 976 39 862 49C748 59 651 43 539 52C427 61 316 41 207 50C98 59 43 48 0 52V5Z"
          fill="url(#fog-back)"
        />
        <path
          d="M0 11C102 -2 196 25 303 14C410 3 494 26 605 18C716 10 793 -1 901 15C1009 31 1101 4 1208 13C1315 22 1405 -1 1512 10V51C1410 40 1321 62 1214 52C1107 42 1019 60 908 50C797 40 711 61 603 51C495 41 401 58 294 49C187 40 99 60 0 50V11Z"
          fill="url(#fog-middle)"
        />
        <path
          d="M0 17C120 2 207 6 306 20C405 34 481 4 590 11C699 18 752 29 861 13C970 -3 1055 25 1162 15C1269 5 1376 1 1512 17V45C1391 58 1299 48 1194 42C1089 36 997 59 889 47C781 35 690 55 584 45C478 35 392 57 282 46C172 35 87 57 0 45V17Z"
          fill="url(#fog-front)"
        />
      </svg>
    </div>
  );
}
