import { z } from "zod";
import type { TFunction } from "i18next";

export const createBirthdaySchema = (t: TFunction) =>
  z
    .union([z.date(), z.null()])
    .refine(
      (date) =>
        date === null || (date instanceof Date && !isNaN(date.getTime())),
      {
        message: t("validation.birthDay.invalid"),
      }
    )
    .refine(
      (date) => date === null || (date instanceof Date && date <= new Date()),
      {
        message: t("validation.birthDay.futureDate"),
      }
    );
