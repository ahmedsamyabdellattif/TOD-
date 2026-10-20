export function ValueIcon({ index }: { index: number }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {
        [
          <g key="search">
            <circle cx="38" cy="24" r="13" />
            <path d="m29 34-17 19-4-4 18-18M43 15a10 10 0 0 1 5 7" />
          </g>,
          <g key="network">
            <circle cx="32" cy="32" r="8" />
            {[
              [32, 10],
              [52, 21],
              [52, 44],
              [32, 55],
              [12, 44],
              [12, 21],
            ].map(([x, y], i) => (
              <g key={i}>
                <path
                  d={`M${32 + (x - 32) * 0.4} ${32 + (y - 32) * 0.4} L${x} ${y}`}
                />
                <circle cx={x} cy={y} r="4" fill="var(--ivory)" />
              </g>
            ))}
          </g>,
          <g key="lotus">
            <path d="M32 53C16 46 19 24 32 9c13 15 16 37 0 44ZM32 53C11 50 6 39 6 28c10 0 19 7 26 25Zm0 0c21-3 26-14 26-25-10 0-19 7-26 25Z" />
            <path d="M22 37c-5-10-6-17-5-22l9 7m16 15c5-10 6-17 5-22l-9 7M32 19v34" />
          </g>,
          <g key="shield">
            <path d="M32 8c8 6 14 7 20 7v18c0 12-12 21-20 25-8-4-20-13-20-25V15c6 0 12-1 20-7Z" />
            <path d="M32 16v33M19 21l5-1" />
          </g>,
          <g key="book">
            <path d="M32 17C24 11 14 11 7 15v36c8-4 18-3 25 2 7-5 17-6 25-2V15c-7-4-17-4-25 2Zm0 0v36M14 22c4-1 7 0 11 1m-11 7c4-1 7 0 11 1m14-8c4-1 7-2 11-1m-11 9c4-1 7-2 11-1" />
          </g>,
          <g key="people">
            <circle cx="32" cy="18" r="7" />
            <circle cx="13" cy="27" r="5" />
            <circle cx="51" cy="27" r="5" />
            <path d="M22 51V39c0-13 20-13 20 0v12M5 50v-9c0-8 13-9 17-2m37 11v-9c0-8-13-9-17-2" />
          </g>,
          <g key="leaf">
            <path d="M32 56c0-22 3-31 14-42M34 35C22 15 42 8 52 5c1 14-2 30-18 30ZM31 47C14 46 8 35 7 25c14 0 24 6 24 22ZM16 33l16 16" />
          </g>,
        ][index]
      }
    </svg>
  );
}

export function SystemIcon({ index }: { index: number }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {
        [
          <g key="purpose">
            <circle cx="32" cy="32" r="22" />
            <path d="M32 10v4m22 18h-4M32 54v-4M10 32h4" />
            <g transform="rotate(28 32 32)">
              <path d="m32 17 7 15-7 15-7-15Z" />
              <path d="m32 17 7 15H25Z" fill="currentColor" stroke="none" />
            </g>
            <circle cx="32" cy="32" r="2" fill="var(--ivory)" />
          </g>,
          <g key="links" transform="rotate(42 32 32)">
            <path d="M23 29V16a9 9 0 0 1 18 0v13a9 9 0 0 1-9 9" />
            <path d="M41 35v13a9 9 0 0 1-18 0V35a9 9 0 0 1 9-9" />
            <path d="M32 24v16" />
          </g>,
          <g key="authority">
            <path d="m11 22 21-12 21 12H11Zm2 27h38M9 54h46M17 27v17m10-17v17m10-17v17m10-17v17" />
          </g>,
          <g key="identity">
            <circle cx="32" cy="20" r="11" />
            <path d="M14 55v-5c0-24 36-24 36 0v5" />
          </g>,
          <g key="culture">
            <path d="m32 7 7 8-7 8-7-8 7-8Z" />
            <circle cx="14" cy="30" r="6" />
            <circle cx="50" cy="30" r="6" />
            <circle cx="32" cy="35" r="7" />
            <path d="M4 53v-5c0-12 20-12 20 0m16 0c0-12 20-12 20 0v5H4m17 0v-2c0-14 22-14 22 0v2" />
          </g>,
          <g key="decisions">
            <path d="M48.630 25.112 L49.539 27.951 L54.717 28.402 L54.717 35.598 L49.539 36.049 L48.630 38.888 L47.265 41.539 L50.607 45.519 L45.519 50.607 L41.539 47.265 L38.888 48.630 L36.049 49.539 L35.598 54.717 L28.402 54.717 L27.951 49.539 L25.112 48.630 L22.461 47.265 L18.481 50.607 L13.393 45.519 L16.735 41.539 L15.370 38.888 L14.461 36.049 L9.283 35.598 L9.283 28.402 L14.461 27.951 L15.370 25.112 L16.735 22.461 L13.393 18.481 L18.481 13.393 L22.461 16.735 L25.112 15.370 L27.951 14.461 L28.402 9.283 L35.598 9.283 L36.049 14.461 L38.888 15.370 L41.539 16.735 L45.519 13.393 L50.607 18.481 L47.265 22.461Z" />
            <circle cx="32" cy="32" r="9" />
          </g>,
          <g key="behaviour">
            <path d="M10 53V35h9v18h-9Zm17 0V23h9v30h-9Zm17 0V10h9v43h-9" />
          </g>,
          <g key="meaning">
            <path d="M24 43c0-7-9-10-9-21 0-22 34-22 34 0 0 11-9 14-9 21H24Zm0 5h16m-13 5h10m-7 5h4M32 2v3M8 10l3 3m42-3-3 3M4 27h5m46 0h5M29 41l-3-16 6 4 6-4-3 16" />
          </g>,
          <g key="structure">
            <rect x="26" y="7" width="12" height="12" rx="1" />
            <path d="M32 19v11M12 42V30h40v12M32 30v12" />
            <rect x="6" y="42" width="12" height="12" rx="2" />
            <rect x="26" y="42" width="12" height="12" rx="2" />
            <rect x="46" y="42" width="12" height="12" rx="2" />
          </g>,
          <g key="patterns">
            <circle cx="32" cy="32" r="7" />
            {[
              [32, 9],
              [52, 20],
              [52, 44],
              [32, 55],
              [12, 44],
              [12, 20],
            ].map(([x, y], i) => (
              <g key={i}>
                <path
                  d={`M${32 + (x - 32) * 0.33} ${32 + (y - 32) * 0.33}L${x} ${y}`}
                />
                <circle cx={x} cy={y} r="4" fill="var(--ivory)" />
              </g>
            ))}
          </g>,
          <g key="people">
            <circle cx="32" cy="19" r="8" />
            <circle cx="12" cy="25" r="6" />
            <circle cx="52" cy="25" r="6" />
            <path d="M20 54V43c0-17 24-17 24 0v11H20ZM3 53V41c0-11 17-11 17 0m24 0c0-11 17-11 17 0v12H44M3 53h17" />
          </g>,
        ][index]
      }
    </svg>
  );
}
