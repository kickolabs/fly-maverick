import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { visaNote } from "@/data/content";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/travel-disclaimer")({
  head: () => seo("Travel Disclaimer", "Important information about visas, suppliers and travel conditions."),
  component: () => (
    <LegalPage title="Travel Disclaimer" sections={[
      { h: "Visa assistance", p: visaNote },
      { h: "Third-party suppliers", p: "Flights, hotels and transfers are provided by independent suppliers whose terms apply." },
      { h: "Travel conditions", p: "Entry rules, schedules and local conditions can change. Please check requirements before you travel." },
    ]} />
  ),
});
