import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";
import { ArrowRightIcon, CheckIcon, PinIcon, TruckIcon } from "@/components/icons";

type Props = { params: Promise<{ locale: string }> };

export default async function NetworkPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "networkPage" });

  const hubs = t.raw("hubs") as { name: string; tag: string; desc: string; bullets: string[] }[];
  const ports = t.raw("ports") as string[];
  const stats = t.raw("fleet.stats") as { n: string; l: string }[];

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pb-4 pt-16 sm:px-6 sm:pt-20">
        <SectionHead kicker={t("kicker")} title={t("title")} sub={t("sub")} />
      </section>

      {/* HUBS */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {hubs.map((h, i) => (
            <Reveal key={h.name} delay={i * 80}>
              <div className="card card-hover flex h-full flex-col p-7">
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold-tint">
                    <PinIcon className="h-6 w-6 text-gold-deep" />
                  </span>
                  <span className="rounded-full bg-cream px-3 py-1 text-[12px] font-bold uppercase tracking-wider text-ink-soft">
                    {h.tag}
                  </span>
                </div>
                <h2 className="display mt-5 text-3xl text-ink">{h.name}</h2>
                <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{h.desc}</p>
                <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
                  {h.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-[14px] text-ink-soft">
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PORTS */}
      <section className="border-y border-line bg-cream/60">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">{t("portsTitle")}</p>
            <p className="mt-3 text-lg text-muted">{t("portsSub")}</p>
          </Reveal>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ports.map((p, i) => (
              <Reveal key={p} delay={(i % 3) * 60}>
                <div className="flex items-center gap-3 rounded-xl border border-line bg-paper px-5 py-4">
                  <TruckIcon className="h-5 w-5 shrink-0 text-gold-deep" />
                  <span className="text-[15px] font-semibold text-ink">{p}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FLEET — dark band */}
      <section className="meridian-bg">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <Reveal className="max-w-3xl">
            <p className="eyebrow eyebrow-light">{t("fleet.kicker")}</p>
            <h2 className="display mt-4 text-4xl text-paper sm:text-5xl">{t("fleet.title")}</h2>
            <p className="mt-4 text-lg leading-relaxed text-paper/70">{t("fleet.desc")}</p>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.l} delay={i * 80}>
                <div className="rounded-2xl border border-paper/15 bg-paper/5 p-6 text-center">
                  <p className="display text-4xl text-gold sm:text-5xl">{s.n}</p>
                  <p className="mt-2 text-[13.5px] font-semibold text-paper/70">{s.l}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GLOBAL */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="relative h-72 w-full overflow-hidden rounded-2xl border border-line sm:h-96">
              <Image
                src="/images/network-yard.jpg"
                alt={t("global.title")}
                fill
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <p className="eyebrow">{t("kicker")}</p>
            <h2 className="display mt-3 text-4xl text-ink sm:text-5xl">{t("global.title")}</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{t("global.desc")}</p>
            <Link
              href="/contact"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-[15px] font-bold text-abyss transition-colors hover:bg-gold-deep hover:text-white"
            >
              {t("global.cta")}
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
