import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const variant = new URL(request.url).searchParams.get("variant");
  const [logo, icon] = await Promise.all([
    readFile(path.join(process.cwd(), "public/brand/logo-light.png")),
    readFile(path.join(process.cwd(), "public/brand/icon-gold.png")),
  ]);
  if (variant === "icon-dark" || variant === "icon-cream" || variant === "logo") {
    const cream = variant === "icon-cream";
    const logoOnly = variant === "logo";
    return new ImageResponse(
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: cream ? "#F7F3EC" : "#333333", color: cream ? "#333333" : "#F7F3EC" }}>
        <img src={`data:image/png;base64,${(logoOnly ? logo : icon).toString("base64")}`} width={logoOnly ? 560 : 300} height={logoOnly ? 306 : 300} alt="TOD" style={{ width: logoOnly ? 560 : 300, height: logoOnly ? 306 : 300, objectFit: "contain", flexShrink: 0 }} />
        {!logoOnly && <div style={{ display: "flex", fontSize: 52, letterSpacing: 8, marginTop: 24 }}>TOD</div>}
        <div style={{ display: "flex", fontSize: 20, color: cream ? "#8A6428" : "#C99E69", marginTop: logoOnly ? 40 : 16, letterSpacing: 2 }}>todarabia.com</div>
      </div>,
      { width: 1200, height: 630 },
    );
  }
  // A square brand thumbnail for compact link previews. Platforms own the surrounding UI.
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#333333", padding: 48 }}>
      <img src={`data:image/png;base64,${logo.toString("base64")}`} width="504" height="276" alt="TOD — Total Organization Development" style={{ width: 504, height: 276, objectFit: "contain", flexShrink: 0 }} />
    </div>,
    { width: 600, height: 600, headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" } },
  );
}
