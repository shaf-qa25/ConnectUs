import { z } from "zod";

export const studentProfileSchema=z.object({
    studentId:z
    .string()
    .min(1,"Student ID is required")
    .regex(/^\d+$/, "Student ID must contain only numbers"),

    course:z
    .string()
    .min(2,"Course is require "),

    branch:z
    .string()
    .min(2,"Branch is require "),

    graduationYear:z
    .number()
    .min(2020, "Invalid graduation year")
    .max(2040, "Invalid graduation year"),

      bio: z
    .string()
    .max(500, "Bio cannot exceed 500 characters")
    .optional(),

    linkdinUrl:z
    .string()
    .url("Invalid url ")
    .optional()
    .or(z.literal("")),
    
    githubUrl:z
    .string()
    .url("Invalid url ")
    .optional()
    .or(z.literal("")),

})