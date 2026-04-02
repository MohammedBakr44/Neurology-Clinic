import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from "@neurology/ui";
import { Field } from "~/components/Field";
import { RadioCard } from "~/components/RadioCard";

const clinicLocations = [
  "Anaheim",
  "Culver City",
  "Downey",
  "El Monte",
  "Long Beach",
  "Los Angeles",
];

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [complaint, setComplaint] = useState("");
  const [appointmentType, setAppointmentType] = useState<"in-person" | "telemedicine">(
    "in-person",
  );

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
            <form className="space-y-8" onSubmit={(event) => event.preventDefault()}>
              <section className="grid gap-4 md:grid-cols-2">
                <Field label="Patient first name" required>
                  <Input
                    name="patientFirstName"
                    autoComplete="given-name"
                    placeholder="Marisol"
                    required
                  />
                </Field>
                <Field label="Patient last name" required>
                  <Input
                    name="patientLastName"
                    autoComplete="family-name"
                    placeholder="Gutierrez"
                    required
                  />
                </Field>
                <Field label="Date of birth" required>
                  <Input name="dateOfBirth" type="date" required />
                </Field>
                <Field label="Phone number" required>
                  <Input
                    name="phoneNumber"
                    type="tel"
                    autoComplete="tel"
                    placeholder="(323) 555-0147"
                    required
                  />
                </Field>
                <Field label="Email address">
                  <Input
                    name="emailAddress"
                    type="email"
                    autoComplete="email"
                    placeholder="marisol.gutierrez@example.com"
                  />
                </Field>
                <Field label="Referring law firm name" required>
                  <Input name="referringLawFirm" placeholder="Hernandez & Park LLP" required />
                </Field>
                <Field label="Attorney or case manager name" required>
                  <Input name="attorneyName" placeholder="Daniel Park, Case Manager" required />
                </Field>
                <Field label="Attorney email" required>
                  <Input
                    name="attorneyEmail"
                    type="email"
                    autoComplete="email"
                    placeholder="dpark@hernandezpark.com"
                    required
                  />
                </Field>
                <Field label="Attorney phone" required>
                  <Input
                    name="attorneyPhone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="(213) 555-0182"
                    required
                  />
                </Field>
                <Field label="Preferred clinic location" required className="md:col-span-2">
                  <select
                    name="preferredClinicLocation"
                    required
                    className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm outline-none transition-colors focus:border-foreground"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select a location
                    </option>
                    {clinicLocations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </Field>
              </section>

              <section className="space-y-4">
                <Field
                  label="Primary complaint / reason for referral"
                  hint={`${complaint.length}/500 characters`}
                  required
                >
                  <textarea
                    name="primaryComplaint"
                    maxLength={500}
                    value={complaint}
                    onChange={(event) => setComplaint(event.target.value)}
                    required
                    rows={6}
                    className="min-h-[9rem] w-full rounded-md border border-border bg-background px-3 py-2 text-sm leading-6 outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
                    placeholder="Persistent lower back pain after a rear-end collision, with numbness in the left leg."
                  />
                </Field>
              </section>

              <section className="space-y-3">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Preferred appointment type</p>
                  <p className="text-xs text-muted-foreground">
                    Choose one option for the initial visit.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <RadioCard
                    label="In-Person"
                    description="Visit the clinic location you selected."
                    checked={appointmentType === "in-person"}
                    onChange={() => setAppointmentType("in-person")}
                  />
                  <RadioCard
                    label="Telemedicine"
                    description="Remote visit by video or phone."
                    checked={appointmentType === "telemedicine"}
                    onChange={() => setAppointmentType("telemedicine")}
                  />
                </div>
              </section>

              <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  Fields marked required must be completed before submission.
                </p>
                <Button type="submit">
                  Save referral
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
