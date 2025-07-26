import z from "zod";

export const passwordSchema = z
  .string()
  .min(8, { error: "Password must be at least 8 characters long" })
  .regex(/[a-z]/, { error: "Password must contain a lowercase letter" })
  .regex(/[A-Z]/, { error: "Password must contain an uppercase letter" })
  .regex(/[0-9]/, { error: "Password must contain a number" })
  .regex(/[^a-zA-Z0-9]/, {
    error: "Password must contain a special character",
  });
