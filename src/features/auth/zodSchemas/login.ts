import { z } from 'zod'

import type { TFunction } from 'i18next'

export const createLoginFormSchema = (t: TFunction) =>
  z.object({
    email: z.email({ error: t('validation.emailInvalid') }),
    password: z.string().min(1, { error: t('validation.required') })
  })

export type LoginFormSchema = z.infer<ReturnType<typeof createLoginFormSchema>>
