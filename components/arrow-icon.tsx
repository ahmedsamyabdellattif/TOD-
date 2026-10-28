/** Brand arrow: vector strokes keep their shape and currentColor on every device. */
export function ArrowIcon({ direction = "up-right" }: {
  direction?: "up-right" | "up-left" | "left" | "right" | "down" | "return";
}) {
  const paths = {
    "up-right": "M7 17 17 7M7 7h10v10",
    "up-left": "M17 17 7 7M17 7H7v10",
    left: "M19 12H5m7-7-7 7 7 7",
    right: "M5 12h14m-7-7 7 7-7 7",
    down: "M12 5v14m-7-7 7 7 7-7",
    return: "m9 4-5 5 5 5M4 9h9a7 7 0 0 1 0 14",
  };
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true" focusable="false"
    style={{ display: "inline-block", width: "1em", height: "1em", flexShrink: 0, verticalAlign: "-0.125em" }}>
    <path d={paths[direction]} />
  </svg>;
}
