import type { NextRequest } from "next/server"

export async function isAdminRequest(request: NextRequest): Promise<boolean> {
  const authHeader = request.headers.get("authorization")

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return false
  }

  // Extract the encoded credentials
  const base64Credentials = authHeader.split(" ")[1]
  const credentials = Buffer.from(base64Credentials, "base64").toString("ascii")
  const [username, password] = credentials.split(":")

  // Check against hardcoded credentials
  return username === "admin" && password === "password"
}
