import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import SectionHead from "@/components/SectionHead";
import Ticker from "@/components/Ticker";
import Reveal from "@/components/Reveal";
import {
  ArrowRightIcon, BoxIcon, BuildingIcon, CheckIcon, ExternalIcon,
  FileCheckIcon, GlobeIcon, NetworkIcon, PhoneIcon, PinIcon,
  ShieldCheckIcon, ShipIcon, TruckIcon, WarehouseIcon,
} from "@/components/icons";

type Props = { params: Promise<{ locale: string }> };

const UTM = "utm_source=nielsc.com&utm_medium=group_router";

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home" });
  const cosL = locale === "zh-CN" ? "zh-CN" : "en";

  const hero = {
    eyebrow: t("hero.eyebrow"),
    titleA: t("hero.titleA"), titleB: t("hero.titleB"),
    sub: t("hero.sub"),
    ctaNeeds: t("hero.ctaNeeds"), ctaGroup: t("hero.ctaGroup"),
  };
  const trust = t.raw("hero.trust") as string[];
  const ticker = t.raw("ticker") as string[];
  const needs = t.raw("router.needs") as { label: string; via: string }[];
  const steps = t.raw("flow.steps") as { title: string; desc: string }[];
  const brands = t.raw("group.brands") as { name: string; desc: string }[];

  const needIcons = [
    FileCheckIcon, TruckIcon, ShipIcon, WarehouseIcon, ShieldCheckIcon,
    BoxIcon, GlobeIcon, CheckIcon, PinIcon, NetworkIcon,
  ];
  const needLinks: { href: string; external: boolean }[] = [
    { href: `https://www.nielcustoms.ai?${UTM}`, external: true },
    { href: `https://www.jomaus.com/${locale}/quote?${UTM}`, external: true },
    { href: "/services", external: false },
    { href: "/services", external: false },
    { href: `https://nielinsurance.com/${locale}/bonds?${UTM}`, external: true },
    { href: `https://nielinsurance.com/${locale}?${UTM}`, external: true },
    { href: `https://www.nielcos.ai/${cosL}/landed-cost?${UTM}`, external: true },
    { href: `https://www.nielcos.ai/${cosL}/ad-cvd-checker?${UTM}`, external: true },
    { href: `https://www.jomaus.com/${locale}/tracking?${UTM}`, external: true },
    { href: `https://www.nielcos.ai/${cosL}/app?${UTM}`, external: true },
  ];

  const brandIcons = [BuildingIcon, FileCheckIcon, TruckIcon, ShieldCheckIcon, NetworkIcon];
  const brandLinks: { href: string; external: boolean }[] = [
    { href: "/", external: false },
    { href: `https://www.nielcustoms.ai?${UTM}`, external: true },
    { href: `https://www.jomaus.com/${locale}?${UTM}`, external: true },
    { href: `https://nielinsurance.com/${locale}?${UTM}`, external: true },
    { href: `https://www.nielcos.ai/${cosL}?${UTM}`, external: true },
  ];

  return (
    <>
      {/* HERO — the group, not a forwarder pitch */}
      <section className="meridian-bg relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pt-24">
          <Reveal>
            <p className="eyebrow eyebrow-light">{hero.eyebrow}</p>
            <h1 className="display mt-5 max-w-4xl text-5xl text-paper sm:text-7xl">
              {hero.titleA}
              <br />
              <span className="text-gold">{hero.titleB}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/70">
              {hero.sub}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#needs"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-[15px] font-bold text-abyss transition-colors hover:bg-gold-deep hover:text-white"
              >
                {hero.ctaNeeds}
                <ArrowRightIcon className="h-4 w-4" />
              </a>
              <a
                href="#group"
                className="inline-flex items-center gap-2 rounded-full border border-paper/30 px-7 py-3.5 text-[15px] font-bold text-paper transition-colors hover:border-gold hover:text-gold"
              >
                {hero.ctaGroup}
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
              {trust.map((s) => (
                <span key={s} className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-paper/70">
                  <CheckIcon className="h-4 w-4 text-gold" />
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Ticker items={ticker} />

      {/* I NEED TO… — route by need, not by company */}
      <section id="needs" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20 sm:px-6">
        <SectionHead
          kicker={t("router.kicker")}
          title={t("router.title")}
          sub={t("router.sub")}
        />
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {needs.map((n, i) => {
            const Icon = needIcons[i % needIcons.length];
            const link = needLinks[i];
            const inner = (
              <>
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold-tint transition-colors group-hover:bg-gold">
                  <Icon className="h-5 w-5 text-gold-deep transition-colors group-hover:text-abyss" />
                </span>
                <span className="display mt-4 text-[17px] leading-snug text-ink">
                  {n.label}
                </span>
                <span className="mt-1.5 inline-flex items-center gap-1 text-[12.5px] font-semibold text-muted">
                  via {n.via}
                  {link.external
                    ? <ExternalIcon className="h-3 w-3" />
                    : <ArrowRightIcon className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />}
                </span>
              </>
            );
            const cls =
              "card card-hover group flex h-full flex-col p-5 text-left";
            return (
              <Reveal key={n.label} delay={(i % 5) * 60}>
                {link.external ? (
                  <a href={link.href} target="_blank" rel="noreferrer" className={cls}>{inner}</a>
                ) : (
                  <Link href={link.href} className={cls}>{inner}</Link>
                )}
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ONE CASE, ROUTED FOR YOU */}
      <section className="border-y border-line bg-cream/60">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <SectionHead kicker={t("flow.kicker")} title={t("flow.title")} sub={t("flow.sub")} />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <div className="h-full rounded-2xl bg-paper p-7">
                  <span className="display text-4xl text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="display mt-4 text-xl text-ink">{s.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8">
            <p className="mx-auto max-w-3xl rounded-2xl border border-gold/40 bg-gold-tint px-6 py-4 text-center text-[14.5px] leading-relaxed text-ink">
              {t("flow.note")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* THE GROUP — every trade door */}
      <section id="group" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20 sm:px-6">
        <SectionHead
          kicker={t("group.kicker")}
          title={t("group.title")}
          sub={t("group.sub")}
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {brands.map((b, i) => {
            const Icon = brandIcons[i % brandIcons.length];
            const link = brandLinks[i];
            const inner = (
              <>
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-abyss">
                  <Icon className="h-6 w-6 text-gold" />
                </span>
                <span className="display mt-5 text-xl text-ink">{b.name}</span>
                <span className="mt-2 block text-[13.5px] leading-relaxed text-muted">{b.desc}</span>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-bold text-gold-deep">
                  {link.external ? <ExternalIcon className="h-4 w-4" /> : <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
                </span>
              </>
            );
            const cls = "card card-hover group block h-full p-6";
            return (
              <Reveal key={b.name} delay={i * 60}>
                {link.external ? (
                  <a href={link.href} target="_blank" rel="noreferrer" className={cls}>{inner}</a>
                ) : (
                  <Link href={link.href} className={cls}>{inner}</Link>
                )}
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* POWERED BY NIEL COS */}
      <section className="meridian-bg">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6">
          <Reveal>
            <p className="eyebrow eyebrow-light justify-center">{t("cosBand.kicker")}</p>
            <h2 className="display mx-auto mt-4 max-w-3xl text-4xl text-paper sm:text-5xl">
              {t("cosBand.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-paper/70">
              {t("cosBand.sub")}
            </p>
            <a
              href={`https://www.nielcos.ai/${cosL}?${UTM}`}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-gold/60 px-7 py-3.5 text-[15px] font-bold text-gold transition-colors hover:bg-gold hover:text-abyss"
            >
              {t("cosBand.cta")}
              <ExternalIcon className="h-4 w-4" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-abyss">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6">
          <Reveal>
            <p className="eyebrow eyebrow-light justify-center">{t("ctaBand.kicker")}</p>
            <h2 className="display mx-auto mt-4 max-w-3xl text-4xl text-paper sm:text-6xl">
              {t("ctaBand.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-paper/70">{t("ctaBand.sub")}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 text-[15px] font-bold text-abyss transition-colors hover:bg-gold-deep hover:text-white"
              >
                {t("ctaBand.ctaQuote")}
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <a
                href="tel:+17323388098"
                className="inline-flex items-center gap-2 rounded-full border border-paper/30 px-8 py-3.5 text-[15px] font-bold text-paper transition-colors hover:border-gold hover:text-gold"
              >
                <PhoneIcon className="h-4 w-4" />
                {t("ctaBand.ctaCall")}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
