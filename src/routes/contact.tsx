import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container, SectionHeading } from "@/components/site/ui";
import { GeneralEnquiryForm } from "@/components/forms/GeneralEnquiryForm";
import { site } from "@/config/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => seo("Contact Us", "Send Fly Maverick an enquiry about international flights, holidays, hotels or business travel."),
  component: Contact,
});

function Contact() {
  const { phone, email, address } = site.contact;
  return (
    <section className="pb-24 pt-36">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <SectionHeading eyebrow="Contact Us" title="Let's plan your trip." description="Tell us about your travel plans and our team will get back to you with suitable options." />
          <ul className="mt-8 grid gap-4 text-muted-foreground">
            {phone && <li className="flex gap-3"><Phone className="h-5 w-5 text-gold" /><a href={`tel:${phone}`}>{phone}</a></li>}
            {email && <li className="flex gap-3"><Mail className="h-5 w-5 text-gold" /><a href={`mailto:${email}`}>{email}</a></li>}
            {address && <li className="flex gap-3"><MapPin className="h-5 w-5 text-gold" />{address}</li>}
          </ul>
        </div>
        <div className="rounded-lg border border-border bg-card p-6 md:p-8">
          <GeneralEnquiryForm type="contact" />
        </div>
      </Container>
    </section>
  );
}
