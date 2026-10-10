import italy from "@/assets/italy.jpg";
import switzerland from "@/assets/switzerland.jpg";
import dubai from "@/assets/dubai.jpg";
import maldives from "@/assets/maldives.jpg";
import singapore from "@/assets/singapore.jpg";
import thailand from "@/assets/thailand.jpg";
import japan from "@/assets/japan.jpg";
import australia from "@/assets/australia.jpg";
import newzealand from "@/assets/newzealand.jpg";
import family from "@/assets/family.jpg";

export type HolidayType = "City & Culture" | "Beach & Islands" | "Mountains & Nature" | "Family" | "Romantic";
export type TripLength = "Short break" | "One week" | "Extended";

export type HolidayPackage = {
  slug: string;
  name: string;
  image: string;
  summary: string;
  description: string;
  destinationSlugs: string[];
  types: HolidayType[];
  suggestedLength: TripLength;
  highlights: string[];
  /** Only set when verified pricing is provided by Fly Maverick. */
  price?: string;
};

export const tripLengthLabel: Record<TripLength, string> = {
  "Short break": "Short break · 3–5 nights suggested",
  "One week": "Around a week suggested",
  Extended: "10+ nights suggested",
};

export const packages: HolidayPackage[] = [
  {
    slug: "european-holidays",
    name: "European Holidays",
    image: italy,
    summary: "Multi-country journeys through Europe's great cities and coastlines.",
    description:
      "Combine Paris, Switzerland, Italy and London into one seamless trip, planned around your pace, interests and budget.",
    destinationSlugs: ["france", "italy", "switzerland", "united-kingdom"],
    types: ["City & Culture", "Romantic"],
    suggestedLength: "Extended",
    highlights: ["Multi-city routing", "Rail and flight connections", "Handpicked city hotels", "Sightseeing suggestions"],
  },
  {
    slug: "switzerland-escapes",
    name: "Switzerland Escapes",
    image: switzerland,
    summary: "Alpine scenery, lakeside towns and panoramic train journeys.",
    description:
      "Mountain excursions, lake cruises and scenic rail journeys, arranged around the season you choose to travel.",
    destinationSlugs: ["switzerland"],
    types: ["Mountains & Nature", "Romantic", "Family"],
    suggestedLength: "One week",
    highlights: ["Scenic rail journeys", "Mountain excursions", "Lake stays", "Seasonal planning"],
  },
  {
    slug: "dubai-holidays",
    name: "Dubai Holidays",
    image: dubai,
    summary: "Iconic skylines, desert adventures and luxury stays.",
    description: "City sightseeing, desert experiences and theme parks — ideal for short breaks and family holidays.",
    destinationSlugs: ["dubai"],
    types: ["City & Culture", "Family"],
    suggestedLength: "Short break",
    highlights: ["City sightseeing", "Desert safari options", "Theme park add-ons", "Hotel choices for every style"],
  },
  {
    slug: "maldives-getaways",
    name: "Maldives Getaways",
    image: maldives,
    summary: "Island resorts, overwater villas and slow, sunlit days.",
    description: "Resort and villa options matched to your travel style, from honeymoons to relaxed family escapes.",
    destinationSlugs: ["maldives"],
    types: ["Beach & Islands", "Romantic"],
    suggestedLength: "Short break",
    highlights: ["Resort recommendations", "Villa categories", "Transfer coordination", "Honeymoon planning"],
  },
  {
    slug: "singapore-holidays",
    name: "Singapore Holidays",
    image: singapore,
    summary: "Modern attractions, gardens and family-friendly fun.",
    description: "Theme parks, gardens and Sentosa island days, easily combined with Malaysia or Thailand.",
    destinationSlugs: ["singapore", "malaysia"],
    types: ["City & Culture", "Family"],
    suggestedLength: "Short break",
    highlights: ["Attraction planning", "Sentosa experiences", "Combine with Malaysia", "Central hotel options"],
  },
  {
    slug: "thailand-adventures",
    name: "Thailand Adventures",
    image: thailand,
    summary: "Bangkok, Phuket, Krabi and the islands of the Andaman.",
    description: "City energy, island hopping and beach time, combined into one trip to suit you.",
    destinationSlugs: ["thailand"],
    types: ["Beach & Islands", "City & Culture"],
    suggestedLength: "One week",
    highlights: ["Island hopping", "City and beach combos", "Resort options", "Local experiences"],
  },
  {
    slug: "japan-experiences",
    name: "Japan Experiences",
    image: japan,
    summary: "Tokyo, Kyoto, Mount Fuji and timeless traditions.",
    description: "Modern cities and ancient temples, connected by Japan's famous rail network.",
    destinationSlugs: ["japan"],
    types: ["City & Culture", "Mountains & Nature"],
    suggestedLength: "Extended",
    highlights: ["Rail-based routing", "Cultural experiences", "Seasonal timing advice", "City and ryokan stays"],
  },
  {
    slug: "australia-holidays",
    name: "Australia Holidays",
    image: australia,
    summary: "Harbour cities, reef adventures and coastal drives.",
    description: "Sydney, Melbourne, the Gold Coast and the Great Barrier Reef, arranged around your interests.",
    destinationSlugs: ["australia"],
    types: ["City & Culture", "Beach & Islands", "Family"],
    suggestedLength: "Extended",
    highlights: ["Multi-city routing", "Reef experiences", "Wildlife encounters", "Domestic connections"],
  },
  {
    slug: "new-zealand-adventures",
    name: "New Zealand Adventures",
    image: newzealand,
    summary: "Fjords, glaciers and dramatic landscapes.",
    description: "Scenic drives, adventure activities and breathtaking natural beauty across both islands.",
    destinationSlugs: ["new-zealand"],
    types: ["Mountains & Nature", "Romantic"],
    suggestedLength: "Extended",
    highlights: ["Self-drive or guided options", "Adventure activities", "Scenic cruises", "North and South Island"],
  },
  {
    slug: "family-international-vacations",
    name: "Family International Vacations",
    image: family,
    summary: "Stress-free overseas holidays designed for all ages.",
    description:
      "Family-friendly destinations, hotels and activities, planned with children's comfort and pace in mind.",
    destinationSlugs: ["dubai", "singapore", "thailand", "malaysia", "australia"],
    types: ["Family"],
    suggestedLength: "One week",
    highlights: ["Family-friendly hotels", "Kid-approved attractions", "Comfortable flight timings", "Flexible pacing"],
  },
];

export const holidayTypes: HolidayType[] = ["City & Culture", "Beach & Islands", "Mountains & Nature", "Family", "Romantic"];
export const tripLengths: TripLength[] = ["Short break", "One week", "Extended"];

export const getPackage = (slug: string) => packages.find((p) => p.slug === slug);
export const packagesForDestination = (slug: string) => packages.filter((p) => p.destinationSlugs.includes(slug));
