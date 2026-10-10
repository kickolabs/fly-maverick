import { describe, expect, it } from "vitest";
import { flightSchema, generalSchema, isValidIndianMobile } from "./validation";
import { faqs } from "@/data/content";

describe("Indian mobile validation", () => {
  it("accepts 10-digit numbers starting with 6–9, with or without +91", () => {
    expect(isValidIndianMobile("9876543210")).toBe(true);
    expect(isValidIndianMobile("+91 98765 43210")).toBe(true);
    expect(isValidIndianMobile("09876543210")).toBe(true);
  });
  it("rejects numbers starting with 0–5 or with wrong length", () => {
    expect(isValidIndianMobile("5876543210")).toBe(false);
    expect(isValidIndianMobile("987654321")).toBe(false);
    expect(isValidIndianMobile("+1 9876543210")).toBe(false);
  });
});

const baseGeneral = { type: "contact", full_name: "Asha Rao", mobile: "9876543210", service: "Holiday Packages" } as const;

describe("email validation", () => {
  it("rejects an invalid email", () => {
    expect(generalSchema.safeParse({ ...baseGeneral, email: "asha@" }).success).toBe(false);
  });
  it("accepts a valid email", () => {
    expect(generalSchema.safeParse({ ...baseGeneral, email: "asha@example.com" }).success).toBe(true);
  });
});

describe("flight enquiry", () => {
  const flight = {
    type: "flight", full_name: "Asha Rao", email: "asha@example.com", mobile: "9876543210",
    from: "Mumbai", to: "Dubai", depart_date: "2026-12-01", adults: 2, children: 0, cabin: "economy",
  } as const;
  it("requires a return date for round trips", () => {
    expect(flightSchema.safeParse({ ...flight, trip_type: "round_trip" }).success).toBe(false);
  });
  it("rejects a return date before departure", () => {
    expect(flightSchema.safeParse({ ...flight, trip_type: "round_trip", return_date: "2026-11-20" }).success).toBe(false);
  });
  it("allows one-way without a return date", () => {
    expect(flightSchema.safeParse({ ...flight, trip_type: "one_way" }).success).toBe(true);
  });
});

describe("FAQ positioning", () => {
  it("states that work visa and recruitment services are not offered", () => {
    const item = faqs.find((f) => f.q.includes("work visa"));
    expect(item?.a.startsWith("No.")).toBe(true);
  });
});
