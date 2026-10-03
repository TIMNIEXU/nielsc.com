export default function Ticker({ items }: { items: string[] }) {
  // Rendered twice for a seamless marquee loop; the track translates -50%.
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-ink bg-ink py-3.5" aria-hidden="true">
      <div className="ticker-track flex w-max items-center">
        {row.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="display px-6 text-2xl tracking-wide text-paper">
              {item}
            </span>
            <span className="text-xl font-bold text-gold">→</span>
          </span>
        ))}
      </div>
    </div>
  );
}
