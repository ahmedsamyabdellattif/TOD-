import { ImageResponse } from "next/og";
export function GET() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#F7F3EC",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 90,
        color: "#333333",
      }}
    >
      <div style={{ fontSize: 100, letterSpacing: 10 }}>TOD</div>
      <div
        style={{
          height: 3,
          width: 120,
          background: "#C99E69",
          margin: "28px 0",
        }}
      />
      <div style={{ fontSize: 56 }}>Human Systems</div>
      <div style={{ fontSize: 28, marginTop: 30, color: "#5C5852" }}>
        Leadership. Organizations.
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
