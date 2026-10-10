import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { site } from "@/config/site";
import { Logo } from "./Header";

const quick = [
  { to: "/flights", label: "Flight Booking" },
  { to: "/packages", label: "Holiday Packages" },
  { to: "/destinations", label: "Destinations" },
  { to: "/business-travel", label: "Business Travel" },
  { to: "/services", label: "Travel Services" },
  { to: "/about", label: "About Us" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact Us" },
] as const;

const legal = [
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms and Conditions" },
  { to: "/booking-terms", label: "Booking Terms" },
  { to: "/travel-disclaimer", label: "Travel Disclaimer" },
] as const;

export function Footer() {
  const socials = [
    { href: site.social.instagram, icon: Instagram, label: "Instagram" },
    { href: site.social.facebook, icon: Facebook, label: "Facebook" },
    { href: site.social.linkedin, icon: Linkedin, label: "LinkedIn" },
    { href: site.social.x, icon: Twitter, label: "X" },
  ].filter((s) => s.href);
  const { phone, email, address } = site.contact;

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-2 md:px-8 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Logo />
          <p className="mt-4 font-display text-sm font-semibold text-gold">{site.tagline}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{site.intro}</p>
          {socials.length > 0 && (
            <div className="mt-5 flex gap-3">
              {socials.map(({ href, icon: Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="flex h-9 w-9 items-center justify-center rounded-full border border-border hover:border-gold hover:text-gold">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest">Explore</h3>
          <ul className="grid gap-2.5 text-sm text-muted-foreground">
            {quick.map((l) => (
              <li key={l.to}><Link to={l.to} className="hover:text-gold">{l.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest">Legal</h3>
          <ul className="grid gap-2.5 text-sm text-muted-foreground">
            {legal.map((l) => (
              <li key={l.to}><Link to={l.to} className="hover:text-gold">{l.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest">Contact</h3>
          <ul className="grid gap-3 text-sm text-muted-foreground">
            {phone && <li className="flex gap-2"><Phone className="h-4 w-4 text-gold" /><a href={`tel:${phone}`}>{phone}</a></li>}
            {email && <li className="flex gap-2"><Mail className="h-4 w-4 text-gold" /><a href={`mailto:${email}`}>{email}</a></li>}
            {address && <li className="flex gap-2"><MapPin className="h-4 w-4 text-gold" />{address}</li>}
            <li>
              <Link to="/contact" className="text-foreground underline-offset-4 hover:text-gold hover:underline">Send us an enquiry →</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-muted-foreground md:flex-row md:justify-between md:px-8">
          <p>© {new Date().getFullYear()} {site.name}. {site.supportingTagline}</p>
          <p>International travel &amp; ticketing. We do not offer work visa, immigration or recruitment services.</p>
        </div>
      </div>
    </footer>
  );
}
