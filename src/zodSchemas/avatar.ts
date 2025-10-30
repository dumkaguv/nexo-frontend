import { z } from 'zod'

import type { TFunction } from 'i18next'

const MAX_MB_SIZE = 4
const MAX_MB_SIZE_FILE = MAX_MB_SIZE * 1024 * 1024

export const createAvatarSchema = (t: TFunction) =>
  z.object({
    avatar: z
      .custom<FileList>(
        (files) => files instanceof FileList && files.length > 0,
        {
          message: t('validation.required')
        }
      )
      .refine((files) => files?.[0]?.size <= MAX_MB_SIZE_FILE, {
        message: t('validation.fileTooLarge', { max: MAX_MB_SIZE })
      })
  })

export type CreateAvatarSchema = z.infer<ReturnType<typeof createAvatarSchema>>
