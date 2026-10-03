import { NextResponse } from "next/server";
import { getSsoUser } from "@/lib/sso";

/* GET /api/auth/me — current SSO user (or { user: null }). */
export async function GET() {
  const user = await getSsoUser();
  return NextResponse.json({ user });
}
