import { getTranslations, setRequestLocale } from "next-intl/server";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";
import QuoteMailtoForm from "@/components/QuoteMailtoForm";
import { MailIcon, PhoneIcon, PinIcon, CheckIcon } from "@/components/icons";

type Props = { params: Promise<{ locale: string }> };

const FORM_KEYS = [
  "name", "company", "email", "service", "message", "messagePh",
  "submit", "note", "errRequired", "errEmail",
];

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contactPage" });
  const tf = await getTranslations({ locale, namespace: "footer" });

  const dict: Record<string, string> = {};
  for (const k of FORM_KEYS) dict[k] = t(`form.${k}`);
  const services = tf.raw("services") as string[];

  const cards = [
    {
      icon: PhoneIcon,
      title: t("cards.phone.title"),
      value: t("cards.phone.value"),
      note: t("cards.phone.note"),
      href: "tel:+17323388098",
    },
    {
      icon: MailIcon,
      title: t("cards.email.title"),
      value: t("cards.email.value"),
      note: t("cards.email.note"),
      href: "mailto:info@nielcustoms.ai",
    },
    {
      icon: PinIcon,
      title: t("cards.locations.title"),
      value: t("cards.locations.value"),
      note: t("cards.locations.note"),
    },
    {
      icon: CheckIcon,
      title: t("cards.hours.title"),
      value: t("cards.hours.value"),
      note: t("cards.hours.note"),
    },
  ];

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pb-4 pt-16 sm:px-6 sm:pt-20">
        <SectionHead kicker={t("kicker")} title={t("title")} sub={t("sub")} />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 80}>
              <div className="card card-hover h-full p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold-tint">
                  <c.icon className="h-5 w-5 text-gold-deep" />
                </span>
                <h3 className="display mt-4 text-lg text-ink">{c.title}</h3>
                {c.href ? (
                  <a href={c.href} className="mt-1 block break-words text-[15px] font-bold text-gold-deep hover:underline">
                    {c.value}
                  </a>
                ) : (
                  <p className="mt-1 text-[15px] font-bold text-ink">{c.value}</p>
                )}
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{c.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <Reveal>
          <div className="card mx-auto max-w-3xl p-7 sm:p-10">
            <h2 className="display text-3xl text-ink">{t("form.title")}</h2>
            <p className="mt-2 text-[15px] text-muted">{t("form.sub")}</p>
            <div className="mt-6">
              <QuoteMailtoForm messages={dict} services={services} />
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
