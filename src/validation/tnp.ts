import { z } from "zod";

export const tnpProfileSchema = z.object({
  officeRole: z
    .string()
    .min(2, "Office role is required"),

  contactNumber: z
    .string()
    .regex(
      /^[0-9]{10}$/,
      "Contact number must be 10 digits"
    ),
});