import { z } from "zod";


export const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    college: z.string().min(1, "Please select your college"),
    gender: z.enum(["MALE", "FEMALE", "OTHER"], {
      errorMap: () => ({ message: "Please select a gender" }),
    }),
    relationshipStatus: z.enum(
      ["SINGLE", "IN A RELATIONSHIP", "COMPLICATED"],
      { errorMap: () => ({ message: "Please select relationship status" }) }
    ),
    referCode: z.string().optional(),
    phone: z
      .string()
      .regex(/^[0-9]{10}$/, "Invalid phone number")
      .optional()
      .or(z.literal("")),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    policyAccepted: z.literal(true, {
      errorMap: () => ({ message: "You must accept the policy" }),
    }),
  })
  .refine((data:any) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
