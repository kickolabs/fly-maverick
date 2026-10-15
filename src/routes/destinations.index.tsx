import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import hero from "@/assets/switzerland.jpg";
import { Container, PageHero } from "@/components/site/ui";
import { DestinationCard } from "@/components/site/Cards";
import { CtaBand } from "@/components/site/Sections";
import { destinationsQuery } from "@/lib/content.queries";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/destinations/")({
  head: () => seo("Destinations", "Explore popular international destinations from India — Dubai, Singapore, Thailand, Europe, Japan and more."),
  loader: ({ context }) => context.queryClient.ensureQueryData(destinationsQuery),
  component: Destinations,
});

function Destinations() {
  const { data: destinations } = useSuspenseQuery(destinationsQuery);
  return (
    <>
      <PageHero eyebrow="Destinations" title="The world, within reach." description="Popular international destinations for holidays, honeymoons and business trips." image={hero} />
      <section className="py-20">
        <Container className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d) => <DestinationCard key={d.slug} d={d} />)}
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
