import { z } from "zod";
import { passwordSchema } from "./password";

export const registerFormSchema = z
  .object({
    email: z.email({ error: "Invalid email" }),
    userName: z.string().min(2, { error: "At least 2 symbols" }),
    fullName: z.string().min(2, { error: "At least 2 symbols" }),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((fields) => fields.password === fields.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;
