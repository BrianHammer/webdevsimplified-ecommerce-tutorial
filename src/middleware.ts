import { NextRequest, NextResponse } from "next/server";
import { isValidPassword } from "./lib/is-valid-password";

export async function middleware(req: NextRequest) {
  if ((await isAuthenticated(req)) === false) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": "Basic" },
    });
  }
}

const isAuthenticated = async (req: NextRequest) => {
  const authHeader =
    req.headers.get("authorization") || req.headers.get("Authorization");

  if (authHeader == null) return false;

  // This gets the 2nd portion
  // username:password
  const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64")
    .toString()
    .split(":");

  return (
    username === process.env.ADMIN_USERNAME &&
    await isValidPassword(password, process.env.HASHED_ADMIN_PASSWORD as string)
  );
};

export const config = {
  matcher: "/admin/:path*",
};