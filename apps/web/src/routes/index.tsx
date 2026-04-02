import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm, formOptions } from "@tanstack/react-form";
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from "@neurology/ui";
import { toast } from "sonner";
import {
  appointmentTypes,
  clinicLocations,
  defaultReferralValues,
  referralSchema,
} from "@neurology/types";
import { Field } from "~/components/Field";
import { RadioCard } from "~/components/RadioCard";
import { trpc } from "~/utils/trpc";

function getErrorMessage(error: unknown) {
  if (typeof error === "string") return error;
  if (error && typeof error === "object" && "message" in error) {
    const { message } = error as { message?: unknown };
    if (typeof message === "string") return message;
  }

  return null;
}

export const Route = createFileRoute("/")({
  component: Home,
});

const formOpts = formOptions({
  defaultValues: defaultReferralValues,
  validators: {
    onSubmit: referralSchema,
  }
});

function Home() {
  const referrals = useQuery(trpc.referrals.list.queryOptions());
  console.log(referrals.data);
  const referralMutation = useMutation({
    ...trpc.referrals.create.mutationOptions(),
    onSuccess: () => {
      toast.success("Referral saved");
    },
    onError: () => {
      toast.error("Referral save failed");
    },
  });
  const form = useForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      referralMutation.mutate(value);
    },
  });

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="max-w-2xl space-y-3">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Referral intake
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Patient referral form
          </h1>
          <p className="text-sm leading-6 text-muted-foreground sm:text-base">
            Collect the basic intake details needed before scheduling.
          </p>
        </div>

        <Card className="mt-8 border border-border shadow-none">
          <CardHeader className="border-b border-border px-6 py-5">
            <CardTitle className="text-lg">Patient and attorney details</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form
              className="space-y-8"
              onSubmit={(event) => {
                event.preventDefault();
                event.stopPropagation();
                void form.handleSubmit();
              }}
            >
              <section className="grid gap-4 md:grid-cols-2">
                <form.Field
                  name="firstName"
                  children={(field) => (
                    <Field label="Patient first name" required>
                      <Input
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) => field.handleChange(event.target.value)}
                        autoComplete="given-name"
                        placeholder="Taki"
                      />
                      {getErrorMessage(field.state.meta.errors[0]) ? (
                        <p className="text-xs text-red-600">
                          {getErrorMessage(field.state.meta.errors[0])}
                        </p>
                      ) : null}
                    </Field>
                  )}
                />

                <form.Field
                  name="lastName"
                  children={(field) => (
                    <Field label="Patient last name" required>
                      <Input
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) => field.handleChange(event.target.value)}
                        autoComplete="family-name"
                        placeholder="Tachibana"
                      />
                      {getErrorMessage(field.state.meta.errors[0]) ? (
                        <p className="text-xs text-red-600">
                          {getErrorMessage(field.state.meta.errors[0])}
                        </p>
                      ) : null}
                    </Field>
                  )}
                />

                <form.Field
                  name="dateOfBirth"
                  children={(field) => (
                    <Field label="Date of birth" required>
                      <Input
                        name={field.name}
                        type="date"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) => field.handleChange(event.target.value)}
                      />
                      {getErrorMessage(field.state.meta.errors[0]) ? (
                        <p className="text-xs text-red-600">
                          {getErrorMessage(field.state.meta.errors[0])}
                        </p>
                      ) : null}
                    </Field>
                  )}
                />

                <form.Field
                  name="phoneNumber"
                  children={(field) => (
                    <Field label="Phone number" required>
                      <Input
                        name={field.name}
                        type="tel"
                        autoComplete="tel"
                        placeholder="(323) 555-0147"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) => field.handleChange(event.target.value)}
                      />
                      {getErrorMessage(field.state.meta.errors[0]) ? (
                        <p className="text-xs text-red-600">
                          {getErrorMessage(field.state.meta.errors[0])}
                        </p>
                      ) : null}
                    </Field>
                  )}
                />

                <form.Field
                  name="email"
                  children={(field) => (
                    <Field label="Email address">
                      <Input
                        name={field.name}
                        type="email"
                        autoComplete="email"
                        placeholder="bantaki@itomori.com"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) => field.handleChange(event.target.value)}
                      />
                      {getErrorMessage(field.state.meta.errors[0]) ? (
                        <p className="text-xs text-red-600">
                          {getErrorMessage(field.state.meta.errors[0])}
                        </p>
                      ) : null}
                    </Field>
                  )}
                />

                <form.Field
                  name="referringFirm"
                  children={(field) => (
                    <Field label="Referring law firm name" required>
                      <Input
                        name={field.name}
                        placeholder="Saul Goodman & Associates"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) => field.handleChange(event.target.value)}
                      />
                      {getErrorMessage(field.state.meta.errors[0]) ? (
                        <p className="text-xs text-red-600">
                          {getErrorMessage(field.state.meta.errors[0])}
                        </p>
                      ) : null}
                    </Field>
                  )}
                />

                <form.Field
                  name="attorneyName"
                  children={(field) => (
                    <Field label="Attorney Name" required>
                      <Input
                        name={field.name}
                        placeholder="Saul Goodman"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) => field.handleChange(event.target.value)}
                      />
                      {getErrorMessage(field.state.meta.errors[0]) ? (
                        <p className="text-xs text-red-600">
                          {getErrorMessage(field.state.meta.errors[0])}
                        </p>
                      ) : null}
                    </Field>
                  )}
                />

                <form.Field
                  name="attorneyEmail"
                  children={(field) => (
                    <Field label="Attorney email" required>
                      <Input
                        name={field.name}
                        type="email"
                        autoComplete="email"
                        placeholder="ceo@saulandassociates.com"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) => field.handleChange(event.target.value)}
                      />
                      {getErrorMessage(field.state.meta.errors[0]) ? (
                        <p className="text-xs text-red-600">
                          {getErrorMessage(field.state.meta.errors[0])}
                        </p>
                      ) : null}
                    </Field>
                  )}
                />

                <form.Field
                  name="attorneyPhone"
                  children={(field) => (
                    <Field label="Attorney phone" required>
                      <Input
                        name={field.name}
                        type="tel"
                        autoComplete="tel"
                        placeholder="(213) 555-0182"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) => field.handleChange(event.target.value)}
                      />
                      {getErrorMessage(field.state.meta.errors[0]) ? (
                        <p className="text-xs text-red-600">
                          {getErrorMessage(field.state.meta.errors[0])}
                        </p>
                      ) : null}
                    </Field>
                  )}
                />

                <form.Field
                  name="clinicLocation"
                  children={(field) => (
                    <Field label="Preferred clinic location" required className="md:col-span-2">
                      <select
                        name={field.name}
                        required
                        className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm outline-none transition-colors focus:border-foreground"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) => field.handleChange(event.target.value)}
                      >
                        {clinicLocations.map((location) => (
                          <option key={location} value={location}>
                            {location}
                          </option>
                        ))}
                      </select>
                      {getErrorMessage(field.state.meta.errors[0]) ? (
                        <p className="text-xs text-red-600">
                          {getErrorMessage(field.state.meta.errors[0])}
                        </p>
                      ) : null}
                    </Field>
                  )}
                />
              </section>

              <section className="space-y-4">
                <form.Field
                  name="complaint"
                  children={(field) => (
                    <Field
                      label="Primary complaint / reason for referral"
                      hint={`${field.state.value.length}/500 characters`}
                      required
                    >
                      <textarea
                        name={field.name}
                        maxLength={500}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) => field.handleChange(event.target.value)}
                        required
                        rows={6}
                        className="min-h-[9rem] w-full rounded-md border border-border bg-background px-3 py-2 text-sm leading-6 outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
                        placeholder="Persistent lower back pain after a rear-end collision, with numbness in the left leg."
                      />
                      {field.state.meta.errors[0] ? (
                        <p className="text-xs text-red-600">{field.state.meta.errors[0]}</p>
                      ) : null}
                    </Field>
                  )}
                />
              </section>

              <section className="space-y-3">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Preferred appointment type</p>
                  <p className="text-xs text-muted-foreground">
                    Choose one option for the initial visit.
                  </p>
                </div>
                <form.Field
                  name="appointmentType"
                  children={(field) => (
                    <div className="grid gap-3 sm:grid-cols-2">
                      <RadioCard
                        label="In-Person"
                        description="Visit the clinic location you selected."
                        checked={field.state.value === "In-Person"}
                        onChange={() => field.handleChange("In-Person")}
                      />
                      <RadioCard
                        label="Telemedicine"
                        description="Remote visit by video or phone."
                        checked={field.state.value === "Telemedicine"}
                        onChange={() => field.handleChange("Telemedicine")}
                      />
                    </div>
                  )}
                />
              </section>

              <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  Fields marked required must be completed before submission.
                </p>
                <Button type="submit">Save referral</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
