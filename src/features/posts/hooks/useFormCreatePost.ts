import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import { QueryKeys } from '@/config'
import { createPostSchema } from '@/features/posts/zodSchemas'
import { useInvalidateQueries } from '@/hooks'
import { Api } from '@/services/apiClient'

import { handleMutationError } from '@/utils'

import type { CreatePostSchema } from '@/features/posts/zodSchemas'
import type { CreatePostPayload } from '@/services/posts'

export const useFormCreatePost = () => {
  const { t } = useTranslation()
  const { invalidateQueries } = useInvalidateQueries()

  const schema = createPostSchema(t)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CreatePostSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      content: ''
    }
  })

  const { mutateAsync: createPost, isPending } = useMutation({
    mutationFn: (payload: CreatePostPayload) => Api.posts.createPost(payload),
    onSuccess: async ({ message }) => {
      await invalidateQueries([QueryKeys.Posts.root])
      toast.success(message ?? t('success'))
      reset()
    },
    onError: (e) => handleMutationError(e)
  })

  const onSubmit = async (body: CreatePostPayload) => await createPost(body)

  return {
    register,
    onSubmit: handleSubmit(onSubmit),
    errors,
    isPending
  }
}
