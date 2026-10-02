import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";
import {
  ArrowRightIcon, BuildingIcon, FileCheckIcon, ShieldCheckIcon, TruckIcon,
} from "@/components/icons";

type Props = { params: Promise<{ locale: string }> };

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "aboutPage" });

  const paras = t.raw("story.paras") as string[];
  const entities = t.raw("group.entities") as { name: string; desc: string }[];
  const values = t.raw("values.items") as { title: string; desc: string }[];
  const numbers = t.raw("numbers") as { n: string; l: string }[];
  const groupIcons = [TruckIcon, FileCheckIcon, ShieldCheckIcon, BuildingIcon];

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pb-4 pt-16 sm:px-6 sm:pt-20">
        <SectionHead kicker={t("kicker")} title={t("title")} sub={t("sub")} />
      </section>

      {/* STORY */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="relative h-72 w-full overflow-hidden rounded-2xl border border-line sm:h-96">
              <Image
                src="/images/about-team.jpg"
                alt={t("story.title")}
                fill
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <p className="eyebrow">{t("story.title")}</p>
            <div className="mt-4 space-y-4 text-[16px] leading-relaxed text-ink-soft">
              {paras.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <div className="route-dots mx-auto max-w-7xl" aria-hidden="true" />

      {/* GROUP */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionHead
          kicker={t("group.kicker")}
          title={t("group.title")}
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {entities.map((e, i) => {
            const Icon = groupIcons[i % groupIcons.length];
            return (
              <Reveal key={e.name} delay={i * 80}>
                <div className="card card-hover h-full p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-abyss">
                    <Icon className="h-5 w-5 text-gold" />
                  </span>
                  <h3 className="display mt-4 text-xl text-ink">{e.name}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">{e.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* VALUES */}
      <section className="border-y border-line bg-cream/60">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <SectionHead kicker={t("values.kicker")} title={t("values.title")} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <div className="h-full rounded-2xl bg-paper p-6">
                  <p className="display text-4xl text-gold-deep/40">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="display mt-3 text-xl text-ink">{v.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP + NUMBERS — dark band */}
      <section className="meridian-bg">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <Reveal className="max-w-3xl">
            <p className="eyebrow eyebrow-light">{t("leadership.title")}</p>
            <p className="mt-4 text-lg leading-relaxed text-paper/80">
              {t("leadership.desc")}
            </p>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {numbers.map((s, i) => (
              <Reveal key={s.l} delay={i * 80}>
                <div className="rounded-2xl border border-paper/15 bg-paper/5 p-6 text-center">
                  <p className="display text-4xl text-gold sm:text-5xl">{s.n}</p>
                  <p className="mt-2 text-[13.5px] font-semibold text-paper/70">{s.l}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12 text-center">
            <h2 className="display text-3xl text-paper sm:text-4xl">{t("cta.title")}</h2>
            <p className="mt-3 text-paper/70">{t("cta.sub")}</p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 text-[15px] font-bold text-abyss transition-colors hover:bg-gold-deep hover:text-white"
            >
              {t("cta.cta")}
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
