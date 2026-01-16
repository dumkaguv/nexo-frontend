import z from 'zod'

import { createPasswordSchema } from '@/zodSchemas'

import type { TFunction } from 'i18next'

export const createChangePasswordSchema = (t: TFunction) =>
  z
    .object({
      oldPassword: z.string().min(1, { error: t('required') }),
      newPassword: createPasswordSchema(t),
      confirmNewPassword: z.string().min(1, { error: t('required') })
    })
    .refine((fields) => fields.newPassword === fields.confirmNewPassword, {
      error: t('passwordMismatch'),
      path: ['confirmNewPassword']
    })

export type CreateChangePasswordSchema = z.infer<
  ReturnType<typeof createChangePasswordSchema>
>
