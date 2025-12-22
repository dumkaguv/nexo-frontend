import { z } from 'zod'

import { emptyHtmlRegex } from '@/config'

import type { TFunction } from 'i18next'

export const createPostSchema = (t: TFunction) =>
  z.object({
    content: z.string().refine((val) => !emptyHtmlRegex.test(val), {
      error: t('validation.min_length', { count: 1 })
    })
  })

export type CreatePostSchema = z.infer<ReturnType<typeof createPostSchema>>
