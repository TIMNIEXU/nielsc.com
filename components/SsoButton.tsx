"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";

type MeUser = { id: string; email: string; name: string } | null;

/* One NIEL Account button for the nielsc.com header.
   Signed out -> "Sign In" (starts the nielcos.ai SSO flow).
   Signed in  -> account chip with a small menu (My NIEL / Sign out). */
export default function SsoButton({ onNavigate }: { onNavigate?: () => void }) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [user, setUser] = useState<MeUser | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [menu, setMenu] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let alive = true;
    fetch("/api/auth/me", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (alive) setUser((d?.user as MeUser) ?? null);
      })
      .catch(() => {})
      .finally(() => {
        if (alive) setLoaded(true);
      });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setMenu(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  if (!loaded) return null;

  if (!user) {
    return (
      <a
        href={`/api/auth/signin?locale=${locale}`}
        onClick={onNavigate}
        className="inline-flex items-center rounded-full border border-line px-5 py-2.5 text-[14px] font-bold text-ink transition-colors hover:border-abyss hover:text-abyss"
      >
        {t("signIn")}
      </a>
    );
  }

  const label = user.name || user.email;
  const initial = (label.trim()[0] || "•").toUpperCase();
  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setMenu((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={menu}
        className="inline-flex items-center gap-2 rounded-full border border-line py-1.5 pl-1.5 pr-4 text-[14px] font-bold text-ink transition-colors hover:border-abyss"
      >
        <span className="grid h-8 w-8 place-items-center rounded-full bg-abyss text-[13px] font-bold text-white">
          {initial}
        </span>
        <span className="max-w-[140px] truncate">{label}</span>
      </button>
      {menu && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-60 overflow-hidden rounded-xl border border-line bg-paper shadow-lg"
        >
          <div className="border-b border-line px-4 py-3">
            <p className="truncate text-[13px] font-bold text-ink">{label}</p>
            {user.name && <p className="truncate text-xs text-ink-soft">{user.email}</p>}
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-ink-faint">
              One NIEL Account
            </p>
          </div>
          <a
            href="https://www.nielcos.ai/app"
            role="menuitem"
            className="block px-4 py-3 text-[14px] font-semibold text-ink hover:bg-cream"
          >
            {t("myNiel")}
          </a>
          <a
            href="/api/auth/signout"
            role="menuitem"
            onClick={onNavigate}
            className="block px-4 py-3 text-[14px] font-semibold text-ink hover:bg-cream"
          >
            {t("signOut")}
          </a>
        </div>
      )}
    </div>
  );
}
