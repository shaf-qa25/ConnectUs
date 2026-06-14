import { z } from "zod";

export const teacherProfileSchema = z.object({
  department: z
    .string()
    .min(2, "Department is required"),

  designation: z
    .string()
    .min(2, "Designation is required"),
});