import { z } from 'zod'

import type { TFunction } from 'i18next'

export const createPasswordSchema = (t: TFunction) =>
  z
    .string()
    .min(8, { error: t('minLength', { count: 8 }) })
    .regex(/[a-z]/, { error: t('passwordLowercase') })
    .regex(/[A-Z]/, { error: t('passwordUppercase') })
    .regex(/[0-9]/, { error: t('passwordNumber') })
    .regex(/[^a-zA-Z0-9]/, {
      error: t('passwordSpecial')
    })

export type PasswordSchema = z.infer<ReturnType<typeof createPasswordSchema>>
