import { z } from 'zod'

import type { TFunction } from 'i18next'

export const createCommentSchema = (t: TFunction) =>
  z.object({
    content: z
      .string()
      .min(1, { error: t('validation.min_length', { count: 1 }) })
  })

export type CreateCommentSchema = z.infer<
  ReturnType<typeof createCommentSchema>
>
