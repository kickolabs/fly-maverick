import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { serviceOptions } from "@/config/site";
import { generalSchema, type GeneralEnquiry } from "@/lib/validation";
import { Field, Honeypot, SubmitRow, SuccessPanel, numberOrUndefined, useEnquirySubmit } from "./shared";

export function GeneralEnquiryForm({
  type = "contact",
  defaultService = "",
  defaultDestination = "",
  submitLabel = "Send Enquiry",
}: {
  type?: GeneralEnquiry["type"];
  defaultService?: string;
  defaultDestination?: string;
  submitLabel?: string;
}) {
  const { status, error, submit, reset, whatsappHref } = useEnquirySubmit();
  const { register, handleSubmit, reset: resetForm, formState: { errors, isSubmitting } } = useForm<GeneralEnquiry>({
    resolver: zodResolver(generalSchema),
    defaultValues: { type, service: defaultService, destination: defaultDestination, message: "", travel_date: "" },
  });
  const aria = (n: keyof GeneralEnquiry) => ({ id: `g-${n}`, "aria-invalid": !!errors[n], "aria-describedby": errors[n] ? `g-${n}-error` : undefined });

  if (status === "success") return <SuccessPanel whatsappHref={whatsappHref} onReset={() => { resetForm(); reset(); }} />;

  return (
    <form onSubmit={handleSubmit(submit)} noValidate className="flex flex-col gap-5">
      <Honeypot register={register as never} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="g-full_name" label="Full Name" required error={errors.full_name?.message}>
          <input className="field-input" autoComplete="name" {...aria("full_name")} {...register("full_name")} />
        </Field>
        <Field id="g-mobile" label="Mobile Number" required error={errors.mobile?.message}>
          <input type="tel" className="field-input" placeholder="+91 98765 43210" autoComplete="tel" {...aria("mobile")} {...register("mobile")} />
        </Field>
        <Field id="g-email" label="Email Address" required error={errors.email?.message}>
          <input type="email" className="field-input" autoComplete="email" {...aria("email")} {...register("email")} />
        </Field>
        <Field id="g-service" label="Service Required" required error={errors.service?.message}>
          <select className="field-input bg-transparent [&>option]:bg-card" {...aria("service")} {...register("service")}>
            <option value="">Select a service</option>
            {serviceOptions.map((s) => <option key={s}>{s}</option>)}
          </select>
        </Field>
        <Field id="g-destination" label="Destination" error={errors.destination?.message}>
          <input className="field-input" placeholder="Where would you like to go?" {...aria("destination")} {...register("destination")} />
        </Field>
        <Field id="g-travel_date" label="Preferred Travel Date" error={errors.travel_date?.message}>
          <input type="date" className="field-input" {...aria("travel_date")} {...register("travel_date")} />
        </Field>
        <Field id="g-travellers" label="Number of Travellers" error={errors.travellers?.message}>
          <input type="number" min={1} max={50} className="field-input" {...aria("travellers")} {...register("travellers", { setValueAs: numberOrUndefined })} />
        </Field>
        <Field id="g-message" label="Message" error={errors.message?.message} className="sm:col-span-2">
          <textarea rows={4} className="field-input h-auto py-3" placeholder="Tell us about your plans, interests and budget…" {...aria("message")} {...register("message")} />
        </Field>
      </div>
      <SubmitRow submitting={isSubmitting} label={submitLabel} status={status} error={error} />
    </form>
  );
}
