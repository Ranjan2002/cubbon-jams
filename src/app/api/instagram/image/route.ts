import { NextRequest, NextResponse } from "next/server";

export const revalidate = 900;

function isAllowedInstagramHost(hostname: string) {
  return (
    hostname.endsWith("cdninstagram.com") ||
    hostname.endsWith("fbcdn.net") ||
    hostname.includes("instagram")
  );
}

export async function GET(request: NextRequest) {
  const rawUrl = request.nextUrl.searchParams.get("url");

  if (!rawUrl) {
    return NextResponse.json({ error: "Missing image url" }, { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(rawUrl);
  } catch {
    return NextResponse.json({ error: "Invalid image url" }, { status: 400 });
  }

  if (!isAllowedInstagramHost(parsed.hostname)) {
    return NextResponse.json({ error: "Host not allowed" }, { status: 403 });
  }

  try {
    const upstream = await fetch(parsed.toString(), {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        referer: "https://www.instagram.com/",
        accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
      },
      next: { revalidate },
    });

    if (!upstream.ok) {
      return NextResponse.json(
        { error: "Failed to fetch upstream image" },
        { status: 502 }
      );
    }

    const contentType = upstream.headers.get("content-type") || "image/jpeg";
    const cacheControl = upstream.headers.get("cache-control") || "public, max-age=900";
    const bytes = await upstream.arrayBuffer();

    return new NextResponse(bytes, {
      status: 200,
      headers: {
        "content-type": contentType,
        "cache-control": cacheControl,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Unexpected proxy error" },
      { status: 500 }
    );
  }
}
