import { PostCommentForm } from './PostCommentForm'

import { usePostCommentEditForm } from '../model'

import type { ResponsePostCommentDto } from '@/shared/api'

type Props = {
  comment: ResponsePostCommentDto
  postId: number
  onCancelEdit?: () => void
  onSuccessCallback?: () => void
}

export const PostCommentEditForm = ({
  comment,
  postId,
  onCancelEdit,
  onSuccessCallback
}: Props) => {
  const onSuccess = () => {
    onSuccessCallback?.()
    onCancelEdit?.()
  }

  const { control, errors, onSubmit, isPending } = usePostCommentEditForm({
    comment,
    postId,
    onSuccessCallback: onSuccess
  })

  return (
    <PostCommentForm
      control={control}
      errors={errors}
      onSubmit={onSubmit}
      isPending={isPending}
      isEditing
      onCancelEdit={onCancelEdit}
      toolbarClassName="mb-2"
    />
  )
}
