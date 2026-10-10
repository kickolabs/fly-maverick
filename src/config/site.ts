/**
 * Business details for Fly Maverick.
 * PLACEHOLDERS: leave a value empty ("") until the real detail is confirmed.
 * Empty values are hidden on the site and never replaced with made-up data.
 */
export const site = {
  name: "Fly Maverick",
  tagline: "Travel Beyond Limits.",
  supportingTagline: "Your Journey. Our Expertise.",
  intro:
    "Fly Maverick is an international travel and ticketing company based in India, helping travellers plan flights, holidays and hotel stays abroad.",
  // WhatsApp business number in international format without "+" or spaces, e.g. "9198XXXXXXXX"
  whatsappNumber: "",
  contact: {
    phone: "",
    email: "",
    address: "",
  },
  social: {
    instagram: "",
    facebook: "",
    linkedin: "",
    x: "",
  },
} as const;

export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/flights", label: "Flight Booking" },
  { to: "/packages", label: "Holiday Packages" },
  { to: "/destinations", label: "Destinations" },
  { to: "/services", label: "Travel Services" },
  { to: "/contact", label: "Contact Us" },
] as const;

export const serviceOptions = [
  "International Flight Booking",
  "Holiday Packages",
  "Hotel Reservations",
  "Business Travel",
  "Tourist Visa Assistance",
  "Business Visa Assistance",
  "Customized Travel Planning",
  "Other Travel Enquiry",
] as const;
