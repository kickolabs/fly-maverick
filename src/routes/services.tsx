import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/dubai.jpg";
import { Container, PageHero, Reveal } from "@/components/site/ui";
import { CtaBand, HowItWorks } from "@/components/site/Sections";
import { services, visaNote } from "@/data/content";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/services")({
  head: () => seo("Travel Services", "Flights, holidays, hotels, business travel, tourist and business visa assistance and airport transfers."),
  component: Services,
});

function Services() {
  return (
    <>
      <PageHero eyebrow="Travel Services" title="One team for your whole journey." description="From the first flight search to the last transfer, we coordinate the details." image={hero} />
      <section className="py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.04} className="rounded-lg border border-border bg-card p-6">
                <s.icon className="h-6 w-6 text-gold" />
                <h2 className="mt-4 text-lg font-bold">{s.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
              </Reveal>
            ))}
          </div>
          <p className="mt-10 max-w-3xl text-xs leading-relaxed text-muted-foreground">{visaNote}</p>
        </Container>
      </section>
      <HowItWorks />
      <CtaBand />
    </>
  );
}
