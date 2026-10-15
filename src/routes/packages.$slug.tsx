import { createFileRoute, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Container, PageHero } from "@/components/site/ui";
import { GeneralEnquiryForm } from "@/components/forms/GeneralEnquiryForm";
import { packagePageQuery } from "@/lib/content.queries";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/packages/$slug")({
  loader: async ({ params, context }) => {
    const p = await context.queryClient.ensureQueryData(packagePageQuery(params.slug));
    if (!p) throw notFound();
    return { name: p.name, summary: p.summary };
  },
  head: ({ loaderData }) => seo(loaderData?.name ?? "Holiday Package", loaderData?.summary || "International holiday package by Fly Maverick."),
  component: PackagePage,
});

function PackagePage() {
  const { slug } = Route.useParams();
  const { data: p } = useSuspenseQuery(packagePageQuery(slug));
  if (!p) return null;
  return (
    <>
      <PageHero eyebrow={p.types.join(" · ") || p.country?.name || "Holiday Package"} title={p.name} description={p.summary} image={p.image} />
      <section className="py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-lg leading-relaxed text-muted-foreground">{p.description}</p>
            {p.duration && <p className="mt-6 text-sm text-gold">{p.duration}</p>}
            {p.highlights.length > 0 && (
              <>
                <h2 className="mt-10 text-2xl font-bold">Highlights</h2>
                <ul className="mt-4 grid gap-2">
                  {p.highlights.map((h) => <li key={h} className="flex gap-2"><span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-gold" />{h}</li>)}
                </ul>
              </>
            )}
            <p className="mt-8 font-display font-semibold text-gold">{p.price ?? "Request a Quote"}</p>
          </div>
          <div id="quote" className="scroll-mt-28 rounded-lg border border-border bg-card p-6 md:p-8">
            <h2 className="mb-6 text-2xl font-bold">Request a quote</h2>
            <GeneralEnquiryForm type="package" defaultService="Holiday Packages" defaultDestination={p.country?.name ?? p.name} submitLabel="Request a Quote" />
          </div>
        </Container>
      </section>
    </>
  );
}
