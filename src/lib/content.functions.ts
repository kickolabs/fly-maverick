import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { destinationImage, formatPrice, packageImage, type PublicDestination, type PublicPackage, type PublicPlace } from "./content";

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

type DestRow = Database["public"]["Tables"]["destinations"]["Row"];
const DEST_COLS = "id, slug, name, region, tagline, intro, experiences, image_url";
const PKG_COLS = "id, slug, name, summary, description, duration, types, highlights, image_url, price, currency, destination:destinations(slug, name, published)";

const toDest = (d: Pick<DestRow, "id" | "slug" | "name" | "region" | "tagline" | "intro" | "experiences" | "image_url">): PublicDestination => ({
  id: d.id, slug: d.slug, name: d.name, region: d.region, tagline: d.tagline, intro: d.intro, experiences: d.experiences,
  image: destinationImage(d.slug, d.image_url),
});

type PkgRow = {
  id: string; slug: string; name: string; summary: string; description: string; duration: string; types: string[]; highlights: string[];
  image_url: string | null; price: number | null; currency: string | null; destination: { slug: string; name: string; published: boolean } | null;
};
const toPkg = (p: PkgRow): PublicPackage => ({
  id: p.id, slug: p.slug, name: p.name, summary: p.summary, description: p.description, duration: p.duration, types: p.types, highlights: p.highlights,
  image: packageImage(p.slug, p.image_url), price: formatPrice(p.price, p.currency),
  country: p.destination && p.destination.published ? { slug: p.destination.slug, name: p.destination.name } : null,
});

function fail(what: string, error: { message: string }): never {
  console.error(`Failed to load ${what}:`, error.message);
  throw new Error(`We couldn't load ${what} right now. Please refresh.`);
}

export const listDestinations = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient().from("destinations").select(DEST_COLS).eq("published", true).order("display_order").order("name");
  if (error) fail("destinations", error);
  return data.map(toDest);
});

export const listPackages = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient().from("tour_packages").select(PKG_COLS).eq("published", true).order("display_order").order("name");
  if (error) fail("packages", error);
  return (data as unknown as PkgRow[]).map(toPkg);
});

export const getDestinationPage = createServerFn({ method: "GET" })
  .inputValidator((slug: string) => String(slug).slice(0, 120))
  .handler(async ({ data: slug }) => {
    const sb = publicClient();
    const { data: d, error } = await sb.from("destinations").select(DEST_COLS).eq("published", true).eq("slug", slug).maybeSingle();
    if (error) fail("this destination", error);
    if (!d) return null;
    const [places, pkgs] = await Promise.all([
      sb.from("tourist_places").select("id, name, description, image_url").eq("destination_id", d.id).eq("published", true).order("display_order").order("name"),
      sb.from("tour_packages").select(PKG_COLS).eq("destination_id", d.id).eq("published", true).order("display_order"),
    ]);
    if (places.error) fail("tourist places", places.error);
    if (pkgs.error) fail("packages", pkgs.error);
    return {
      destination: toDest(d),
      places: places.data.map((p): PublicPlace => ({ id: p.id, name: p.name, description: p.description, image: p.image_url })),
      packages: (pkgs.data as unknown as PkgRow[]).map(toPkg),
    };
  });

export const getPackagePage = createServerFn({ method: "GET" })
  .inputValidator((slug: string) => String(slug).slice(0, 120))
  .handler(async ({ data: slug }) => {
    const { data, error } = await publicClient().from("tour_packages").select(PKG_COLS).eq("published", true).eq("slug", slug).maybeSingle();
    if (error) fail("this package", error);
    return data ? toPkg(data as unknown as PkgRow) : null;
  });
