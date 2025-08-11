
import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  college: z.string().trim().min(1, "College is required"),
  gender: z.enum(["MALE", "FEMALE", "OTHER"], {
    errorMap: () => ({ message: "Gender is required" }),
  }),
  relationshipStatus: z.enum(["SINGLE", "IN A RELATIONSHIP", "COMPLICATED"], {
    errorMap: () => ({ message: "Relationship status is required" }),
  }),
  phone: z.string().trim().optional(),
  referCode: z.string().trim().optional(),
  email: z.string().trim().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm your password"),
  policyAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the policy",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});
