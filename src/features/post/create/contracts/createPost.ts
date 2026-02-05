import { z } from 'zod'

import { isEmptyHTMLEditor } from '@/shared/lib'

import type { TFunction } from 'i18next'

type CreatePostSchemaOptions = {
  hasFiles?: boolean
}

export const createPostSchema = (
  t: TFunction,
  { hasFiles = false }: CreatePostSchemaOptions = {}
) =>
  z.object({
    content: z
      .string({ error: t('minLength', { count: 1 }) })
      .refine((val) => hasFiles || !isEmptyHTMLEditor(val), {
        error: t('minLength', { count: 1 })
      })
  })

export type PostSchema = z.infer<ReturnType<typeof createPostSchema>>
