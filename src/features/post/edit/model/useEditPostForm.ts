import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import {
  postsControllerFindAllInfiniteQueryKey,
  postsControllerUpdateMutation,
  uploadControllerDeleteMutation,
  uploadControllerUploadMutation,
  type ResponsePostDto
} from '@/shared/api'
import { useInvalidatePredicateQueries } from '@/shared/hooks'
import { showApiErrors } from '@/shared/lib'

import { createPostSchema, type PostSchema } from '../contracts'

type Props = {
  post: ResponsePostDto
  files?: File[]
  previews: string[]
  onSuccessCallback?: () => void
}

export const useEditPostForm = ({
  post,
  files,
  previews,
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
  } = useForm<PostSchema>({
    resolver: zodResolver(schema),
    defaultValues: { content: post.content ?? '<p></p>' },
    mode: 'onSubmit'
  })

  const mutationConfig = {
    onSuccess: async () => {
      await invalidateQueries([postsControllerFindAllInfiniteQueryKey()])
      toast.success(t('success'))
      reset({ content: post.content ?? '<p></p>' })
      onSuccessCallback?.()
    },
    onError: (e: unknown) => showApiErrors(e)
  }

  const { mutateAsync: updatePost, isPending: isUpdating } = useMutation({
    ...postsControllerUpdateMutation(),
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

  const onSubmit = async (body: PostSchema) => {
    const uploaded = await Promise.all(
      files?.map((file) => upload({ body: { file } })) ?? []
    )
    const newFileIds = uploaded
      .map(({ data }) => data?.id)
      .filter((id): id is number => !!id)

    const previewsSet = new Set(previews)
    const filesToDelete =
      post.files?.filter(({ file }) => !previewsSet.has(file.url)) ?? []

    await Promise.all(
      filesToDelete.map(({ file }) =>
        uploadDelete({ path: { id: String(file.id) } })
      )
    )

    await updatePost({
      path: { id: String(post.id) },
      body: { ...body, files: newFileIds }
    })
  }

  return {
    control,
    onSubmit: handleSubmit(onSubmit),
    errors,
    isPending: isUploading || isUpdating || isDeletingUpload
  }
}
