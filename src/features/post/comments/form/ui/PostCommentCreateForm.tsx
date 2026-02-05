import { useTranslation } from 'react-i18next'

import { useAuthStore } from '@/entities/session'

import { UserAvatar } from '@/entities/user'

import { Breakpoints } from '@/shared/config'
import { useMinWidth } from '@/shared/hooks'

import { PostCommentForm } from './PostCommentForm'

import { usePostCommentCreateForm } from '../model'

type Props = {
  postId: number
  onSuccessCallback?: () => void
}

export const PostCommentCreateForm = ({ postId, onSuccessCallback }: Props) => {
  const { t } = useTranslation()
  const { user, isUserLoading } = useAuthStore()

  const isDesktop = useMinWidth(Breakpoints.md)

  const { control, errors, onSubmit, isPending } = usePostCommentCreateForm({
    postId,
    onSuccessCallback
  })

  return (
    <div className="flex gap-2">
      {isDesktop && (
        <UserAvatar
          user={user}
          isLoading={isUserLoading}
          className="max-md:hidden"
        />
      )}

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
