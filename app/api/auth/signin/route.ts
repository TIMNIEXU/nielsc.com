import { NextRequest, NextResponse } from "next/server";
import { authorizeUrl, setStateCookie } from "@/lib/sso";

/* GET /api/auth/signin — start One NIEL Account SSO.
   Sets the CSRF state cookie, then redirects to the nielcos.ai IdP. */
export async function GET(req: NextRequest) {
  const locale = new URL(req.url).searchParams.get("locale") || "en";
  const { url, state } = authorizeUrl(locale);
  await setStateCookie(state);
  return NextResponse.redirect(url);
}
