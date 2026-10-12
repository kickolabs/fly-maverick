import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/family.jpg";
import { Container, PageHero, Reveal } from "@/components/site/ui";
import { CtaBand, HowItWorks, WhyChoose } from "@/components/site/Sections";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => seo("About Us", "Learn about Fly Maverick, an India-based international travel and ticketing company."),
  component: About,
});

function About() {
  return (
    <>
      <PageHero eyebrow="About Us" title="Travel planned by people who care." description={site.intro} image={hero} />
      <section className="py-24">
        <Container className="max-w-3xl space-y-6 text-lg leading-relaxed text-muted-foreground">
          <Reveal><p>We help travellers from India explore the world — from first international holidays to regular business trips. Our team handles flight options, hotel stays, holiday itineraries and the travel details in between.</p></Reveal>
          <Reveal><p>Every trip starts with a conversation. Tell us where you want to go, and we'll come back with clear, suitable options — no pressure, no jargon.</p></Reveal>
          <Reveal><p className="text-sm">Fly Maverick provides travel and ticketing services only. We do not offer work visas, immigration or recruitment services.</p></Reveal>
        </Container>
      </section>
      <WhyChoose />
      <HowItWorks />
      <CtaBand />
    </>
  );
}
