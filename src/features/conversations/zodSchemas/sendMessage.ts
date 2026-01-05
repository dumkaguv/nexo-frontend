import { z } from 'zod'

import { emptyHtmlRegex } from '@/config'

import type { TFunction } from 'i18next'

export const createSendMessageSchema = (t: TFunction) =>
  z.object({
    content: z.string().refine((val) => !emptyHtmlRegex.test(val), {
      error: t('validation.minLength', { count: 1 })
    })
  })

export type CreateSendMessageSchema = z.infer<
  ReturnType<typeof createSendMessageSchema>
>
