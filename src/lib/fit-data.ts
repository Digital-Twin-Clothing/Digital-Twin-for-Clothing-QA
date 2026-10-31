/**
 * Mock fit results for the landing-page demo.
 * In the real app these come from the backend: avatar measurements
 * compared against each garment's size chart.
 *
 * `position` runs from -1 (very tight) to 1 (very loose); 0 is a perfect fit.
 * `ease` is garment measurement minus body measurement, in cm.
 */
export type Size = "S" | "M" | "L" | "XL";
export type Region = "Chest" | "Waist" | "Hip";

export type SizeFit = {
  regions: Record<Region, { position: number; ease: string }>;
  /** Visual scale applied to the shirt on the demo figure. */
  scale: number;
  verdict: string;
  recommended: boolean;
};

export const SIZES: Size[] = ["S", "M", "L", "XL"];
export const REGIONS: Region[] = ["Chest", "Waist", "Hip"];

export const FIT_BY_SIZE: Record<Size, SizeFit> = {
  S: {
    regions: {
      Chest: { position: -0.75, ease: "−3.8" },
      Waist: { position: -0.55, ease: "−2.2" },
      Hip: { position: -0.65, ease: "−1.0" },
    },
    scale: 0.9,
    verdict: "Too tight",
    recommended: false,
  },
  M: {
    regions: {
      Chest: { position: -0.08, ease: "+2.1" },
      Waist: { position: 0.05, ease: "+4.0" },
      Hip: { position: 0.15, ease: "+5.3" },
    },
    scale: 1,
    verdict: "Good fit",
    recommended: true,
  },
  L: {
    regions: {
      Chest: { position: 0.45, ease: "+7.9" },
      Waist: { position: 0.55, ease: "+9.6" },
      Hip: { position: 0.5, ease: "+10.4" },
    },
    scale: 1.1,
    verdict: "Relaxed",
    recommended: false,
  },
  XL: {
    regions: {
      Chest: { position: 0.85, ease: "+13.2" },
      Waist: { position: 0.9, ease: "+15.1" },
      Hip: { position: 0.82, ease: "+15.8" },
    },
    scale: 1.2,
    verdict: "Too loose",
    recommended: false,
  },
};
