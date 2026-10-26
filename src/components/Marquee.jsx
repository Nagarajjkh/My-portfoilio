const PHRASES = [
  'BUILD WITH PURPOSE',
  'LEARN CONTINUOUSLY',
  'DESIGN WITH INTENT',
  'TURN IDEAS INTO REALITY',
  'KEEP EXPLORING',
];

export default function Marquee() {
  // Duplicate the list so the track can translate -50% seamlessly.
  const items = [...PHRASES, ...PHRASES];
  return (
    <div
      className="relative w-full border-y border-hair bg-ink-surface overflow-hidden"
      aria-hidden="true"
    >
      <div className="marquee-track py-4 sm:py-5">
        {items.map((p, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-6 px-6 font-display tracking-tight text-bone/80 text-2xl sm:text-4xl"
          >
            {p}
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-ember shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
