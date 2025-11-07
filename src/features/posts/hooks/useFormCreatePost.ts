import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import {
  postControllerCreateMutation,
  postControllerFindAllInfiniteQueryKey,
  uploadControllerUploadMutation
} from '@/api'
import { createPostSchema } from '@/features/posts/zodSchemas'
import { useInvalidatePredicateQueries } from '@/hooks'
import { showApiErrors } from '@/utils'

import type { CreatePostSchema } from '@/features/posts/zodSchemas'

type Props = {
  files?: File[] | null
  onSuccessCallback?: () => void
}

export const useFormCreatePost = ({ files, onSuccessCallback }: Props) => {
  const { t } = useTranslation()
  const { invalidateQueries } = useInvalidatePredicateQueries()

  const schema = createPostSchema(t)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CreatePostSchema>({
    resolver: zodResolver(schema),
    defaultValues: { content: '' }
  })

  const { mutateAsync: createPost, isPending } = useMutation({
    ...postControllerCreateMutation(),
    onSuccess: async () => {
      await invalidateQueries([postControllerFindAllInfiniteQueryKey()])
      toast.success(t('success'))
      reset()
      onSuccessCallback?.()
    },
    onError: (e) => showApiErrors(e)
  })

  const { mutateAsync: upload, isPending: isUploading } = useMutation({
    ...uploadControllerUploadMutation(),
    onError: (e) => showApiErrors(e)
  })

  const onSubmit = async (body: CreatePostSchema) => {
    const response = await Promise.all(
      files?.map((file) => upload({ body: { file } })) ?? []
    )
    const fileIds = response.map(({ data: { id } }) => id)
    await createPost({ body: { ...body, files: fileIds } })
  }

  return {
    control,
    onSubmit: handleSubmit(onSubmit),
    errors,
    isPending: isUploading || isPending
  }
}
