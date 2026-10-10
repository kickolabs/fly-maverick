import { z } from "zod";

/** Indian mobile: optional +91 / 91 / 0 prefix, then 10 digits starting 6–9. Spaces and dashes allowed. */
export const INDIAN_MOBILE_RE = /^(?:\+91|91|0)?[6-9]\d{9}$/;
export const isValidIndianMobile = (value: string) => INDIAN_MOBILE_RE.test(value.replace(/[\s-]/g, ""));

const mobile = z
  .string()
  .trim()
  .min(1, "Enter your mobile number")
  .max(20, "Enter a valid Indian mobile number")
  .refine(isValidIndianMobile, "Enter a valid Indian mobile number (10 digits starting with 6–9)");

const base = {
  full_name: z.string().trim().min(2, "Enter your full name").max(120, "Name is too long"),
  email: z.string().trim().min(1, "Enter your email address").email("Enter a valid email address").max(255),
  mobile,
  website: z.string().max(0).optional(), // honeypot
};

const place = (label: string) => z.string().trim().min(2, `Enter ${label}`).max(120);
const optionalText = (max: number) => z.string().trim().max(max).optional().or(z.literal(""));
const count = (min: number, label: string) =>
  z.number({ invalid_type_error: `Enter ${label}` }).int().min(min, `Minimum ${min}`).max(50, "Maximum 50");

export const flightSchema = z
  .object({
    type: z.literal("flight"),
    ...base,
    trip_type: z.enum(["one_way", "round_trip", "multi_city"]),
    from: place("a departure city or airport"),
    to: place("a destination city or airport"),
    depart_date: z.string().min(1, "Choose a departure date"),
    return_date: optionalText(20),
    adults: count(1, "number of adults"),
    children: count(0, "number of children"),
    cabin: z.enum(["economy", "premium_economy", "business", "first"]),
    notes: optionalText(1000),
  })
  .superRefine((v, ctx) => {
    if (v.trip_type === "round_trip") {
      if (!v.return_date) ctx.addIssue({ code: "custom", path: ["return_date"], message: "Choose a return date" });
      else if (v.return_date < v.depart_date)
        ctx.addIssue({ code: "custom", path: ["return_date"], message: "Return date must be after departure" });
    }
  });

export const generalSchema = z.object({
  type: z.enum(["contact", "package", "destination"]),
  ...base,
  service: z.string().trim().min(1, "Choose a service").max(120),
  destination: optionalText(160),
  travel_date: optionalText(20),
  travellers: z.number().int().min(1, "Minimum 1").max(50, "Maximum 50").optional(),
  message: optionalText(2000),
});

export const businessSchema = z.object({
  type: z.literal("business"),
  ...base,
  company_name: z.string().trim().min(2, "Enter your company name").max(160),
  from: place("a departure city"),
  destination: place("a destination"),
  travel_dates: z.string().trim().min(1, "Enter your travel dates").max(100),
  travellers: count(1, "number of travellers"),
  notes: optionalText(2000),
});

export const enquirySchema = z.union([flightSchema, generalSchema, businessSchema]);

export type FlightEnquiry = z.infer<typeof flightSchema>;
export type GeneralEnquiry = z.infer<typeof generalSchema>;
export type BusinessEnquiry = z.infer<typeof businessSchema>;
export type Enquiry = z.infer<typeof enquirySchema>;
