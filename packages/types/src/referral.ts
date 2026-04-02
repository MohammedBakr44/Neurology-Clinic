import { z } from "zod";

export const clinicLocations = [
  "Anaheim",
  "Culver City",
  "Downey",
  "El Monte",
  "Long Beach",
  "Los Angeles",
] as const;

export const appointmentTypes = ["In-Person", "Telemedicine"] as const;

export const phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
export const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

export const referralSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.string().regex(dateRegex, "Use YYYY-MM-DD"),
  phoneNumber: z.string().regex(phoneRegex, "Use a valid phone number"),
  email: z.string().email("Use a valid email").optional().or(z.literal("")),
  referringFirm: z.string().min(1, "Law firm is required"),
  attorneyName: z.string().min(1, "Attorney or case manager name is required"),
  attorneyEmail: z.string().email("Use a valid email"),
  attorneyPhone: z.string().regex(phoneRegex, "Use a valid phone number"),
  complaint: z.string().max(500, "Keep the complaint under 500 characters"),
  clinicLocation: z.enum(clinicLocations),
  appointmentType: z.enum(appointmentTypes),
});

export type ReferralValues = z.infer<typeof referralSchema>;

export const defaultReferralValues: ReferralValues = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  phoneNumber: "",
  email: "",
  referringFirm: "",
  attorneyName: "",
  attorneyEmail: "",
  attorneyPhone: "",
  complaint: "",
  clinicLocation: clinicLocations[0],
  appointmentType: appointmentTypes[0],
};
