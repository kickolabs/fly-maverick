import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { flightSchema, type FlightEnquiry } from "@/lib/validation";
import { cn } from "@/lib/utils";
import { Field, Honeypot, SubmitRow, SuccessPanel, numberOrUndefined, useEnquirySubmit } from "./shared";

const tripTypes = [
  { v: "one_way", l: "One Way" },
  { v: "round_trip", l: "Round Trip" },
  { v: "multi_city", l: "Multi-City" },
] as const;

export function FlightEnquiryForm({ compact = false, defaultTo = "" }: { compact?: boolean; defaultTo?: string }) {
  const { status, error, submit, reset, whatsappHref } = useEnquirySubmit();
  const {
    register, handleSubmit, watch, setValue, reset: resetForm,
    formState: { errors, isSubmitting },
  } = useForm<FlightEnquiry>({
    resolver: zodResolver(flightSchema),
    defaultValues: { type: "flight", trip_type: "round_trip", adults: 1, children: 0, cabin: "economy", to: defaultTo, from: "", return_date: "", notes: "" },
  });
  const trip = watch("trip_type");
  const id = (n: string) => `${compact ? "q" : "f"}-${n}`;
  const aria = (n: keyof FlightEnquiry) => ({ id: id(n), "aria-invalid": !!errors[n], "aria-describedby": errors[n] ? `${id(n)}-error` : undefined });

  if (status === "success") return <SuccessPanel whatsappHref={whatsappHref} onReset={() => { resetForm(); reset(); }} />;

  return (
    <form onSubmit={handleSubmit(submit)} noValidate className="flex flex-col gap-5">
      <Honeypot register={register as never} />
      <div role="radiogroup" aria-label="Trip type" className="flex flex-wrap gap-2">
        {tripTypes.filter((t) => !compact || t.v !== "multi_city").map((t) => (
          <button
            key={t.v}
            type="button"
            role="radio"
            aria-checked={trip === t.v}
            onClick={() => setValue("trip_type", t.v)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-xs font-medium transition-colors",
              trip === t.v ? "border-gold bg-gold text-primary-foreground" : "border-input text-foreground/80 hover:border-gold",
            )}
          >
            {t.l}
          </button>
        ))}
      </div>

      <div className={cn("grid gap-4", compact ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2")}>
        <Field id={id("from")} label={compact ? "From" : "Departure City or Airport"} required error={errors.from?.message}>
          <input className="field-input" placeholder="e.g. Mumbai (BOM)" {...aria("from")} {...register("from")} />
        </Field>
        <Field id={id("to")} label={compact ? "To" : "Destination City or Airport"} required error={errors.to?.message}>
          <input className="field-input" placeholder="e.g. Dubai (DXB)" {...aria("to")} {...register("to")} />
        </Field>
        <Field id={id("depart_date")} label="Departure Date" required error={errors.depart_date?.message}>
          <input type="date" className="field-input" {...aria("depart_date")} {...register("depart_date")} />
        </Field>
        <Field id={id("return_date")} label="Return Date" required={trip === "round_trip"} error={errors.return_date?.message}>
          <input type="date" className="field-input disabled:opacity-40" disabled={trip !== "round_trip"} {...aria("return_date")} {...register("return_date")} />
        </Field>
        <Field id={id("adults")} label={compact ? "Travellers" : "Adults"} required error={errors.adults?.message}>
          <input type="number" min={1} max={50} className="field-input" {...aria("adults")} {...register("adults", { setValueAs: numberOrUndefined })} />
        </Field>
        {!compact && (
          <Field id={id("children")} label="Children" error={errors.children?.message}>
            <input type="number" min={0} max={50} className="field-input" {...aria("children")} {...register("children", { setValueAs: numberOrUndefined })} />
          </Field>
        )}
        <Field id={id("cabin")} label={compact ? "Travel Class" : "Cabin Class"} required error={errors.cabin?.message}>
          <select className="field-input bg-transparent [&>option]:bg-card" {...aria("cabin")} {...register("cabin")}>
            <option value="economy">Economy</option>
            <option value="premium_economy">Premium Economy</option>
            <option value="business">Business</option>
            <option value="first">First</option>
          </select>
        </Field>
        <Field id={id("full_name")} label={compact ? "Full Name" : "Passenger Name"} required error={errors.full_name?.message}>
          <input className="field-input" autoComplete="name" {...aria("full_name")} {...register("full_name")} />
        </Field>
        <Field id={id("mobile")} label="Mobile Number" required error={errors.mobile?.message}>
          <input type="tel" className="field-input" placeholder="+91 98765 43210" autoComplete="tel" {...aria("mobile")} {...register("mobile")} />
        </Field>
        <Field id={id("email")} label="Email Address" required error={errors.email?.message} className={compact ? "lg:col-span-1" : ""}>
          <input type="email" className="field-input" autoComplete="email" {...aria("email")} {...register("email")} />
        </Field>
        {!compact && (
          <Field id={id("notes")} label="Additional Requirements" error={errors.notes?.message} className="sm:col-span-2">
            <textarea rows={4} className="field-input h-auto py-3" placeholder={trip === "multi_city" ? "List your stops and dates, e.g. Delhi → Paris (12 May), Paris → Rome (18 May)…" : "Preferred airlines, flexible dates, meal or seat preferences…"} {...aria("notes")} {...register("notes")} />
          </Field>
        )}
      </div>
      <SubmitRow submitting={isSubmitting} label="Request Flight Options" status={status} error={error} />
    </form>
  );
}
