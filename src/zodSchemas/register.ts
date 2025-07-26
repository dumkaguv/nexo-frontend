import { z } from "zod";
import { passwordSchema } from "./password";

export const registerFormSchema = z
  .object({
    email: z.email({ message: "Invalid email" }),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((fields) => fields.password === fields.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;
