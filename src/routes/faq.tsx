import { createFileRoute } from "@tanstack/react-router";
import { Container, SectionHeading } from "@/components/site/ui";
import { CtaBand, FaqList } from "@/components/site/Sections";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/faq")({
  head: () => seo("FAQ", "Answers to common questions about booking international flights and holidays with Fly Maverick."),
  component: Faq,
});

function Faq() {
  return (
    <>
      <section className="pb-20 pt-36">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />
          <div className="mt-10"><FaqList /></div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
