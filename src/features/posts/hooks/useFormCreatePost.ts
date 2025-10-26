import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import {
  postControllerCreateMutation,
  postControllerFindAllQueryKey
} from '@/api'
import { createPostSchema } from '@/features/posts/zodSchemas'

import { useInvalidatePredicateQueries } from '@/hooks'
import { showApiErrors } from '@/utils'

import type { CreatePostSchema } from '@/features/posts/zodSchemas'

export const useFormCreatePost = () => {
  const { t } = useTranslation()
  const { invalidateQueries } = useInvalidatePredicateQueries()

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
    ...postControllerCreateMutation(),
    onSuccess: async ({ message }) => {
      await invalidateQueries([postControllerFindAllQueryKey()])
      toast.success(message ?? t('success'))
      reset()
    },
    onError: (e) => showApiErrors(e)
  })

  const onSubmit = async (body: CreatePostSchema) => await createPost({ body })

  return {
    register,
    onSubmit: handleSubmit(onSubmit),
    errors,
    isPending
  }
}
