const shapes = {
  cockroach: (
    <>
      <path d="M16 34c-5-1-9 2-11 6M48 34c5-1 9 2 11 6" />
      <path d="M22 30c-1-8 1-14 6-16M42 30c1-8-1-14-6-16" />
      <ellipse cx="32" cy="40" rx="13" ry="9" />
      <ellipse cx="32" cy="30" rx="6" ry="4.5" />
      <path d="M22 46c-3 5-1 9 3 11M42 46c3 5 1 9-3 11" />
      <path d="M20 38c-6 1-8 5-8 8M44 38c6 1 8 5 8 8" />
      <circle cx="29" cy="29.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="35" cy="29.5" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  bedbug: (
    <>
      <path d="M14 30c2-8 8-12 18-12s16 4 18 12" />
      <ellipse cx="32" cy="36" rx="16" ry="10" />
      <path d="M18 28 12 20M24 24 22 14M32 22V12M40 24l2-10M46 28l6-8" />
      <path d="M16 40 10 48M22 44l-4 8M42 44l4 8M48 40l6 8" />
      <path d="M26 34h12" />
    </>
  ),
  rodent: (
    <>
      <path d="M12 38c2-12 10-18 20-18 6 0 10 2 14 2 6 0 10 5 10 10 0 9-8 16-18 16-5 0-8-2-12-2-3 1-6 1-8-1-3-2-6-3-6-7Z" />
      <circle cx="30" cy="30" r="1.3" fill="currentColor" stroke="none" />
      <path d="M46 28c6-2 10 0 12 3" />
      <path d="M18 46c-6 4-10 10-8 14" />
      <path d="M40 22c2-6 8-8 10-6" />
    </>
  ),
  ant: (
    <>
      <circle cx="32" cy="16" r="4" />
      <circle cx="32" cy="28" r="5" />
      <ellipse cx="32" cy="44" rx="7" ry="8" />
      <path d="M29 14 18 6M35 14l11-8" />
      <path d="M27 26 14 20M37 26l13-6" />
      <path d="M27 32 12 36M37 32l15 4" />
      <path d="M28 48 16 58M36 48l12 10" />
    </>
  ),
  fly: (
    <>
      <ellipse cx="32" cy="40" rx="8" ry="10" />
      <circle cx="32" cy="24" r="6" />
      <path d="M28 20 22 10M36 20l6-10" />
      <path d="M24 34c-10-2-16-10-16-16 6 2 12 8 16 14" />
      <path d="M40 34c10-2 16-10 16-16-6 2-12 8-16 14" />
      <path d="M28 48 24 58M36 48l4 10" />
      <circle cx="29.5" cy="23" r="1" fill="currentColor" stroke="none" />
      <circle cx="34.5" cy="23" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  termite: (
    <>
      <ellipse cx="32" cy="18" rx="5" ry="4" />
      <ellipse cx="32" cy="32" rx="7" ry="8" />
      <ellipse cx="32" cy="48" rx="8" ry="9" />
      <path d="M29 15 24 6M35 15l5-9" />
      <path d="M25 30 14 26M39 30l11-4" />
      <path d="M25 36 14 40M39 36l11 4" />
      <path d="M26 52 18 60M38 52l8 8" />
    </>
  ),
  bird: (
    <>
      <path d="M10 36c8-2 14-8 18-16 2 6 8 12 18 14-6 2-10 6-12 12-6-4-14-6-24-10Z" />
      <path d="M28 22c6-8 16-12 26-12-6 6-8 12-8 18" />
      <path d="M18 40c2 6 2 10-2 14" />
      <circle cx="44" cy="24" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  tick: (
    <>
      <ellipse cx="34" cy="36" rx="12" ry="14" />
      <path d="M26 26 16 14M30 22V10M36 24l6-12" />
      <path d="M24 34 12 30M22 42 10 46M44 32l10-6M46 42l10 6" />
      <circle cx="30" cy="32" r="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  mosquito: (
    <>
      <ellipse cx="32" cy="36" rx="3" ry="10" />
      <circle cx="32" cy="22" r="3.5" />
      <path d="M32 18.5V10" />
      <path d="M22 28c-8-6-12-4-14 2 6 0 10 2 12 6" />
      <path d="M42 28c8-6 12-4 14 2-6 0-10 2-12 6" />
      <path d="M29 30 18 48M35 30l11 18" />
      <path d="M30 42 22 56M34 42l8 14" />
    </>
  ),
  flying: (
    <>
      <ellipse cx="32" cy="38" rx="5" ry="8" />
      <circle cx="32" cy="26" r="4" />
      <path d="M27 24c-8-10-16-10-20-4 6 2 12 6 16 12" />
      <path d="M37 24c8-10 16-10 20-4-6 2-12 6-16 12" />
      <path d="M30 20 26 12M34 20l4-8" />
    </>
  ),
  general: (
    <>
      <path d="M12 30 32 14l20 16" />
      <path d="M18 28v20h28V28" />
      <path d="M28 40h8v8h-8z" />
    </>
  ),
  foundation: (
    <>
      <path d="M10 28h44" />
      <path d="M14 28v8h36v-8" />
      <path d="M18 36v16M26 36v16M32 36v16M38 36v16M46 36v16" />
      <path d="M12 52h40" />
    </>
  ),
  pin: (
    <>
      <path d="M32 12a12 12 0 0 0-12 12c0 9 12 24 12 24s12-15 12-24a12 12 0 0 0-12-12z" />
      <circle cx="32" cy="24" r="4" />
    </>
  ),
  check: (
    <>
      <circle cx="32" cy="32" r="14" />
      <path d="M23 33.5 29 39l13-15" />
    </>
  ),
};

export default function Icon({ name, className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {shapes[name]}
    </svg>
  );
}
