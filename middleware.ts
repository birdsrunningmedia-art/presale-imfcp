import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const country =
    request.headers.get("x-vercel-ip-country") ?? "US";

  const response = NextResponse.next();
  response.headers.set("x-user-country", country);

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};