import { destinations as staticDestinations } from "@/data/destinations";
import { packages as staticPackages } from "@/data/packages";
import heroFallback from "@/assets/hero.jpg";

export type PublicDestination = {
  id: string;
  slug: string;
  name: string;
  region: string;
  tagline: string;
  intro: string;
  experiences: string[];
  image: string;
};

export type PublicPlace = { id: string; name: string; description: string; image: string | null };

export type PublicPackage = {
  id: string;
  slug: string;
  name: string;
  summary: string;
  description: string;
  duration: string;
  types: string[];
  highlights: string[];
  image: string;
  /** Formatted price, or null when no confirmed price exists ("Request a Quote"). */
  price: string | null;
  country: { slug: string; name: string } | null;
};

/** Original bundled photos are used when an admin hasn't uploaded a cover image. */
export const destinationImage = (slug: string, url: string | null) =>
  url || staticDestinations.find((d) => d.slug === slug)?.image || heroFallback;
export const packageImage = (slug: string, url: string | null) =>
  url || staticPackages.find((p) => p.slug === slug)?.image || heroFallback;

export function formatPrice(price: number | string | null, currency: string | null) {
  if (price === null || price === undefined || price === "") return null;
  const n = Number(price);
  if (!Number.isFinite(n)) return null;
  const code = (currency || "INR").toUpperCase();
  try {
    return `From ${new Intl.NumberFormat("en-IN", { style: "currency", currency: code, maximumFractionDigits: 0 }).format(n)}`;
  } catch {
    return `From ${code} ${n.toLocaleString("en-IN")}`;
  }
}

export const slugify = (s: string) =>
  s.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
