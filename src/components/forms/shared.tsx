import { useServerFn } from "@tanstack/react-start";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { submitEnquiry } from "@/lib/enquiries.functions";
import type { Enquiry } from "@/lib/validation";
import { cn } from "@/lib/utils";

export function Field({ id, label, error, required, children, className }: { id: string; label: string; error?: string | undefined; required?: boolean | undefined; children: ReactNode; className?: string | undefined }) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-xs font-medium tracking-wide text-foreground/85">
        {label} {required && <span className="text-gold" aria-hidden>*</span>}
      </label>
      {children}
      {error && <p id={`${id}-error`} role="alert" className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

export const numberOrUndefined = (v: unknown) => (v === "" || v === null || v === undefined ? undefined : Number(v));

export function useEnquirySubmit() {
  const fn = useServerFn(submitEnquiry);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const submit = async (data: Enquiry) => {
    setStatus("idle");
    try {
      await fn({ data });
      setStatus("success");
    } catch (e) {
      setError(e instanceof Error && e.message ? e.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  };
  return { status, error, submit, reset: () => setStatus("idle") };
}

export function SuccessPanel({ onReset }: { onReset: () => void }) {
  return (
    <div role="status" className="flex flex-col items-start gap-3 rounded-lg border border-gold/40 bg-gold-soft p-6">
      <CheckCircle2 className="h-7 w-7 text-gold" />
      <h3 className="text-xl font-bold">Thank you — your enquiry has been received.</h3>
      <p className="text-sm text-muted-foreground">
        Our team will review your requirements and get back to you with suitable options. Please note this is an enquiry, not a booking confirmation.
      </p>
      <Button variant="outline" size="sm" onClick={onReset}>Send another enquiry</Button>
    </div>
  );
}

export function SubmitRow({ submitting, label, status, error }: { submitting: boolean; label: string; status: string; error: string }) {
  return (
    <div className="flex flex-col gap-3">
      {status === "error" && (
        <p role="alert" className="flex items-center gap-2 rounded-md border border-destructive/40 p-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />{error}
        </p>
      )}
      <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto">
        {submitting ? <><Loader2 className="animate-spin" />Sending…</> : label}
      </Button>
      <p className="text-[11px] leading-relaxed text-muted-foreground">
        By submitting, you agree that Fly Maverick may use these details only to respond to your travel enquiry. See our{" "}
        <a href="/privacy" className="underline underline-offset-2 hover:text-gold">Privacy Policy</a>.
      </p>
    </div>
  );
}

/** Hidden honeypot field for bots. */
export function Honeypot({ register }: { register: (name: "website") => object }) {
  return (
    <div className="hidden" aria-hidden>
      <label>Website<input tabIndex={-1} autoComplete="off" {...register("website")} /></label>
    </div>
  );
}
