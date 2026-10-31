import { BodyDefs } from "@/components/figure/BodyDefs";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Marquee } from "@/components/landing/Marquee";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FitPanel } from "@/components/landing/FitPanel";
import { Garments } from "@/components/landing/Garments";
import { Cta } from "@/components/landing/Cta";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <>
      {/* Shared SVG symbols (avatar body, clip path, shirt) used by every figure */}
      <BodyDefs />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <HowItWorks />
        <FitPanel />
        <Garments />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
