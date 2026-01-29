import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { useEditPostComment } from '@/features/post/comments'

import { createCommentSchema, type CommentSchema } from '../contracts'

import type { ResponsePostCommentDto } from '@/shared/api'

type Props = {
  comment: ResponsePostCommentDto
  postId: number
  onSuccessCallback?: () => void
}

export const usePostCommentEditForm = ({
  comment,
  postId,
  onSuccessCallback
}: Props) => {
  const { t } = useTranslation()
  const schema = createCommentSchema(t)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<CommentSchema>({
    resolver: zodResolver(schema),
    defaultValues: { content: comment.content },
    mode: 'onSubmit'
  })

  const { updateComment, isPending } = useEditPostComment({
    postId,
    onSuccessCallback: () => onSuccessCallback?.()
  })

  const onSubmit = handleSubmit((body) => {
    void updateComment({
      path: { id: String(postId), commentId: String(comment.id) },
      body
    })
  })

  return {
    control,
    onSubmit,
    errors,
    isPending
  }
}
