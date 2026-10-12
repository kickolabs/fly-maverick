import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/booking-terms")({
  head: () => seo("Booking Terms", "How bookings, payments, changes and cancellations work with Fly Maverick."),
  component: () => (
    <LegalPage title="Booking Terms" sections={[
      { h: "Confirmation", p: "Reservations are confirmed only after booking and payment are complete." },
      { h: "Changes and cancellations", p: "Changes and cancellations follow the rules of the airline, hotel or supplier concerned and may involve fees." },
      { h: "Travel documents", p: "Travellers are responsible for holding a valid passport, visas and any documents required for their journey." },
    ]} />
  ),
});
