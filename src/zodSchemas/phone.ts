import { z } from 'zod'

import type { TFunction } from 'i18next'

export const createPhoneSchema = (t: TFunction) =>
  z
    .string()
    .optional()
    .refine(
      (val) => {
        if (val === undefined || val === '' || val === null) return true
        return /^\+?\d+$/.test(val)
      },
      {
        message: t('validation.phone')
      }
    )
