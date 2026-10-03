/* One NIEL Account — SSO client helpers (nielsc.com side).
   nielcos.ai is the identity provider. We keep our own short-lived
   session: a signed JWT in an httpOnly cookie, minted after the
   server-to-server ticket exchange. */

import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { randomBytes } from "crypto";

export const SSO_COOKIE = "niel_sso";
const STATE_COOKIE = "niel_sso_state";

function idpBase(): string {
  return (process.env.NEXT_PUBLIC_NIEL_SSO_IDP || "https://www.nielcos.ai").replace(/\/$/, "");
}

function clientId(): string {
  return process.env.NIEL_SSO_CLIENT_ID || "nielsc";
}

function jwtSecret(): Uint8Array {
  const s = process.env.NIEL_SSO_JWT_SECRET || "";
  return new TextEncoder().encode(s);
}

export type SsoUser = { id: string; email: string; name: string };

/** Build the IdP authorize URL and a CSRF state value. */
export function authorizeUrl(locale: string): { url: string; state: string } {
  const state = randomBytes(16).toString("hex");
  const cb = new URL("/api/auth/sso/callback", siteBase());
  const u = new URL("/api/sso/authorize", idpBase());
  u.searchParams.set("client_id", clientId());
  u.searchParams.set("redirect_uri", cb.toString());
  u.searchParams.set("state", state);
  u.searchParams.set("locale", locale);
  return { url: u.toString(), state };
}

function siteBase(): string {
  // Public site URL for building the callback URL we register with the IdP.
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://www.nielsc.com").replace(/\/$/, "");
}

export async function setStateCookie(state: string) {
  const jar = await cookies();
  jar.set(STATE_COOKIE, state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  });
}

export async function takeStateCookie(): Promise<string | null> {
  const jar = await cookies();
  const v = jar.get(STATE_COOKIE)?.value ?? null;
  if (v) jar.delete(STATE_COOKIE);
  return v;
}

/** Mint our own session cookie after a successful ticket exchange. */
export async function setSessionCookie(user: SsoUser) {
  const secret = jwtSecret();
  const token = await new SignJWT({ email: user.email, name: user.name })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuer("nielcos-sso")
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
  const jar = await cookies();
  jar.set(SSO_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearSessionCookie() {
  const jar = await cookies();
  jar.delete(SSO_COOKIE);
}

/** Read + verify our session. Returns null when signed out / invalid. */
export async function getSsoUser(): Promise<SsoUser | null> {
  const secretRaw = process.env.NIEL_SSO_JWT_SECRET || "";
  if (!secretRaw) return null;
  const jar = await cookies();
  const token = jar.get(SSO_COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, jwtSecret(), { issuer: "nielcos-sso" });
    if (typeof payload.sub !== "string" || typeof payload.email !== "string") return null;
    return {
      id: payload.sub as string,
      email: payload.email as string,
      name: (payload.name as string) || "",
    };
  } catch {
    return null;
  }
}

/** Server-to-server ticket exchange against the IdP. */
export async function exchangeTicket(ticket: string): Promise<SsoUser> {
  const res = await fetch(new URL("/api/sso/token", idpBase()).toString(), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      ticket,
      client_id: clientId(),
      client_secret: process.env.NIEL_SSO_CLIENT_SECRET || "",
    }),
  });
  const data = (await res.json().catch(() => ({}))) as {
    ok?: boolean;
    error?: string;
    user?: { id: string; email: string; name: string };
  };
  if (!res.ok || !data.ok || !data.user) {
    throw new Error(data.error || "exchange_failed");
  }
  return data.user;
}
