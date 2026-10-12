import { createFileRoute, notFound } from "@tanstack/react-router";
import { Container, PageHero } from "@/components/site/ui";
import { GeneralEnquiryForm } from "@/components/forms/GeneralEnquiryForm";
import { getPackage, tripLengthLabel } from "@/data/packages";
import { getDestination } from "@/data/destinations";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/packages/$slug")({
  loader: ({ params }) => {
    const p = getPackage(params.slug);
    if (!p) throw notFound();
    return { slug: p.slug };
  },
  head: ({ params }) => {
    const p = getPackage(params.slug);
    return seo(p ? p.name : "Holiday Package", p?.summary ?? "International holiday package by Fly Maverick.");
  },
  component: PackagePage,
});

function PackagePage() {
  const { slug } = Route.useLoaderData();
  const p = getPackage(slug)!;
  const dest = p.destinationSlugs.map((s) => getDestination(s)?.name).filter(Boolean).join(", ");
  return (
    <>
      <PageHero eyebrow={p.types.join(" · ")} title={p.name} description={p.summary} image={p.image} />
      <section className="py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-lg leading-relaxed text-muted-foreground">{p.description}</p>
            <p className="mt-6 text-sm text-gold">{tripLengthLabel[p.suggestedLength]}</p>
            <h2 className="mt-10 text-2xl font-bold">Highlights</h2>
            <ul className="mt-4 grid gap-2">
              {p.highlights.map((h) => <li key={h} className="flex gap-2"><span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-gold" />{h}</li>)}
            </ul>
            <p className="mt-8 font-display font-semibold text-gold">{p.price ?? "Price on request"}</p>
          </div>
          <div id="quote" className="scroll-mt-28 rounded-lg border border-border bg-card p-6 md:p-8">
            <h2 className="mb-6 text-2xl font-bold">Request a quote</h2>
            <GeneralEnquiryForm type="package" defaultService="Holiday Packages" defaultDestination={dest || p.name} submitLabel="Request a Quote" />
          </div>
        </Container>
      </section>
    </>
  );
}
