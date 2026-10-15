import { site } from "@/config/site";
import type { Enquiry } from "./validation";

/** Digits only, international format, no "+" — e.g. 918925898600. */
export const businessWhatsAppNumber = site.whatsappNumber;

/** tel: link for any displayed phone number. */
export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

/** Click-to-chat URL. wa.me opens the WhatsApp app on mobile and WhatsApp Web on desktop. */
export function whatsappUrl(text: string, number: string = businessWhatsAppNumber) {
  const digits = number.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

/** Turn an Indian mobile as typed by a customer into wa.me digits (91XXXXXXXXXX). */
export function customerWhatsAppDigits(mobile: string) {
  const d = mobile.replace(/\D/g, "");
  if (d.length === 10) return `91${d}`;
  if (d.length === 11 && d.startsWith("0")) return `91${d.slice(1)}`;
  return d;
}

export type EnquirySummary = {
  name: string;
  mobile: string;
  email: string;
  service: string;
  destination: string;
  travelDate: string;
  travellers: string;
  message: string;
};

const cabinLabel: Record<string, string> = { economy: "Economy", premium_economy: "Premium Economy", business: "Business", first: "First" };
const tripLabel: Record<string, string> = { one_way: "One Way", round_trip: "Round Trip", multi_city: "Multi-City" };

export function summarizeEnquiry(e: Enquiry): EnquirySummary {
  const common = { name: e.full_name.trim(), mobile: e.mobile.trim(), email: e.email.trim() };
  if (e.type === "flight") {
    const people = e.adults + (e.children ?? 0);
    const extra = [`Trip: ${tripLabel[e.trip_type]}`, `Cabin: ${cabinLabel[e.cabin]}`, `Adults: ${e.adults}, Children: ${e.children ?? 0}`];
    return {
      ...common,
      service: "International Flight Booking",
      destination: `${e.from} → ${e.to}`,
      travelDate: e.return_date ? `${e.depart_date} to ${e.return_date}` : e.depart_date,
      travellers: String(people),
      message: [extra.join(" | "), e.notes].filter(Boolean).join("\n"),
    };
  }
  if (e.type === "business") {
    return {
      ...common,
      service: "Business Travel",
      destination: `${e.from} → ${e.destination}`,
      travelDate: e.travel_dates,
      travellers: String(e.travellers),
      message: [`Company: ${e.company_name}`, e.notes].filter(Boolean).join("\n"),
    };
  }
  return {
    ...common,
    service: e.service,
    destination: e.destination || "",
    travelDate: e.travel_date || "",
    travellers: e.travellers ? String(e.travellers) : "",
    message: e.message || "",
  };
}

const orDash = (v: string) => (v && v.trim() ? v.trim() : "Not specified");

export function buildEnquiryWhatsAppMessage(s: EnquirySummary) {
  return [
    "NEW FLY MAVERICK WEBSITE ENQUIRY",
    `Customer Name: ${orDash(s.name)}`,
    `Customer Mobile: ${orDash(s.mobile)}`,
    `Customer Email: ${orDash(s.email)}`,
    `Service Required: ${orDash(s.service)}`,
    `Destination: ${orDash(s.destination)}`,
    `Travel Date: ${orDash(s.travelDate)}`,
    `Number of Travellers: ${orDash(s.travellers)}`,
    `Customer Message: ${orDash(s.message)}`,
    "Source: Fly Maverick Website",
  ].join("\n\n");
}
