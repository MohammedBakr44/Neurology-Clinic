CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS referrals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  phone_number TEXT NOT NULL,
  email TEXT,
  referring_firm TEXT NOT NULL,
  attorney_name TEXT NOT NULL,
  attorney_email TEXT NOT NULL,
  attorney_phone TEXT NOT NULL,
  complaint TEXT NOT NULL,
  clinic_location TEXT NOT NULL,
  appointment_type TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
