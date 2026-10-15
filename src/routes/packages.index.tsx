import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import hero from "@/assets/maldives.jpg";
import { Container, PageHero } from "@/components/site/ui";
import { PackageCard } from "@/components/site/Cards";
import { CtaBand } from "@/components/site/Sections";
import { useSuspenseQuery } from "@tanstack/react-query";
import { holidayTypes } from "@/data/packages";
import { packagesQuery } from "@/lib/content.queries";
import { Button } from "@/components/ui/button";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/packages/")({
  head: () => seo("Holiday Packages", "Customisable international holiday packages — beaches, cities, mountains, family and romantic getaways."),
  loader: ({ context }) => context.queryClient.ensureQueryData(packagesQuery),
  component: Packages,
});

function Packages() {
  const { data: packages } = useSuspenseQuery(packagesQuery);
  const [type, setType] = useState<string>("All");
  const types = [...holidayTypes.filter((t) => packages.some((p) => p.types.includes(t))), ...[...new Set(packages.flatMap((p) => p.types))].filter((t) => !(holidayTypes as string[]).includes(t))];
  const list = type === "All" ? packages : packages.filter((p) => p.types.includes(type));
  return (
    <>
      <PageHero eyebrow="Holiday Packages" title="Holidays, tailored to you." description="Every package can be adjusted to your dates, interests and budget." image={hero} />
      <section className="py-20">
        <Container>
          <div className="mb-10 flex flex-wrap gap-2">
            {["All", ...types].map((t) => (
              <Button key={t} size="sm" variant={type === t ? "default" : "outline"} onClick={() => setType(t)}>{t}</Button>
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => <PackageCard key={p.slug} p={p} />)}
          </div>
        </Container>
      </section>
      <CtaBand title="Don't see your dream trip?" text="We'll build a holiday from scratch around your plans." />
    </>
  );
}
