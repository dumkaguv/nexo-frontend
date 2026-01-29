import { useTranslation } from 'react-i18next'

import { useAuthStore } from '@/entities/session'

import { UserAvatar } from '@/entities/user'

import { PostCommentForm } from './PostCommentForm'

import { usePostCommentCreateForm } from '../model'

type Props = {
  postId: number
  onSuccessCallback?: () => void
}

export const PostCommentCreateForm = ({ postId, onSuccessCallback }: Props) => {
  const { t } = useTranslation()
  const { user, isUserLoading } = useAuthStore()

  const { control, errors, onSubmit, isPending } = usePostCommentCreateForm({
    postId,
    onSuccessCallback
  })

  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <UserAvatar user={user} isLoading={isUserLoading} />

      <PostCommentForm
        control={control}
        errors={errors}
        onSubmit={onSubmit}
        isPending={isPending}
        placeholder={t('addComment')}
        toolbarClassName="border-b-0 mb-2"
        editorClassName="pr-15"
        formClassName="w-full"
      />
    </div>
  )
}
