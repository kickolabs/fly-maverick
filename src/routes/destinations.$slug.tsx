import { createFileRoute, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Container, PageHero, SectionHeading } from "@/components/site/ui";
import { PackageCard } from "@/components/site/Cards";
import { GeneralEnquiryForm } from "@/components/forms/GeneralEnquiryForm";
import { destinationPageQuery } from "@/lib/content.queries";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/destinations/$slug")({
  loader: async ({ params, context }) => {
    const page = await context.queryClient.ensureQueryData(destinationPageQuery(params.slug));
    if (!page) throw notFound();
    return { name: page.destination.name, intro: page.destination.intro };
  },
  head: ({ loaderData }) =>
    seo(loaderData ? `${loaderData.name} Holidays & Flights` : "Destination", loaderData?.intro || "International destination by Fly Maverick."),
  component: DestinationPage,
});

function DestinationPage() {
  const { slug } = Route.useParams();
  const { data } = useSuspenseQuery(destinationPageQuery(slug));
  if (!data) return null;
  const { destination: d, places, packages: pkgs } = data;
  return (
    <>
      <PageHero eyebrow={d.region} title={d.name} description={d.tagline} image={d.image} />
      <section className="py-20">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-lg leading-relaxed text-muted-foreground">{d.intro}</p>
            {d.experiences.length > 0 && (
              <>
                <h2 className="mt-10 text-2xl font-bold">Experiences</h2>
                <ul className="mt-4 grid gap-2">
                  {d.experiences.map((e) => <li key={e} className="flex gap-2"><span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-gold" />{e}</li>)}
                </ul>
              </>
            )}
          </div>
          <div className="rounded-lg border border-border bg-card p-6 md:p-8">
            <h2 className="mb-6 text-2xl font-bold">Plan your {d.name} trip</h2>
            <GeneralEnquiryForm type="destination" defaultService="Holiday Packages" defaultDestination={d.name} submitLabel="Request a Quote" />
          </div>
        </Container>
      </section>
      {places.length > 0 && (
        <section className="py-20">
          <Container>
            <SectionHeading eyebrow="Places to visit" title={`Highlights of ${d.name}`} />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {places.map((p) => (
                <article key={p.id} className="group overflow-hidden rounded-lg border border-border bg-card">
                  {p.image && (
                    <div className="aspect-[4/3] overflow-hidden">
                      <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="text-lg font-bold">{p.name}</h3>
                    {p.description && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.description}</p>}
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>
      )}
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
