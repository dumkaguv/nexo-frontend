import z from "zod";

export const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .regex(/[a-z]/, { message: "Password must contain a lowercase letter" })
  .regex(/[A-Z]/, { message: "Password must contain an uppercase letter" })
  .regex(/[0-9]/, { message: "Password must contain a number" })
  .regex(/[^a-zA-Z0-9]/, {
    message: "Password must contain a special character",
  });
