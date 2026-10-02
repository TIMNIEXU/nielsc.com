import { Link } from "@/i18n/routing";

/**
 * NIEL GROUP global bar — the same strip sits atop every Niel Group site.
 * Visual identity may differ per brand; this line must not.
 */
export default function GroupBar() {
  return (
    <div className="bg-abyss text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-1.5 sm:px-6">
        <Link
          href="/about"
          className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold transition-colors hover:text-white"
        >
          Niel Group
        </Link>
        <p className="truncate text-[11px] font-medium tracking-wide text-white/60">
          Supply Chain&nbsp;·&nbsp;Customs&nbsp;·&nbsp;Logistics&nbsp;·&nbsp;Insurance&nbsp;·&nbsp;Technology
        </p>
      </div>
    </div>
  );
}
