import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { useCreatePostComment } from '@/features/post/comments'

import { createCommentSchema, type CommentSchema } from '../contracts'

type Props = {
  postId: number
  onSuccessCallback?: () => void
}

export const usePostCommentCreateForm = ({
  postId,
  onSuccessCallback
}: Props) => {
  const { t } = useTranslation()
  const schema = createCommentSchema(t)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CommentSchema>({
    resolver: zodResolver(schema),
    defaultValues: { content: '' },
    mode: 'onSubmit'
  })

  const { createComment, isPending } = useCreatePostComment({
    postId,
    onSuccessCallback: () => {
      onSuccessCallback?.()
      reset()
    }
  })

  const onSubmit = handleSubmit((body) => {
    void createComment({ path: { id: String(postId) }, body })
  })

  return {
    control,
    onSubmit,
    errors,
    isPending
  }
}
