import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

export default function SectionHead({
  kicker,
  title,
  sub,
  align = "center",
  tone = "light",
}: {
  kicker: string;
  title: string;
  sub?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
}) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left"
      )}
    >
      <p
        className={cn(
          "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.28em]",
          tone === "dark" ? "text-gold" : "text-gold-deep"
        )}
      >
        <span className="inline-block h-2 w-2 rounded-full bg-current" />
        {kicker}
      </p>
      <h2
        className={cn(
          "display mt-3 text-5xl sm:text-6xl",
          tone === "dark" ? "text-paper" : "text-ink"
        )}
      >
        {title}
      </h2>
      {sub && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            tone === "dark" ? "text-paper/70" : "text-muted"
          )}
        >
          {sub}
        </p>
      )}
    </Reveal>
  );
}
