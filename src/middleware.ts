import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/favicon.ico") {
    return new NextResponse(null, { status: 204 });
  }
  return NextResponse.next();
}
