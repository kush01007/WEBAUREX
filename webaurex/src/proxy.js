import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/site";

const canonicalUrl = new URL(SITE_URL);

export function proxy(request) {
  const requestHost = request.headers.get("host")?.split(":")[0];
  const hostname = (requestHost || request.nextUrl.hostname).toLowerCase();

  if (hostname === `www.${canonicalUrl.hostname}`) {
    const destination = new URL(`${request.nextUrl.pathname}${request.nextUrl.search}`, canonicalUrl);
    return NextResponse.redirect(destination, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next/static|_next/image).*)",
};
