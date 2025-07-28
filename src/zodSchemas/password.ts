import { z } from "zod";
import type { TFunction } from "i18next";

export const createPasswordSchema = (t: TFunction) =>
  z
    .string()
    .min(8, { error: t("validation.min_length", { count: 8 }) })
    .regex(/[a-z]/, { error: t("validation.password_lowercase") })
    .regex(/[A-Z]/, { error: t("validation.password_uppercase") })
    .regex(/[0-9]/, { error: t("validation.password_number") })
    .regex(/[^a-zA-Z0-9]/, {
      error: t("validation.password_special"),
    });
