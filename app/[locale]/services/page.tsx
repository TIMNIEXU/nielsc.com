import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";

type Props = { params: Promise<{ locale: string }> };

const IMGS = [
  "/images/services/svc-oceanair.jpg",
  "/images/services/svc-trucking.jpg",
  "/images/services/svc-warehouse.jpg",
  "/images/services/svc-specialized.jpg",
  "/images/services/svc-fba.jpg",
];

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "servicesPage" });

  const sections = t.raw("sections") as { title: string; desc: string; bullets: string[] }[];

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pb-4 pt-16 sm:px-6 sm:pt-20">
        <SectionHead kicker={t("kicker")} title={t("title")} sub={t("sub")} />
      </section>

      {sections.map((s, i) => (
        <section key={s.title} className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
            <Reveal className={i % 2 === 1 ? "lg:order-2" : ""}>
              <div className="relative h-72 w-full overflow-hidden rounded-2xl border border-line sm:h-96">
                <Image
                  src={IMGS[i % IMGS.length]}
                  alt={s.title}
                  fill
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={100} className={i % 2 === 1 ? "lg:order-1" : ""}>
              <p className="eyebrow">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="display mt-3 text-4xl text-ink sm:text-5xl">{s.title}</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">{s.desc}</p>
              <ul className="mt-6 space-y-3">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-[15px] text-ink-soft">
                    <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" />
                    {b}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-abyss px-6 py-3 text-[14.5px] font-bold text-white transition-colors hover:bg-navy"
              >
                {t("cta")}
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
          {i < sections.length - 1 && (
            <div className="route-dots mt-16" aria-hidden="true" />
          )}
        </section>
      ))}

      {/* BOTTOM CTA */}
      <section className="meridian-bg mt-8">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6">
          <Reveal>
            <h2 className="display mx-auto max-w-3xl text-4xl text-paper sm:text-5xl">
              {t("bottom.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-paper/70">{t("bottom.sub")}</p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 text-[15px] font-bold text-abyss transition-colors hover:bg-gold-deep hover:text-white"
            >
              {t("bottom.cta")}
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
