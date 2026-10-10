import { Link } from "@tanstack/react-router";
import { Menu, Plane } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { navLinks, site } from "@/config/site";
import { cn } from "@/lib/utils";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label={`${site.name} home`}>
      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/60">
        <Plane className="h-4 w-4 -rotate-45 text-gold" />
      </span>
      <span className="font-display text-lg font-bold tracking-tight">
        FLY <span className="text-gold">MAVERICK</span>
      </span>
    </Link>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-border bg-background/90 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5 md:px-8">
        <Logo />
        <nav className="hidden items-center gap-6 xl:flex" aria-label="Main">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm text-foreground/75 transition-colors hover:text-foreground"
              activeProps={{ className: "!text-gold" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 xl:flex">
          <Button asChild variant="ghost" size="sm">
            <Link to="/flights">Book Your Flight</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/contact">Plan Your Trip</Link>
          </Button>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="xl:hidden" aria-label="Open menu">
              <Menu className="!h-6 !w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 border-border bg-background">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav className="mt-10 flex flex-col gap-1" aria-label="Mobile">
              {navLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 font-display text-lg text-foreground/85 hover:bg-accent"
                  activeProps={{ className: "!text-gold" }}
                  activeOptions={{ exact: l.to === "/" }}
                >
                  {l.label}
                </Link>
              ))}
              <Link to="/business-travel" onClick={() => setOpen(false)} className="rounded-md px-3 py-3 font-display text-lg text-foreground/85 hover:bg-accent">
                Business Travel
              </Link>
            </nav>
            <div className="mt-8 flex flex-col gap-3 px-3">
              <Button asChild onClick={() => setOpen(false)}>
                <Link to="/contact">Plan Your Trip</Link>
              </Button>
              <Button asChild variant="outline" onClick={() => setOpen(false)}>
                <Link to="/flights">Book Your Flight</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
