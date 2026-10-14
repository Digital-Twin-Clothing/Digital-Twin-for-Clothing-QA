import { Button } from "@/components/ui/Button";
import { Reveal, RevealLines } from "@/components/ui/Reveal";

export function Cta() {
  return (
    <section id="cta" className="border-t border-line px-[var(--pad)] py-40 text-center">
      <Reveal as="p" className="eyebrow">
        Takes about two minutes
      </Reveal>
      <RevealLines
        className="mb-10 mt-3.5 font-serif text-[clamp(56px,10vw,150px)] font-normal leading-none"
        lines={["Meet your", <em key="twin" className="text-mute">twin.</em>]}
      />
      {/* <Button href="#" variant="primary" arrow magnetic>
        Start with four photos
      </Button> */}
    </section>
  );
}
