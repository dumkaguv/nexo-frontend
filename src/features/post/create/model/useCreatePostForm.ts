import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import {
  postsControllerCreateMutation,
  postsControllerFindAllInfiniteQueryKey,
  uploadControllerUploadMutation
} from '@/shared/api'
import { useInvalidatePredicateQueries } from '@/shared/hooks'
import { showApiErrors } from '@/shared/lib'

import { createPostSchema, type PostSchema } from '../contracts/createPost'

type Props = {
  files?: File[]
  onSuccessCallback?: () => void
}

export const useCreatePostForm = ({ files, onSuccessCallback }: Props) => {
  const { t } = useTranslation()
  const { invalidateQueries } = useInvalidatePredicateQueries()
  const schema = createPostSchema(t, { hasFiles: (files?.length ?? 0) > 0 })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<PostSchema>({
    resolver: zodResolver(schema),
    defaultValues: { content: '<p></p>' },
    mode: 'onSubmit'
  })

  const { mutateAsync: upload, isPending: isUploading } = useMutation({
    ...uploadControllerUploadMutation(),
    onError: (e) => showApiErrors(e)
  })

  const { mutateAsync: createPost, isPending } = useMutation({
    ...postsControllerCreateMutation(),
    onSuccess: async () => {
      await invalidateQueries([postsControllerFindAllInfiniteQueryKey()])
      toast.success(t('success'))

      requestAnimationFrame(() =>
        reset(
          { content: '<p></p>' },
          {
            keepErrors: false,
            keepDirty: false,
            keepTouched: false,
            keepIsSubmitted: false,
            keepDefaultValues: false
          }
        )
      )

      onSuccessCallback?.()
    },
    onError: (e) => showApiErrors(e)
  })

  const onSubmit = async (body: PostSchema) => {
    setIsSubmitting(true)

    try {
      const response = await Promise.all(
        files?.map((file) => upload({ body: { file } })) ?? []
      )
      const fileIds = response
        .map(({ data }) => data?.id)
        .filter((id): id is number => !!id)

      await createPost({ body: { ...body, files: fileIds } })
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    control,
    onSubmit: handleSubmit(onSubmit),
    errors,
    isPending: isSubmitting || isUploading || isPending
  }
}
