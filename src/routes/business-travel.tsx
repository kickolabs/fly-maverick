import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/singapore.jpg";
import { Container, PageHero } from "@/components/site/ui";
import { BusinessEnquiryForm } from "@/components/forms/BusinessEnquiryForm";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/business-travel")({
  head: () => seo("Business Travel", "Flights, hotels and itineraries for business travellers and companies travelling abroad from India."),
  component: Business,
});

function Business() {
  return (
    <>
      <PageHero eyebrow="Business Travel" title="Business trips, handled smoothly." description="Flights, hotels and itineraries for individual travellers and teams." image={hero} />
      <section className="py-20">
        <Container className="max-w-4xl">
          <div className="rounded-lg border border-border bg-card p-6 md:p-10">
            <h2 className="mb-6 text-2xl font-bold">Business travel enquiry</h2>
            <BusinessEnquiryForm />
          </div>
        </Container>
      </section>
    </>
  );
}
