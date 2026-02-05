import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import {
  storyControllerCreateMutation,
  storyControllerFindAllByUserIdQueryKey,
  storyControllerFindAllQueryKey,
  uploadControllerUploadMutation
} from '@/shared/api'
import { useInvalidatePredicateQueries } from '@/shared/hooks'
import { showApiErrors } from '@/shared/lib'

type Props = {
  userId?: number
}

type CreateStoryInput = {
  previewFile?: File
  files: File[]
}

export const useCreateStory = ({ userId }: Props = {}) => {
  const { t } = useTranslation()
  const { invalidateQueries } = useInvalidatePredicateQueries()

  const { mutateAsync: upload, isPending: isPendingUpload } = useMutation({
    ...uploadControllerUploadMutation(),
    onError: (e) => showApiErrors(e)
  })

  const { mutateAsync: createStory, isPending: isPendingCreate } = useMutation({
    ...storyControllerCreateMutation(),
    onSuccess: async () => {
      await invalidateQueries([
        storyControllerFindAllQueryKey({ query: { ordering: '-createdAt' } }),
        ...(userId
          ? [
              storyControllerFindAllByUserIdQueryKey({
                path: { userId: String(userId) },
                query: { ordering: '-createdAt' }
              })
            ]
          : [])
      ])
      toast.success(t('success'))
    },
    onError: (e) => showApiErrors(e)
  })

  const create = async ({ previewFile, files }: CreateStoryInput) => {
    const previewResponse = previewFile
      ? await upload({ body: { file: previewFile } })
      : undefined
    const previewUrl = previewResponse?.data?.secure_url

    const uploadResponse = await Promise.all(
      files.map((file) => upload({ body: { file } }))
    )
    const fileIds = uploadResponse
      .map(({ data }) => data?.id)
      .filter((id): id is number => !!id)

    await createStory({ body: { previewUrl, files: fileIds } })
  }

  return {
    createStory: create,
    isPending: isPendingCreate || isPendingUpload
  }
}
