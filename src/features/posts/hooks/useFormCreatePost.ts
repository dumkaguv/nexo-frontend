import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import {
  postControllerCreateMutation,
  postControllerFindAllInfiniteQueryKey,
  postControllerUpdateMutation,
  uploadControllerDeleteMutation,
  uploadControllerUploadMutation
} from '@/api'
import { createPostSchema } from '@/features/posts/zodSchemas'
import { useInvalidatePredicateQueries } from '@/hooks'
import { showApiErrors } from '@/utils'

import type { ResponsePostDto } from '@/api'

import type { CreatePostSchema } from '@/features/posts/zodSchemas'

type Props = {
  files?: File[]
  previews?: string[]
  content?: string
  post?: ResponsePostDto
  onSuccessCallback?: () => void
}

export const useFormCreatePost = ({
  files,
  previews,
  content,
  post,
  onSuccessCallback
}: Props) => {
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
    defaultValues: { content: content ?? '' }
  })

  const mutationConfig = {
    onSuccess: async () => {
      await invalidateQueries([postControllerFindAllInfiniteQueryKey()])
      toast.success(t('success'))
      reset()
      onSuccessCallback?.()
    },
    onError: (e: unknown) => showApiErrors(e)
  }
  const { mutateAsync: createPost, isPending } = useMutation({
    ...postControllerCreateMutation(),
    ...mutationConfig
  })

  const { mutateAsync: updatePost, isPending: isUpdating } = useMutation({
    ...postControllerUpdateMutation(),
    ...mutationConfig
  })

  const { mutateAsync: upload, isPending: isUploading } = useMutation({
    ...uploadControllerUploadMutation(),
    onError: (e) => showApiErrors(e)
  })

  const { mutateAsync: uploadDelete, isPending: isDeletingUpload } =
    useMutation({
      ...uploadControllerDeleteMutation(),
      onError: (e) => showApiErrors(e)
    })

  const onSubmit = async (body: CreatePostSchema) => {
    const response = await Promise.all(
      files?.map((file) => upload({ body: { file } })) ?? []
    )
    const fileIds = response.map(({ data: { id } }) => id)

    if (post) {
      const previewsSet = new Set(previews)
      const filesToDelete = post?.files?.filter(
        ({ file: { url } }) => !previewsSet.has(url)
      )

      await Promise.all([
        filesToDelete?.map(({ file }) =>
          uploadDelete({ path: { id: String(file.id) } })
        ),
        updatePost({
          path: { id: String(post.id) },
          body: { ...body, files: fileIds }
        })
      ])
    } else {
      await createPost({ body: { ...body, files: fileIds } })
    }
  }

  return {
    control,
    onSubmit: handleSubmit(onSubmit),
    errors,
    isPending: isUploading || isPending || isUpdating || isDeletingUpload
  }
}
