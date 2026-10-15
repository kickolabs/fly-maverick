import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import hero from "@/assets/hero.jpg";
import { Button } from "@/components/ui/button";
import { Container, Reveal, SectionHeading } from "@/components/site/ui";
import { DestinationCard, PackageCard } from "@/components/site/Cards";
import { CtaBand, FaqList, HowItWorks, WhyChoose } from "@/components/site/Sections";
import { FlightEnquiryForm } from "@/components/forms/FlightEnquiryForm";
import { useSuspenseQuery } from "@tanstack/react-query";
import { destinationsQuery, packagesQuery } from "@/lib/content.queries";
import { services } from "@/data/content";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => seo("Fly Maverick — Travel Beyond Limits", "International flight booking, holiday packages, hotel stays and business travel planning for travellers from India."),
  component: Home,
});

function Home() {
  return (
    <>
      <section className="relative flex min-h-screen items-center overflow-hidden pt-24">
        <img src={hero} alt="Aircraft above the clouds at sunset" className="absolute inset-0 h-full w-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-overlay" />
        <Container className="relative grid gap-12 py-16 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="eyebrow mb-5">{site.supportingTagline}</p>
            <h1 className="text-5xl font-bold leading-[1.02] md:text-7xl">{site.tagline}</h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">{site.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg"><Link to="/flights">Book Your Flight</Link></Button>
              <Button asChild size="lg" variant="outline"><Link to="/packages">Explore Holidays</Link></Button>
            </div>
          </motion.div>
          <div className="rounded-lg border border-border bg-card/90 p-6 backdrop-blur md:p-8">
            <h2 className="mb-5 text-xl font-bold">Quick flight enquiry</h2>
            <FlightEnquiryForm compact />
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <SectionHeading eyebrow="What we do" title="Everything for your trip abroad" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((s, i) => (
              <Reveal key={s.title} delay={i * 0.05} className="rounded-lg border border-border bg-card p-6">
                <s.icon className="h-6 w-6 text-gold" />
                <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
              </Reveal>
            ))}
          </div>
          <Button asChild variant="outline" className="mt-10"><Link to="/services">All travel services</Link></Button>
        </Container>
      </section>

      <section className="bg-card py-24">
        <Container>
          <SectionHeading eyebrow="Destinations" title="Where will you go next?" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.slice(0, 8).map((d) => <DestinationCard key={d.slug} d={d} />)}
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <SectionHeading eyebrow="Holiday packages" title="Holidays, shaped around you" />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {packages.slice(0, 3).map((p) => <PackageCard key={p.slug} p={p} />)}
          </div>
        </Container>
      </section>

      <WhyChoose />
      <HowItWorks />
      <section className="py-24">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="FAQ" title="Common questions" />
          <div className="mt-10"><FaqList limit={5} /></div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
