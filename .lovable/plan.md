# Fly Maverick — Premium International Travel Website

A multi-page, enquiry-based travel site. No fake prices, reviews, statistics or live flight availability. No work visa, recruitment or immigration content.

## Design system
- Colors: deep black #101010, charcoal #181818, gold #C9A227 (used only for highlights and buttons), white, light gray #F5F5F5, secondary text #777777. Dark-led luxury look with light sections for contrast.
- Fonts: Montserrat headings, Inter body (loaded in the page head).
- Cinematic AI-generated photography for the hero, the 12 destinations and the package categories.
- Subtle Framer Motion reveals and page fades; elegant card hover effects.

## Pages
- `/` Home: full-width hero with the "Your Next Adventure Starts Here." headline, a compact flight enquiry box, services preview, featured destinations, package highlights, Why Choose Us (no numbers), the 4-step How It Works timeline (horizontal on desktop, vertical on mobile), FAQ and a closing call to action.
- `/about`: brand story and positioning.
- `/flights`: "Fly Further. Travel Smarter." with features and the full flight enquiry form (one-way, round-trip, multi-city).
- `/packages`: 10 package categories with filters for destination, holiday type and duration. Every card shows "Request a Quote" (no prices).
- `/packages/$slug`: package detail page with inspiration and highlights, no invented itineraries, plus a quote form.
- `/destinations` plus `/destinations/$slug` for the 12 destinations: introduction, popular experiences, related packages, a flight enquiry button and an enquiry form.
- `/services`: the 9 services, with visa help described as support for tourist and business trips, plus a note that visa decisions rest with the authorities.
- `/business-travel`: "Business Travel, Made Simpler." with the corporate enquiry form.
- `/contact`: full contact form with the service dropdown and a privacy notice.
- `/faq` plus legal pages: `/privacy`, `/terms`, `/booking-terms`, `/travel-disclaimer`.
- Shared layout: a sticky navigation bar with "Plan Your Trip" and "Book Your Flight" buttons, a slide-out menu on mobile, a premium footer and a floating WhatsApp button that pre-fills the message with the chosen destination or service.

## Enquiries (Lovable Cloud)
- Turn on Lovable Cloud and store every enquiry in one secure table with a type field (flight, package, destination, business, contact).
- Website visitors can send enquiries but can never read them.
- Forms check that required fields are filled and that emails and Indian mobile numbers (+91, 10 digits starting with 6–9) are valid. Each form shows loading, success and error states and blocks double submissions. A success message appears only after the enquiry is actually saved.
- Messages always say "enquiry received", never "booked".

## Configurable details
The WhatsApp number, phone, email, address and social links live in one settings file and stay as clearly marked placeholders until you send the real ones. No contact details will be made up.

## Technical details
- TanStack Start routes, each with its own title, description and Open Graph tags; sitemap.xml and robots.txt.
- Shared content lives in typed data files (`src/data/destinations.ts`, `packages.ts`, `services.ts`) and `src/config/site.ts`.
- Forms use react-hook-form and zod. Enquiries are saved by server functions that check the input with zod, then insert with an anon-only INSERT RLS policy, with no SELECT.
- Images are lazy-loaded below the fold. Install framer-motion.
- Small tests cover phone and email validation and the forbidden-services FAQ answer.
