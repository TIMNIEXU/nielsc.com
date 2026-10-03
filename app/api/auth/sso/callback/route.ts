import { NextRequest, NextResponse } from "next/server";
import { exchangeTicket, setSessionCookie, takeStateCookie } from "@/lib/sso";

function siteBase(req: NextRequest): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin).replace(/\/$/, "");
}

/* GET /api/auth/sso/callback?ticket=..&state=..
   IdP redirects here after the user continues. We validate the CSRF
   state, exchange the ticket server-to-server (client secret never
   touches the browser), mint our own session cookie, and land home. */
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const ticket = url.searchParams.get("ticket") || "";
  const state = url.searchParams.get("state") || "";
  const expected = await takeStateCookie();
  const home = new URL("/", siteBase(req));

  if (!ticket || !state || !expected || state !== expected) {
    home.searchParams.set("sso", "error");
    return NextResponse.redirect(home);
  }
  try {
    const user = await exchangeTicket(ticket);
    await setSessionCookie(user);
    home.searchParams.set("sso", "ok");
    return NextResponse.redirect(home);
  } catch {
    home.searchParams.set("sso", "error");
    return NextResponse.redirect(home);
  }
}
