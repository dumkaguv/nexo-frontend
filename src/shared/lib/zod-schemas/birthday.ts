import { z } from 'zod'

import type { TFunction } from 'i18next'

export const createBirthdaySchema = (t: TFunction) =>
  z
    .union([z.date(), z.null()])
    .refine(
      (date) =>
        date === null || (date instanceof Date && !isNaN(date.getTime())),
      {
        error: t('birthDayInvalid')
      }
    )
    .refine(
      (date) => date === null || (date instanceof Date && date <= new Date()),
      {
        error: t('birthDayFutureDate')
      }
    )

export type BirthdaySchema = z.infer<ReturnType<typeof createBirthdaySchema>>
