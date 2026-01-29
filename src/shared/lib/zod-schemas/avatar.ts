import { z } from 'zod'

import type { TFunction } from 'i18next'

const MAX_MB_SIZE = 4
const MAX_MB_SIZE_FILE = MAX_MB_SIZE * 1024 * 1024

const isFileArray = (files: unknown): files is File[] =>
  Array.isArray(files) && files.every((file) => file instanceof File)

const getFirstFile = (files: FileList | File[] | undefined | null) => {
  if (!files) {
    return undefined
  }

  if (files instanceof FileList) {
    return files.length > 0 ? files[0] : undefined
  }

  return files.length > 0 ? files[0] : undefined
}

export const createAvatarSchema = (t: TFunction) =>
  z.object({
    avatar: z
      .custom<FileList | File[]>(
        (files) =>
          (files instanceof FileList && files.length > 0) || isFileArray(files),
        {
          error: t('required')
        }
      )
      .refine((files) => (getFirstFile(files)?.size ?? 0) <= MAX_MB_SIZE_FILE, {
        error: t('fileTooLarge', { max: MAX_MB_SIZE })
      })
  })

export type AvatarSchema = z.infer<ReturnType<typeof createAvatarSchema>>
