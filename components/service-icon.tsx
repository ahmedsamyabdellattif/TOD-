const paths: Record<string, string> = {
  "1-1": "M3 10 12 4l9 6H3Zm2 3v6m5-6v6m4-6v6m5-6v6M3 22h18",
  "1-2": "M5 5h5v5H5V5Zm9 9h5v5h-5v-5ZM14 5h5v5M5 14v5h5m1-11h3m-6 3v3m3 2h3m2-5v3",
  "1-3": "M4 4h10v16H4V4Zm10 8h7m-3-3 3 3-3 3M7 8h4m-4 4h3",
  "1-4": "M3 7h7m-3-3 3 3-3 3m14 7h-7m3-3-3 3 3 3M12 3v18",
  "1-5": "m3 11 9-7 9 7M5 10v11h14V10M9 21v-6h6v6M9 10h6",
  "1-6": "M5 21v-6h5v6M10 15V9h5v12m0-12V3h5v18M3 21h19",
  "1-7": "M5 7a8 8 0 0 1 14-1l2 3m0-6v6h-6M19 17A8 8 0 0 1 5 18l-2-3m0 6v-6h6",
  "2-1": "M4 4h6v6H4V4Zm10 10h6v6h-6v-6M14 4h6v6h-6V4ZM4 14h6v6H4v-6m6-7h4m-7 3v4m10-4v4m-7 3h4",
  "2-2": "M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM5 21v-2a7 7 0 0 1 14 0v2",
  "2-3": "M4 21V11h4v10m2 0V7h4v14m2 0V3h4v18",
  "2-4": "M3 4h7l2 2 2-2h7v15h-7l-2 2-2-2H3V4Zm9 2v15M6 8h3m6 0h3M6 12h3m6 0h3",
  "2-5": "M12 21V10m0 6C5 16 3 12 4 7c5 0 8 3 8 9Zm0-4c0-6 4-9 8-9 0 5-3 9-8 9",
  "2-6": "M3 3h14v11H8l-5 4V3Zm14 5h4v13l-5-4h-4M7 7h6m-6 3h4",
  "2-7": "M12 21 4 13C-2 6 7 1 12 7c5-6 14-1 8 6l-8 8ZM5 12h4l2-4 3 8 2-4h4",
  "2-8": "M9 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3 21v-3a6 6 0 0 1 12 0v3m2-16a3 3 0 0 1 0 6m1 3a5 5 0 0 1 3 5v2",
  "3-1": "M3 4h18v13H9l-6 4V4Zm4 4h10M7 12h7",
  "3-2": "m3 12 5-5 4 2 4-2 5 5-6 7h-5l-7-7Zm5-5-5-2-2 6 3 2m12-6 5-2 2 6-3 2M8 13l4 4m-1-7 4 4",
  "3-3": "M3 7h7l4 10h7M3 17h7l4-10h7m-3-3 3 3-3 3m0 4 3 3-3 3",
  "3-4": "M12 3a9 9 0 1 0 9 9 9 9 0 0 0-9-9Zm0 4v5l4 2",
  "3-5": "M12 22V3m0 0h9l-3 4 3 4h-9M4 22h16",
  "3-6": "M12 3a9 9 0 1 0 9 9M12 7a5 5 0 1 0 5 5m-5 0 9-9m-5 0h5v5",
  "3-7": "m12 3 8 3v6c0 5-8 10-8 10S4 17 4 12V6l8-3Zm-4 9 3 3 5-6",
  "3-8": "M3 4h8l1 2 1-2h8v16h-8l-1 2-1-2H3V4Zm9 2v16M6 8h3m-3 4h3m6-4h3m-3 4h3m-3 4h3",
  "3-9": "M4 6h16M4 12h16M4 18h16M8 3v6m8 0v6m-6 0v6",
};
export function ServiceIcon({ id }: { id: string }) {
  return <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d={paths[id] || paths['3-9']} /></svg>;
}
