import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {}

export const config = {
  matcher: ["/((?!api_next/static_next/image\favicon.ico).*)"],
};
