import { date, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const referrals = pgTable("referrals", {
  id: uuid("id").primaryKey().defaultRandom(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  dateOfBirth: date("date_of_birth", { mode: "string" }).notNull(),
  phoneNumber: varchar("phone_number", { length: 16 }).notNull(),
  email: text("email"),
  referringFirm: varchar("referring_firm", { length: 255 }).notNull(),
  attorneyName: varchar("attorney_name", { length: 255 }).notNull(),
  attorneyEmail: text("attorney_email").notNull(),
  attorneyPhone: varchar("attorney_phone", { length: 16 }).notNull(),
  complaint: varchar("complaint", { length: 500 }).notNull(),
  clinicLocation: text("clinic_location", {
    enum: [
      "Anaheim",
      "Culver City",
      "Downey",
      "El Monte",
      "Long Beach",
      "Los Angeles",
    ],
  }).notNull(),
  appointmentType: text("appointment_type", {
    enum: ["In-Person", "Telemedicine"],
  }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type Referral = typeof referrals.$inferSelect;
export type NewReferral = typeof referrals.$inferInsert;
