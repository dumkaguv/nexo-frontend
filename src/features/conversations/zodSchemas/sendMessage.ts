import { z } from 'zod'

import { emptyHtmlRegex } from '@/config'

import type { TFunction } from 'i18next'

export const createSendMessageSchema = (t: TFunction) =>
  z
    .object({
      content: z.string(),
      files: z.array(z.instanceof(File)).optional()
    })
    .refine(
      ({ content, files }) =>
        !emptyHtmlRegex.test(content) || (files?.length ?? 0) > 0,
      {
        error: t('minLength', { count: 1 }),
        path: ['content']
      }
    )

export type CreateSendMessageSchema = z.infer<
  ReturnType<typeof createSendMessageSchema>
>
