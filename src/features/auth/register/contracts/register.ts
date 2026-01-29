import { z } from 'zod'

import { createPasswordSchema } from '@/shared/lib'

import type { TFunction } from 'i18next'

export const createRegisterFormSchema = (t: TFunction) =>
  z
    .object({
      email: z.email({ error: t('emailInvalid') }),
      username: z.string().min(2, { error: t('minLength', { count: 2 }) }),
      fullName: z.string().min(2, { error: t('minLength', { count: 2 }) }),
      password: createPasswordSchema(t),
      confirmPassword: z.string().min(1, { error: t('required') })
    })
    .refine((fields) => fields.password === fields.confirmPassword, {
      error: t('passwordMismatch'),
      path: ['confirmPassword']
    })

export type RegisterFormSchema = z.infer<
  ReturnType<typeof createRegisterFormSchema>
>
