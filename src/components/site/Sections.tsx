import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs, steps, whyChoose } from "@/data/content";
import { Container, Reveal, SectionHeading } from "./ui";

export function WhyChoose() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <SectionHeading eyebrow="Why Fly Maverick" title="Travel planned around you." description="Personal attention, honest guidance and careful coordination for every international journey." />
        <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {whyChoose.map(({ icon: Icon, title, description }, i) => (
            <Reveal key={title} delay={i * 0.05} className="bg-background p-8">
              <Icon className="h-6 w-6 text-gold" strokeWidth={1.5} />
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section className="theme-light bg-background py-24 text-foreground md:py-32">
      <Container>
        <SectionHeading eyebrow="How it works" title="From idea to departure in four steps." align="center" />
        <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
          <div className="absolute left-5 top-0 h-full w-px bg-border md:left-0 md:top-5 md:h-px md:w-full" aria-hidden />
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <li className="relative pl-16 md:pl-0">
                <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-gold bg-background font-display text-sm font-bold text-gold md:relative">
                  {i + 1}
                </span>
                <h3 className="text-lg font-semibold md:mt-6">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
              </li>
            </Reveal>
          ))}
        </ol>
        <p className="mx-auto mt-14 max-w-2xl text-center text-xs text-muted-foreground">
          Submitting an enquiry does not reserve a seat or package. Flight and package reservations are confirmed only after the required booking and payment process is completed.
        </p>
      </Container>
    </section>
  );
}

export function FaqList({ limit }: { limit?: number }) {
  const items = limit ? faqs.slice(0, limit) : faqs;
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((f, i) => (
        <AccordionItem key={f.q} value={`f${i}`}>
          <AccordionTrigger className="text-left font-display text-base hover:no-underline">{f.q}</AccordionTrigger>
          <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function CtaBand({ title = "Ready when you are.", text = "Tell us where you want to go and we'll take care of the rest." }: { title?: string; text?: string }) {
  return (
    <section className="py-24">
      <Container>
        <Reveal className="relative overflow-hidden rounded-lg border border-gold/30 bg-card px-8 py-16 text-center md:px-16">
          <p className="eyebrow mb-4">Your Journey. Our Expertise.</p>
          <h2 className="text-3xl font-bold md:text-5xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{text}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg"><Link to="/contact">Plan Your Trip</Link></Button>
            <Button asChild size="lg" variant="outline"><Link to="/flights">Book Your Flight</Link></Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
