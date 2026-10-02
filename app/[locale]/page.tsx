import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import SectionHead from "@/components/SectionHead";
import Ticker from "@/components/Ticker";
import Reveal from "@/components/Reveal";
import {
  ArrowRightIcon, CheckIcon, ExternalIcon, GlobeIcon,
  PhoneIcon, PinIcon, TruckIcon,
} from "@/components/icons";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home" });

  const hero = {
    eyebrow: t("hero.eyebrow"),
    titleA: t("hero.titleA"), titleB: t("hero.titleB"),
    sub: t("hero.sub"), ctaQuote: t("hero.ctaQuote"), ctaServices: t("hero.ctaServices"),
  };
  const trust = t.raw("hero.trust") as string[];
  const ticker = t.raw("ticker") as string[];
  const cards = t.raw("services.cards") as { title: string; desc: string; img: string }[];
  const hubs = t.raw("network.hubs") as { name: string; desc: string }[];
  const points = t.raw("why.points") as { title: string; desc: string }[];
  const whyIcons = [TruckIcon, CheckIcon, GlobeIcon, PhoneIcon];

  return (
    <>
      {/* HERO */}
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
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-[15px] font-bold text-abyss transition-colors hover:bg-gold-deep hover:text-white"
              >
                {hero.ctaQuote}
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border border-paper/30 px-7 py-3.5 text-[15px] font-bold text-paper transition-colors hover:border-gold hover:text-gold"
              >
                {hero.ctaServices}
              </Link>
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

      {/* SERVICES */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHead
          kicker={t("services.kicker")}
          title={t("services.title")}
          sub={t("services.sub")}
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={(i % 3) * 80}>
              <Link href="/services" className="card card-hover group block h-full overflow-hidden">
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={c.img}
                    alt={c.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="display text-2xl text-ink">{c.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{c.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-bold text-gold-deep">
                    {t("services.cardCta")}
                    <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
          {/* 6th tile: CTA */}
          <Reveal delay={160}>
            <Link
              href="/contact"
              className="card card-hover flex h-full min-h-[280px] flex-col items-start justify-center border-navy bg-navy p-6"
            >
              <p className="eyebrow eyebrow-light">{t("ctaBand.kicker")}</p>
              <h3 className="display mt-3 text-3xl text-paper">{t("ctaBand.title")}</h3>
              <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-[14.5px] font-bold text-abyss">
                {t("ctaBand.ctaQuote")}
                <ArrowRightIcon className="h-4 w-4" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      <div className="route-dots mx-auto max-w-7xl" aria-hidden="true" />

      {/* NETWORK */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHead
          kicker={t("network.kicker")}
          title={t("network.title")}
          sub={t("network.sub")}
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {hubs.map((h, i) => (
            <Reveal key={h.name} delay={i * 80}>
              <div className="card card-hover h-full p-7">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold-tint">
                  <PinIcon className="h-6 w-6 text-gold-deep" />
                </span>
                <h3 className="display mt-5 text-2xl text-ink">{h.name}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{h.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <Link
            href="/network"
            className="inline-flex items-center gap-2 rounded-full border-2 border-ink px-7 py-3 text-[15px] font-bold text-ink transition-colors hover:border-gold-deep hover:text-gold-deep"
          >
            {t("network.cta")}
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>

      {/* WHY US */}
      <section className="border-y border-line bg-cream/60">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <SectionHead kicker={t("why.kicker")} title={t("why.title")} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {points.map((p, i) => {
              const Icon = whyIcons[i % whyIcons.length];
              return (
                <Reveal key={p.title} delay={i * 80}>
                  <div className="h-full rounded-2xl bg-paper p-6">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-abyss">
                      <Icon className="h-5 w-5 text-gold" />
                    </span>
                    <h3 className="display mt-4 text-xl text-ink">{p.title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-muted">{p.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
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
              href="https://www.nielcos.ai"
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
