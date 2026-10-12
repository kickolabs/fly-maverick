import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () => seo("Terms and Conditions", "Terms for using the Fly Maverick website and travel enquiry services."),
  component: () => (
    <LegalPage title="Terms and Conditions" sections={[
      { h: "Use of this website", p: "Information on this website is for general guidance. Sending an enquiry does not create a booking." },
      { h: "Accuracy", p: "We aim to keep information accurate, but schedules, prices and availability are set by travel suppliers and may change." },
      { h: "Services", p: "Fly Maverick offers travel and ticketing services. We do not provide work visa, immigration or recruitment services." },
    ]} />
  ),
});
