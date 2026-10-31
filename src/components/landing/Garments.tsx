import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const GARMENTS = [
  {
    name: "Essential tee",
    sizes: "XS–XL",
    path: "M40 20 L52 16 Q60 24 68 16 L80 20 L100 36 L90 48 L82 42 L82 100 L38 100 L38 42 L30 48 L20 36 Z",
  },
  {
    name: "Oxford shirt",
    sizes: "S–XXL",
    path: "M42 18 L52 14 L60 24 L68 14 L78 18 L92 30 L102 92 L92 94 L84 50 L84 104 L36 104 L36 50 L28 94 L18 92 L28 30 Z M60 24 L60 104",
  },
  {
    name: "Straight trouser",
    sizes: "28–38",
    path: "M38 14 L82 14 L86 106 L66 106 L60 48 L54 106 L34 106 Z",
  },
  {
    name: "Wool blazer",
    sizes: "XS–XL",
    path: "M42 18 L52 14 L60 40 L68 14 L78 18 L94 30 L104 96 L92 98 L86 52 L86 106 L34 106 L34 52 L28 98 L16 96 L26 30 Z M52 14 L50 34 L60 40 L70 34 L68 14 M60 40 L60 106",
  },
];

/** Garment cards: lift on hover and the line drawing re-traces itself. */
export function Garments() {
  return (
    <section id="garments" className="border-t border-line px-[var(--pad)] py-[120px]">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="eyebrow">Collection</p>
          <h2 className="mt-3.5 font-serif text-[clamp(40px,5vw,72px)] font-normal leading-none tracking-[-0.01em]">
            Ready to try on
          </h2>
        </div>
        <Button href="#" arrow>
          View all
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-[18px] md:grid-cols-4">
        {GARMENTS.map((g, i) => (
          <Reveal key={g.name} delay={i * 0.08} className="garment-card rounded-[20px] border border-line bg-card p-[18px]">
            <div className="garment-art mb-4 flex aspect-square items-center justify-center rounded-[14px] bg-bg">
              <svg viewBox="0 0 120 120" className="w-[58%] overflow-visible" aria-hidden="true">
                <path pathLength={1} d={g.path} />
              </svg>
            </div>
            <h4 className="text-base font-medium">{g.name}</h4>
            <div className="mt-1 flex justify-between text-[13px] text-mute">
              <span>{g.sizes}</span>
              <a href="#" className="hover:text-ink">
                Try on <span className="arrow">→</span>
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
