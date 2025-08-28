import { NextResponse } from "next/server";
import {
  WITHOUT_LOGIN_ROUTES,
} from "./developmentContent/routes";
import { handleDecrypt } from "./resources/utils/helper";

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  const accessToken = handleDecrypt(request?.cookies.get("_xpdx")?.value);

  // Check if the current route requires authentication
  const isProtectedRoute = !WITHOUT_LOGIN_ROUTES.includes(pathname) && 
                          !pathname.startsWith('/api') && 
                          !pathname.startsWith('/_next') && 
                          !pathname.startsWith('/favicon.ico') &&
                          !pathname.startsWith('/images') &&
                          !pathname.startsWith('/fonts') &&
                          !pathname.startsWith('/lottie') &&
                          !pathname.startsWith('/video') &&
                          !pathname.startsWith('/public');

  // If it's a protected route and no access token, redirect to login
  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|Images|fonts).*)"],
};
