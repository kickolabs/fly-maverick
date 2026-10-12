import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () => seo("Privacy Policy", "How Fly Maverick collects and uses the details you share in travel enquiries."),
  component: () => (
    <LegalPage title="Privacy Policy" sections={[
      { h: "Information we collect", p: "When you send an enquiry we collect your name, email, mobile number and the travel details you provide." },
      { h: "How we use it", p: "We use your details only to respond to your enquiry and arrange your travel. We do not sell your information." },
      { h: "Sharing", p: "Details may be shared with airlines, hotels and travel partners only as needed to make your bookings." },
      { h: "Your choices", p: "You may ask us to update or delete your information at any time by contacting us." },
    ]} />
  ),
});
