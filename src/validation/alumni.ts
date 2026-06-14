import { z } from "zod";

export const alumniProfileSchema = z.object({
  company: z
    .string()
    .min(2, "Company is required"),

  designation: z
    .string()
    .min(2, "Designation is required"),

  experienceYears: z
    .number()
    .min(0, "Invalid experience")
    .max(50, "Invalid experience"),

    linkedinUrl: z
    .string()
    .url("Invalid LinkedIn URL")
    .optional()
    .or(z.literal("")),
});