import z from 'zod'

import {
  createBirthdaySchema,
  createPasswordSchema,
  createPhoneSchema
} from '@/zodSchemas'

import type { TFunction } from 'i18next'

export const createAccountSettingsSchema = (t: TFunction) =>
  z.object({
    email: z.email({ error: t('validation.email_invalid') }),
    password: createPasswordSchema(t).optional(),
    birthDay: createBirthdaySchema(t).optional(),
    phone: createPhoneSchema(t).optional(),
    bio: z.string(),
    fullName: z
      .string()
      .min(2, { error: t('validation.min_length', { count: 2 }) }),
    userName: z
      .string()
      .min(2, { error: t('validation.min_length', { count: 2 }) })
  })

export type AccountSettingsFormSchema = z.infer<
  ReturnType<typeof createAccountSettingsSchema>
>
