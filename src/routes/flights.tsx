import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { Container, PageHero } from "@/components/site/ui";
import { FlightEnquiryForm } from "@/components/forms/FlightEnquiryForm";
import { FaqList, HowItWorks } from "@/components/site/Sections";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/flights")({
  head: () => seo("International Flight Booking", "Request international flight options for one-way, round-trip and multi-city journeys from India."),
  component: Flights,
});

function Flights() {
  return (
    <>
      <PageHero eyebrow="Flight Booking" title="International flights, booked with care." description="Share your route and dates — we'll send suitable flight options and help you book." image={hero} />
      <section className="py-20">
        <Container className="max-w-4xl">
          <div className="rounded-lg border border-border bg-card p-6 md:p-10">
            <h2 className="mb-6 text-2xl font-bold">Flight enquiry</h2>
            <FlightEnquiryForm />
          </div>
          <p className="mt-4 text-xs text-muted-foreground">Fares and seats are subject to airline availability. Reservations are confirmed only after booking and payment are complete.</p>
        </Container>
      </section>
      <HowItWorks />
      <section className="py-20"><Container className="max-w-3xl"><FaqList limit={4} /></Container></section>
    </>
  );
}
