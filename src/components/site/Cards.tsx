import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Destination } from "@/data/destinations";
import { tripLengthLabel, type HolidayPackage } from "@/data/packages";

export function DestinationCard({ d }: { d: Destination }) {
  return (
    <Link
      to="/destinations/$slug"
      params={{ slug: d.slug }}
      className="group relative block aspect-[4/5] overflow-hidden rounded-lg"
    >
      <img src={d.image} alt={d.name} loading="lazy" width={1024} height={768} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-overlay-card" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="eyebrow mb-2">{d.region}</p>
        <h3 className="text-2xl font-bold">{d.name}</h3>
        <p className="mt-1 text-sm text-foreground/75">{d.tagline}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gold">
          Explore Destination <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}

export function PackageCard({ p }: { p: HolidayPackage }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-elegant">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={p.image} alt={p.name} loading="lazy" width={1024} height={768} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
          {p.types.slice(0, 2).map((t) => (
            <span key={t} className="rounded-full bg-background/80 px-2.5 py-1 text-[11px] font-medium text-foreground backdrop-blur">{t}</span>
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold">{p.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
        <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground"><Clock className="h-3.5 w-3.5 text-gold" />{tripLengthLabel[p.suggestedLength]}</p>
        <ul className="mt-4 grid gap-1.5 text-sm">
          {p.highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />{h}</li>
          ))}
        </ul>
        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <span className="font-display text-sm font-semibold text-gold">{p.price ?? "Price on request"}</span>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm">
              <Link to="/packages/$slug" params={{ slug: p.slug }}>View Package</Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/packages/$slug" params={{ slug: p.slug }} hash="quote">Request a Quote</Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
