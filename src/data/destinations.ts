import dubai from "@/assets/dubai.jpg";
import singapore from "@/assets/singapore.jpg";
import thailand from "@/assets/thailand.jpg";
import malaysia from "@/assets/malaysia.jpg";
import maldives from "@/assets/maldives.jpg";
import switzerland from "@/assets/switzerland.jpg";
import france from "@/assets/france.jpg";
import italy from "@/assets/italy.jpg";
import uk from "@/assets/uk.jpg";
import australia from "@/assets/australia.jpg";
import newzealand from "@/assets/newzealand.jpg";
import japan from "@/assets/japan.jpg";

export type Destination = {
  slug: string;
  name: string;
  region: string;
  image: string;
  tagline: string;
  intro: string;
  experiences: string[];
};

export const destinations: Destination[] = [
  {
    slug: "dubai",
    name: "Dubai",
    region: "Middle East",
    image: dubai,
    tagline: "Skylines, souks and desert sunsets",
    intro:
      "A city of record-breaking architecture, world-class shopping and golden desert landscapes, all within easy reach of India.",
    experiences: ["Burj Khalifa observation decks", "Desert safari at sunset", "Dubai Marina dhow cruise", "Old Dubai souks"],
  },
  {
    slug: "singapore",
    name: "Singapore",
    region: "Southeast Asia",
    image: singapore,
    tagline: "A garden city of modern wonders",
    intro:
      "Clean, green and effortlessly modern, Singapore blends futuristic gardens, family attractions and an exceptional food scene.",
    experiences: ["Gardens by the Bay", "Sentosa Island", "Marina Bay at night", "Hawker centre food trails"],
  },
  {
    slug: "thailand",
    name: "Thailand",
    region: "Southeast Asia",
    image: thailand,
    tagline: "Islands, temples and tropical warmth",
    intro:
      "From buzzing Bangkok to the limestone islands of the Andaman Sea, Thailand offers beaches, culture and warm hospitality.",
    experiences: ["Phi Phi island hopping", "Bangkok temples", "Phuket beaches", "Thai cooking classes"],
  },
  {
    slug: "malaysia",
    name: "Malaysia",
    region: "Southeast Asia",
    image: malaysia,
    tagline: "Cityscapes meet rainforest and coast",
    intro:
      "Malaysia pairs the energy of Kuala Lumpur with cool highlands, island escapes and rich multicultural heritage.",
    experiences: ["Petronas Twin Towers", "Langkawi islands", "Genting Highlands", "Penang street food"],
  },
  {
    slug: "maldives",
    name: "Maldives",
    region: "Indian Ocean",
    image: maldives,
    tagline: "Overwater villas and turquoise lagoons",
    intro:
      "A string of coral islands made for unhurried days, private villas and some of the clearest water on the planet.",
    experiences: ["Overwater villa stays", "Snorkelling house reefs", "Sunset cruises", "Sandbank picnics"],
  },
  {
    slug: "switzerland",
    name: "Switzerland",
    region: "Europe",
    image: switzerland,
    tagline: "Alpine peaks and storybook villages",
    intro:
      "Snow-capped mountains, mirror-like lakes and scenic railways make Switzerland a timeless choice for every season.",
    experiences: ["Scenic panoramic trains", "Jungfraujoch excursions", "Lake Lucerne cruises", "Zermatt and the Matterhorn"],
  },
  {
    slug: "france",
    name: "France",
    region: "Europe",
    image: france,
    tagline: "Romance, art and refined living",
    intro:
      "Paris sets the stage for art, fashion and cuisine, while the French countryside and Riviera invite slower discovery.",
    experiences: ["Eiffel Tower evenings", "Louvre and Musée d'Orsay", "Seine river cruises", "French Riviera drives"],
  },
  {
    slug: "italy",
    name: "Italy",
    region: "Europe",
    image: italy,
    tagline: "History, coastlines and la dolce vita",
    intro:
      "Ancient Rome, Renaissance Florence, romantic Venice and the dramatic Amalfi Coast — Italy rewards every kind of traveller.",
    experiences: ["Colosseum and Vatican", "Venice gondola rides", "Tuscan countryside", "Amalfi Coast villages"],
  },
  {
    slug: "united-kingdom",
    name: "United Kingdom",
    region: "Europe",
    image: uk,
    tagline: "Royal heritage and vibrant cities",
    intro:
      "From London's landmarks to the Scottish Highlands, the UK combines heritage, theatre and beautiful countryside.",
    experiences: ["London landmarks", "West End theatre", "Edinburgh old town", "Scottish Highlands"],
  },
  {
    slug: "australia",
    name: "Australia",
    region: "Oceania",
    image: australia,
    tagline: "Iconic harbours and wild coastlines",
    intro:
      "Cosmopolitan cities, the Great Barrier Reef and unique wildlife make Australia a destination of big experiences.",
    experiences: ["Sydney Opera House", "Great Barrier Reef", "Great Ocean Road", "Wildlife encounters"],
  },
  {
    slug: "new-zealand",
    name: "New Zealand",
    region: "Oceania",
    image: newzealand,
    tagline: "Fjords, mountains and adventure",
    intro:
      "Dramatic fjords, glaciers and rolling green landscapes make New Zealand a dream for scenery and adventure lovers.",
    experiences: ["Milford Sound cruises", "Queenstown adventures", "Hobbiton", "Glacier and lake drives"],
  },
  {
    slug: "japan",
    name: "Japan",
    region: "East Asia",
    image: japan,
    tagline: "Tradition and innovation in harmony",
    intro:
      "Japan balances serene temples and gardens with neon-lit cities, bullet trains and a world-renowned food culture.",
    experiences: ["Mount Fuji views", "Kyoto temples", "Tokyo city life", "Cherry blossom season"],
  },
];

export const getDestination = (slug: string) => destinations.find((d) => d.slug === slug);
