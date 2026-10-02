"use client";

import { useState } from "react";
import { usePathname, useRouter, routing } from "@/i18n/routing";
import { GlobeIcon, CheckIcon, ChevronDownIcon } from "./icons";
import { cn } from "@/lib/utils";

const LOCALE_LABELS: Record<string, string> = {
  en: "English",
  "zh-CN": "简体中文",
};

export default function LanguageSwitcher({ dark = false }: { dark?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<string>(() => {
    if (typeof window === "undefined") return "en";
    const match = window.location.pathname.match(/^\/(en|zh-CN)(?=\/|$)/);
    return match ? match[1] : "en";
  });

  function select(locale: string) {
    setCurrent(locale);
    setOpen(false);
    router.replace(pathname, { locale });
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Language"
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
          dark
            ? "text-paper/80 hover:bg-white/10 hover:text-paper"
            : "text-ink-soft hover:bg-cream"
        )}
      >
        <GlobeIcon className="h-4 w-4" />
        <span className="hidden sm:inline">{LOCALE_LABELS[current]}</span>
        <ChevronDownIcon
          className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            className="fixed inset-0 z-40 cursor-default bg-transparent"
            onClick={() => setOpen(false)}
          />
          <ul
            role="listbox"
            className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-xl border border-line bg-white py-1.5 shadow-xl"
          >
            {routing.locales.map((locale) => (
              <li key={locale} role="option" aria-selected={locale === current}>
                <button
                  type="button"
                  onClick={() => select(locale)}
                  className={cn(
                    "flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors",
                    locale === current
                      ? "bg-gold-tint font-semibold text-gold-deep"
                      : "text-ink-soft hover:bg-cream"
                  )}
                >
                  {LOCALE_LABELS[locale]}
                  {locale === current && <CheckIcon className="h-4 w-4" />}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
