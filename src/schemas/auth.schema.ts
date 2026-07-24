import { z } from "zod";

export const registrationSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters")
    .regex(/^[\p{L}\s'-]+$/u, "Name must contain only letters"),
  email: z.string().email(),
  password: z.string().min(8),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const forgotPasswordSchema = loginSchema.pick({
  email: true,
});

export const resetPasswordSchema = z.object({
  password: z.string().min(8),
  newPassword: z.string().min(8),
});

export const emailVerificationSchema = z.object({
  email: z.string().email(),
  verificationNumber: z
    .string()
    .regex(/^\d{6}$/, "Verification code must be 6 digits"),
});

export const resendCodeSchema = z.object({
  email: z.string().email(),
});
