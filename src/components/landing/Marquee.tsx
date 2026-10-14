const WORDS = ["Front", "Back", "Side", "T‑pose", "Reconstruct", "Try on", "Fit"];

/** Infinite ticker — the word list is rendered twice so the loop is seamless. Pauses on hover. */
export function Marquee() {
  return (
    <div className="marquee overflow-hidden border-y border-line py-[18px]" aria-hidden="true">
      <div className="marquee-track">
        {[...WORDS, ...WORDS].map((w, i) => (
          <span key={i} className="flex items-center gap-12 whitespace-nowrap font-serif text-[40px]">
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}
