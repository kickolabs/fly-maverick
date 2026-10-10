import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { enquirySchema, type Enquiry } from "./validation";

function toRow(e: Enquiry): Database["public"]["Tables"]["enquiries"]["Insert"] {
  const common = { full_name: e.full_name, email: e.email, mobile: e.mobile };
  if (e.type === "flight") {
    const { type, full_name, email, mobile, website, notes, to, ...rest } = e;
    return { ...common, enquiry_type: "flight", service: "International Flight Booking", destination: to, message: notes || null, details: rest };
  }
  if (e.type === "business") {
    const { type, full_name, email, mobile, website, notes, company_name, destination, ...rest } = e;
    return { ...common, enquiry_type: "business", service: "Business Travel", company_name, destination, message: notes || null, details: rest };
  }
  const { type, full_name, email, mobile, website, service, destination, message, ...rest } = e;
  return { ...common, enquiry_type: type, service, destination: destination || null, message: message || null, details: rest };
}

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => enquirySchema.parse(data))
  .handler(async ({ data }) => {
    // Honeypot: silently accept bots without storing.
    if (data.website) return { ok: true as const };

    const url = process.env["SUPABASE_URL"]!;
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
    const supabase = createClient<Database>(url, key, {
      auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
      global: {
        fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });

    const { error } = await supabase.from("enquiries").insert(toRow(data));
    if (error) {
      console.error("Enquiry insert failed:", error.code, error.message);
      throw new Error("We couldn't save your enquiry right now. Please try again in a moment.");
    }
    return { ok: true as const };
  });
