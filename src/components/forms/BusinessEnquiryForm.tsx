import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { businessSchema, type BusinessEnquiry } from "@/lib/validation";
import { Field, Honeypot, SubmitRow, SuccessPanel, numberOrUndefined, useEnquirySubmit } from "./shared";

export function BusinessEnquiryForm() {
  const { status, error, submit, reset, whatsappHref } = useEnquirySubmit();
  const { register, handleSubmit, reset: resetForm, formState: { errors, isSubmitting } } = useForm<BusinessEnquiry>({
    resolver: zodResolver(businessSchema),
    defaultValues: { type: "business", travellers: 1, notes: "" },
  });
  const aria = (n: keyof BusinessEnquiry) => ({ id: `b-${n}`, "aria-invalid": !!errors[n], "aria-describedby": errors[n] ? `b-${n}-error` : undefined });

  if (status === "success") return <SuccessPanel whatsappHref={whatsappHref} onReset={() => { resetForm(); reset(); }} />;

  return (
    <form onSubmit={handleSubmit(submit)} noValidate className="flex flex-col gap-5">
      <Honeypot register={register as never} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="b-company_name" label="Company Name" required error={errors.company_name?.message}>
          <input className="field-input" autoComplete="organization" {...aria("company_name")} {...register("company_name")} />
        </Field>
        <Field id="b-full_name" label="Contact Person" required error={errors.full_name?.message}>
          <input className="field-input" autoComplete="name" {...aria("full_name")} {...register("full_name")} />
        </Field>
        <Field id="b-email" label="Business Email" required error={errors.email?.message}>
          <input type="email" className="field-input" autoComplete="email" {...aria("email")} {...register("email")} />
        </Field>
        <Field id="b-mobile" label="Mobile Number" required error={errors.mobile?.message}>
          <input type="tel" className="field-input" placeholder="+91 98765 43210" {...aria("mobile")} {...register("mobile")} />
        </Field>
        <Field id="b-from" label="Departure City" required error={errors.from?.message}>
          <input className="field-input" {...aria("from")} {...register("from")} />
        </Field>
        <Field id="b-destination" label="Destination" required error={errors.destination?.message}>
          <input className="field-input" {...aria("destination")} {...register("destination")} />
        </Field>
        <Field id="b-travel_dates" label="Travel Dates" required error={errors.travel_dates?.message}>
          <input className="field-input" placeholder="e.g. 12–16 March" {...aria("travel_dates")} {...register("travel_dates")} />
        </Field>
        <Field id="b-travellers" label="Number of Travellers" required error={errors.travellers?.message}>
          <input type="number" min={1} max={50} className="field-input" {...aria("travellers")} {...register("travellers", { setValueAs: numberOrUndefined })} />
        </Field>
        <Field id="b-notes" label="Additional Requirements" error={errors.notes?.message} className="sm:col-span-2">
          <textarea rows={4} className="field-input h-auto py-3" placeholder="Hotel preferences, meeting locations, cabin class…" {...aria("notes")} {...register("notes")} />
        </Field>
      </div>
      <SubmitRow submitting={isSubmitting} label="Request Corporate Quote" status={status} error={error} />
    </form>
  );
}
