import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export function GET() {
  if (
    process.env.CMS_ENABLED !== "true" ||
    !process.env.CMS_AUTH_URL ||
    !process.env.CMS_REPO
  )
    return NextResponse.json(
      { error: "CMS is not configured" },
      { status: 503 },
    );
  return NextResponse.json(
    {
      name: "github",
      repo: process.env.CMS_REPO,
      branch: process.env.CMS_BRANCH || "main",
      base_url: process.env.CMS_AUTH_URL,
      auth_endpoint: process.env.CMS_AUTH_ENDPOINT || "auth",
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
