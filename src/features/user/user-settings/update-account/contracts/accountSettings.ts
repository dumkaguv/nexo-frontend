import z from 'zod'

import { createChangePasswordSchema } from '@/features/user/user-settings/change-password/contracts'

import { createBirthdaySchema, createPhoneSchema } from '@/shared/lib'

import type { TFunction } from 'i18next'

export const createAccountSettingsSchema = (t: TFunction) =>
  z.object({
    email: z.email({ error: t('emailInvalid') }),
    password: createChangePasswordSchema(t).optional(),
    birthDay: createBirthdaySchema(t).optional(),
    phone: createPhoneSchema(t).optional(),
    biography: z.string(),
    fullName: z.string().min(2, { error: t('minLength', { count: 2 }) }),
    username: z.string().min(2, { error: t('minLength', { count: 2 }) })
  })

export type AccountSettingsFormSchema = z.infer<
  ReturnType<typeof createAccountSettingsSchema>
>
