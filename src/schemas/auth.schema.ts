import { z } from "zod";

export const registrationSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(2, "Name must be at least 50 characters")
    .regex(/^[\p{L}\s'-]+$/u, "Name must contain only letters"),
  email: z.string().email(),
  password: z.string().min(8),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
