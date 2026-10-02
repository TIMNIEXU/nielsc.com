import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import Logo from "./Logo";
import { ExternalIcon, PhoneIcon, MailIcon, PinIcon } from "./icons";

const UTM = "utm_source=nielsc.com&utm_medium=group_footer";

export default async function Footer() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");

  const company = [
    { href: "/services", label: nav("services") },
    { href: "/network", label: nav("network") },
    { href: "/about", label: nav("about") },
    { href: "/contact", label: nav("contact") },
  ];

  const groupBrands = [
    { name: "Niel Supply Chain", href: "/", external: false },
    { name: "Niel Customs", href: `https://www.nielcustoms.ai?${UTM}`, external: true },
    { name: "JOMA Logistics", href: `https://www.jomaus.com?${UTM}`, external: true },
    { name: "Niel Insurance", href: `https://nielinsurance.com?${UTM}`, external: true },
    { name: "NIEL COS", href: `https://www.nielcos.ai?${UTM}`, external: true },
  ];

  return (
    <footer className="bg-abyss text-white">
      {/* NIEL GROUP standard strip — identical on every group site */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold">
            {t("groupEyebrow")}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-7 gap-y-3">
            {groupBrands.map((b) =>
              b.external ? (
                <a
                  key={b.name}
                  href={b.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[15px] font-bold text-white transition-colors hover:text-gold"
                >
                  {b.name}
                  <ExternalIcon className="h-3.5 w-3.5 opacity-60" />
                </a>
              ) : (
                <Link
                  key={b.name}
                  href={b.href}
                  className="text-[15px] font-bold text-white transition-colors hover:text-gold"
                >
                  {b.name}
                </Link>
              )
            )}
          </div>
          <p className="mt-3 text-[12.5px] text-white/50">{t("groupNote")}</p>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="inline-block rounded-lg bg-white px-3 py-2">
            <Logo className="h-9 sm:h-10" />
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            {t("tagline")}
          </p>
          <a
            href="https://www.nielcos.ai"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold/60 px-4 py-1.5 text-[12.5px] font-bold text-gold transition-colors hover:bg-gold hover:text-abyss"
          >
            {t("poweredBy")}
          </a>
        </div>

        <div>
          <p className="font-display text-lg font-bold text-white">{t("company")}</p>
          <ul className="mt-4 space-y-2.5">
            {company.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-white/70 transition-colors hover:text-gold"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-display text-lg font-bold text-white">{t("servicesTitle")}</p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            {(t.raw("services") as string[]).map((s) => (
              <li key={s}>
                <Link href="/services" className="transition-colors hover:text-gold">
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-display text-lg font-bold text-white">{t("contactTitle")}</p>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li className="flex gap-2.5">
              <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>
                Chicago, IL · New York / New Jersey
                <br />
                Los Angeles, CA
              </span>
            </li>
            <li>
              <a
                href="tel:+17323388098"
                className="flex gap-2.5 transition-colors hover:text-gold"
              >
                <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                001-732-338-8098 (24/7)
              </a>
            </li>
            <li>
              <a
                href="mailto:info@nielcustoms.ai"
                className="flex gap-2.5 transition-colors hover:text-gold"
              >
                <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                info@nielcustoms.ai
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/50 sm:flex-row sm:px-6">
          <p>{t("rights")}</p>
          <p className="font-semibold uppercase tracking-[0.2em]">
            {t("since")}
          </p>
        </div>
        <div className="mx-auto max-w-7xl px-4 pb-6 sm:px-6">
          <p className="text-center text-[11.5px] leading-relaxed text-white/40 sm:text-left">
            {t("operatedBy")} {t("entityNote")}
          </p>
        </div>
      </div>
    </footer>
  );
}
