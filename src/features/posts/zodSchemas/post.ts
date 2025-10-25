import { z } from 'zod'

import type { TFunction } from 'i18next'

export const createPostSchema = (t: TFunction) =>
  z.object({
    content: z
      .string()
      .min(1, { error: t('validation.min_length', { count: 1 }) })
  })

export type CreatePostSchema = z.infer<ReturnType<typeof createPostSchema>>
