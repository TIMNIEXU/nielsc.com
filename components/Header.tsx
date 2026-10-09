"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import SsoButton from "./SsoButton";
import { MenuIcon, XIcon, PhoneIcon } from "./icons";

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dutyUrl = `https://www.nielcos.ai/${locale}/landed-cost`;

  const links = [
    { href: "/", label: t("home") },
    { href: "/services", label: t("services") },
    { href: "/us-customs", label: t("usCustoms") },
    { href: dutyUrl, label: t("dutyEstimator"), external: true },
    { href: "/network", label: t("network") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6">
        <Link href="/" aria-label="Niel Supply Chain LLC — home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {links.map((l) => {
            if (l.external) {
              return (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md px-4 py-2 text-[14.5px] font-semibold text-ink-soft transition-colors hover:bg-cream hover:text-ink"
                >
                  {l.label}
                </a>
              );
            }
            const active =
              l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "rounded-md px-4 py-2 text-[14.5px] font-semibold transition-colors",
                  active
                    ? "bg-abyss text-white"
                    : "text-ink-soft hover:bg-cream hover:text-ink"
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          <div className="hidden md:block">
            <SsoButton />
          </div>
          <a
            href="tel:+17323388098"
            className="hidden items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-[14px] font-bold text-abyss transition-colors hover:bg-gold-deep hover:text-white md:inline-flex"
          >
            <PhoneIcon className="h-4 w-4" />
            {t("callCta")}
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-ink lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? t("closeMenu") : t("openMenu")}
          >
            {open ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="border-t border-line bg-paper px-4 py-3 lg:hidden"
          aria-label="Mobile"
        >
          {links.map((l) => {
            if (l.external) {
              return (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-4 py-3 text-lg font-semibold text-ink hover:bg-cream"
                >
                  {l.label}
                </a>
              );
            }
            const active =
              l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "block rounded-lg px-4 py-3 text-lg font-semibold",
                  active ? "bg-abyss text-white" : "text-ink hover:bg-cream"
                )}
              >
                {l.label}
              </Link>
            );
          })}
          <a
            href="tel:+17323388098"
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-lg font-bold text-abyss"
          >
            <PhoneIcon className="h-5 w-5" />
            {t("callCta")}
          </a>
          <div className="mt-2 flex justify-center" onClick={() => setOpen(false)}>
            <SsoButton onNavigate={() => setOpen(false)} />
          </div>
        </nav>
      )}
    </header>
  );
}
