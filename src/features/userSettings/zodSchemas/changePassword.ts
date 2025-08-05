import z from "zod";
import { TFunction } from "i18next";
import { createPasswordSchema } from "@/zodSchemas";

export const createChangePasswordSchema = (t: TFunction) =>
  z
    .object({
      currentPassword: z.string().min(1, { error: t("validation.required") }),
      newPassword: createPasswordSchema(t),
      confirmNewPassword: z
        .string()
        .min(1, { error: t("validation.required") }),
    })
    .refine((fields) => fields.newPassword === fields.confirmNewPassword, {
      error: t("validation.password.mismatch"),
      path: ["confirmNewPassword"],
    });

export type CreateChangePasswordSchema = z.infer<
  ReturnType<typeof createChangePasswordSchema>
>;
