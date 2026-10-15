import { describe, expect, it } from "vitest";
import { site } from "@/config/site";
import { buildEnquiryWhatsAppMessage, customerWhatsAppDigits, summarizeEnquiry, telHref, whatsappUrl } from "./whatsapp";

describe("business contact number", () => {
  it("is +91 89258 98600 for WhatsApp and phone", () => {
    expect(site.whatsappNumber).toBe("918925898600");
    expect(site.contact.phone).toBe("+91 89258 98600");
    expect(telHref(site.contact.phone)).toBe("tel:+918925898600");
  });
});

describe("WhatsApp enquiry message", () => {
  const msg = buildEnquiryWhatsAppMessage(
    summarizeEnquiry({ type: "contact", full_name: "Asha Rao", mobile: "9876543210", email: "asha@example.com", service: "Holiday Packages", destination: "Japan", travel_date: "", travellers: 2, message: "Cherry blossom" }),
  );
  it("uses the required header, fields and source line", () => {
    expect(msg.startsWith("NEW FLY MAVERICK WEBSITE ENQUIRY")).toBe(true);
    expect(msg).toContain("Customer Name: Asha Rao");
    expect(msg).toContain("Destination: Japan");
    expect(msg).toContain("Travel Date: Not specified");
    expect(msg).toContain("Number of Travellers: 2");
    expect(msg.endsWith("Source: Fly Maverick Website")).toBe(true);
  });
  it("opens the business number with an encoded message", () => {
    const url = whatsappUrl(msg);
    expect(url.startsWith("https://wa.me/918925898600?text=")).toBe(true);
    expect(decodeURIComponent(url.split("text=")[1]!)).toBe(msg);
  });
});

describe("customer reply number", () => {
  it("adds the 91 country code to 10-digit Indian mobiles", () => {
    expect(customerWhatsAppDigits("98765 43210")).toBe("919876543210");
    expect(customerWhatsAppDigits("+91 98765 43210")).toBe("919876543210");
    expect(customerWhatsAppDigits("09876543210")).toBe("919876543210");
  });
});
