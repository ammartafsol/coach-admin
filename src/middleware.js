import { NextResponse } from "next/server";
import {
  WITHOUT_LOGIN_ROUTES,
  PROTECTED_ROUTES,
} from "./developmentContent/routes";
import { handleDecrypt } from "./resources/utils/helper";

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  const accessToken = handleDecrypt(request?.cookies.get("_xpdx")?.value);

  // Check if the current route is in the protected routes list
  const isProtectedRoute = PROTECTED_ROUTES.some(route => 
    pathname.startsWith(route) || pathname === route
  );

  // If it's a protected route and no access token, redirect to login with reason
  if (isProtectedRoute && !accessToken) {
    const loginUrl = new URL("/sign-in", request.url);
    loginUrl.searchParams.set("redirect", "auth_required");
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|Images|fonts).*)"],
};
