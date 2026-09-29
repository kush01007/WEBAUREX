import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/site";

const canonicalUrl = new URL(SITE_URL);

export function proxy(request) {
  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0].trim();
  const requestHost = request.headers.get("host")?.split(":")[0];
  const hostname = (forwardedHost || requestHost || request.nextUrl.hostname).split(":")[0].toLowerCase();
  const forwardedProtocol = request.headers.get("x-forwarded-proto")?.split(",")[0].trim();
  const protocol = (forwardedProtocol || request.nextUrl.protocol.replace(":", "")).toLowerCase();
  const usesWebaurexDomain = hostname === canonicalUrl.hostname || hostname === `www.${canonicalUrl.hostname}`;

  if (usesWebaurexDomain && (hostname !== canonicalUrl.hostname || protocol !== "https")) {
    const destination = new URL(`${request.nextUrl.pathname}${request.nextUrl.search}`, canonicalUrl);
    return NextResponse.redirect(destination, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next/static|_next/image).*)",
};
