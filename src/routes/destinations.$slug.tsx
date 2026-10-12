import { createFileRoute, notFound } from "@tanstack/react-router";
import { Container, PageHero, SectionHeading } from "@/components/site/ui";
import { PackageCard } from "@/components/site/Cards";
import { GeneralEnquiryForm } from "@/components/forms/GeneralEnquiryForm";
import { getDestination } from "@/data/destinations";
import { packagesForDestination } from "@/data/packages";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/destinations/$slug")({
  loader: ({ params }) => {
    const d = getDestination(params.slug);
    if (!d) throw notFound();
    return { slug: d.slug };
  },
  head: ({ params }) => {
    const d = getDestination(params.slug);
    return seo(d ? `${d.name} Holidays & Flights` : "Destination", d?.intro ?? "International destination by Fly Maverick.");
  },
  component: DestinationPage,
});

function DestinationPage() {
  const { slug } = Route.useLoaderData();
  const d = getDestination(slug)!;
  const pkgs = packagesForDestination(slug);
  return (
    <>
      <PageHero eyebrow={d.region} title={d.name} description={d.tagline} image={d.image} />
      <section className="py-20">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-lg leading-relaxed text-muted-foreground">{d.intro}</p>
            <h2 className="mt-10 text-2xl font-bold">Experiences</h2>
            <ul className="mt-4 grid gap-2">
              {d.experiences.map((e) => <li key={e} className="flex gap-2"><span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-gold" />{e}</li>)}
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 md:p-8">
            <h2 className="mb-6 text-2xl font-bold">Plan your {d.name} trip</h2>
            <GeneralEnquiryForm type="destination" defaultService="Holiday Packages" defaultDestination={d.name} submitLabel="Request a Quote" />
          </div>
        </Container>
      </section>
      {pkgs.length > 0 && (
        <section className="bg-card py-20">
          <Container>
            <SectionHeading eyebrow="Packages" title={`Holidays featuring ${d.name}`} />
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{pkgs.map((p) => <PackageCard key={p.slug} p={p} />)}</div>
          </Container>
        </section>
      )}
    </>
  );
}
