import { NextRequest, NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/sso";

/* GET /api/auth/signout — clear the local SSO session. */
export async function GET(req: NextRequest) {
  await clearSessionCookie();
  return NextResponse.redirect(new URL("/", req.url));
}
