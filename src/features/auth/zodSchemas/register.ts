import { z } from 'zod'

import { createPasswordSchema } from '@/zodSchemas'

import type { TFunction } from 'i18next'

export const createRegisterFormSchema = (t: TFunction) =>
  z
    .object({
      email: z.email({ error: t('validation.email_invalid') }),
      username: z
        .string()
        .min(2, { error: t('validation.min_length', { count: 2 }) }),
      fullName: z
        .string()
        .min(2, { error: t('validation.min_length', { count: 2 }) }),
      password: createPasswordSchema(t),
      confirmPassword: z.string().min(1, { error: t('validation.required') })
    })
    .refine((fields) => fields.password === fields.confirmPassword, {
      error: t('validation.password.mismatch'),
      path: ['confirmPassword']
    })

export type RegisterFormSchema = z.infer<
  ReturnType<typeof createRegisterFormSchema>
>
