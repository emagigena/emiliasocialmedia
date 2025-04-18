import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Only apply to /admin routes
  if (pathname.startsWith("/admin")) {
    const authHeader = request.headers.get("authorization")

    if (!authHeader || !isValidAuthHeader(authHeader)) {
      return new NextResponse("Authentication Required", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Secure Area"',
        },
      })
    }
  }

  return NextResponse.next()
}

function isValidAuthHeader(authHeader: string): boolean {
  if (!authHeader.startsWith("Basic ")) {
    return false
  }

  // Extract the encoded credentials
  const base64Credentials = authHeader.split(" ")[1]
  const credentials = Buffer.from(base64Credentials, "base64").toString("ascii")
  const [username, password] = credentials.split(":")

  // Check against hardcoded credentials
  return username === "admin" && password === "password"
}

export const config = {
  matcher: "/admin/:path*",
}
