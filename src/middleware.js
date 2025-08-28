import { NextResponse } from "next/server";
import {
  WITHOUT_LOGIN_ROUTES,
} from "./developmentContent/routes";
import { handleDecrypt } from "./resources/utils/helper";

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  const role = handleDecrypt(request?.cookies.get("_xpdx_ur")?.value);
  const accessToken = handleDecrypt(request?.cookies.get("_xpdx")?.value);

  // Check if the current route requires authentication
  const isProtectedRoute = !WITHOUT_LOGIN_ROUTES.includes(pathname) && 
                          !pathname.startsWith('/api') && 
                          !pathname.startsWith('/_next') && 
                          !pathname.startsWith('/favicon.ico') &&
                          !pathname.startsWith('/images') &&
                          !pathname.startsWith('/fonts') &&
                          !pathname.startsWith('/lottie') &&
                          !pathname.startsWith('/video');

  // If it's a protected route and no access token, redirect to login with toast
  if (isProtectedRoute && !accessToken) {
    const loginUrl = new URL("/sign-in", request.url);
    loginUrl.searchParams.set("toast", "Please login to access this page");
    loginUrl.searchParams.set("type", "error");
    return NextResponse.redirect(loginUrl);
  }

  // Redirect clinic to /clinic/dashboard
  if (
    accessToken &&
    role === "clinic" &&
    WITHOUT_LOGIN_ROUTES.includes(pathname)
  ) {
    return NextResponse.redirect(new URL("/clinic/dashboard", request.url));
  }

  // Redirect to '/' if no accessToken for clinic routes
  if (!accessToken) {
    if (pathname.startsWith("/clinic")) {
      const loginUrl = new URL("/", request.url);
      loginUrl.searchParams.set("toast", "Please login to access clinic features");
      loginUrl.searchParams.set("type", "error");
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|Images|fonts).*)"],
};
