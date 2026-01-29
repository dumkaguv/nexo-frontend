import { z } from 'zod'

import { isEmptyHTMLEditor } from '@/shared/lib'

import type { TFunction } from 'i18next'

export const createPostSchema = (t: TFunction) =>
  z.object({
    content: z
      .string({ error: t('minLength', { count: 1 }) })
      .refine((val) => !isEmptyHTMLEditor(val), {
        error: t('minLength', { count: 1 })
      })
  })

export type PostSchema = z.infer<ReturnType<typeof createPostSchema>>
