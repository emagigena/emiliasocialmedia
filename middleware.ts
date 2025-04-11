import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Check if the request is for the admin section
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Skip the login page from the check
    if (request.nextUrl.pathname === "/admin") {
      return NextResponse.next()
    }

    // Check if the user is authenticated
    const isAuthenticated = request.cookies.has("admin_authenticated")

    if (!isAuthenticated) {
      // Redirect to the login page if not authenticated
      return NextResponse.redirect(new URL("/admin", request.url))
    }
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/admin/:path*"],
}
