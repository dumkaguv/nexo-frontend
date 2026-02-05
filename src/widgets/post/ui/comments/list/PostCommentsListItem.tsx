import { Edit, Trash } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Link } from 'react-router-dom'

import { useAuthStore } from '@/entities/session'
import { UserAvatar, UserFullName } from '@/entities/user'

import { PostCommentEditForm } from '@/features/post'
import { useDeletePostComment } from '@/features/post/comments/delete'
import { paths } from '@/shared/config'

import {
  ButtonMoreActions,
  Card,
  DayLabel,
  ModalConfirm,
  TipTapEditorPreview
} from '@/shared/ui'
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator
} from '@/shared/ui/shadcn'

import type { ResponsePostCommentDto } from '@/shared/api'

type Props = {
  comment: ResponsePostCommentDto
  postId: number
}

export const PostCommentsListItem = ({ comment, postId }: Props) => {
  const [isOpenPopover, setIsOpenPopover] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const { user } = useAuthStore()
  const { t } = useTranslation()

  const { deleteComment, isPending } = useDeletePostComment({ postId })

  const path = { id: String(postId), commentId: String(comment.id) }

  const onDelete = () => deleteComment({ path })

  const onEdit = () => {
    setIsOpenPopover(false)
    setIsEditing(true)
  }

  const isMe = user?.id === comment.user.id

  return (
    <div className="flex items-start gap-2">
      <Link to={paths.user.byId(comment.user.id)}>
        <UserAvatar user={comment.user} size={36} className="size-9" />
      </Link>

      <Card className="bg-input/25 grid w-full gap-1 px-4 py-2.5! sm:px-5">
        <div className="flex items-center justify-between gap-2 sm:gap-5">
          <Link to={paths.user.byId(comment.user.id)}>
            <UserFullName
              name={comment.user.profile.fullName}
              className="text-base max-lg:text-base"
            />
          </Link>

          <div className="flex items-center gap-2">
            <DayLabel
              date={comment.createdAt}
              showIcon={false}
              className="text-xs"
            />

            {isMe && !isEditing && (
              <Popover open={isOpenPopover} onOpenChange={setIsOpenPopover}>
                <PopoverTrigger asChild>
                  <ButtonMoreActions />
                </PopoverTrigger>
                <PopoverContent className="w-fit px-1 py-2 text-sm">
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onEdit}
                      className="w-full justify-start"
                    >
                      <Edit /> {t('edit')}
                    </Button>

                    <Separator className="relative right-1 w-[calc(100%+8px)]!" />

                    <ModalConfirm
                      onOk={onDelete}
                      okButtonProps={{ loading: isPending }}
                    >
                      <Button
                        variant="destructive"
                        size="sm"
                        className="bg-destructive/90 justify-start"
                      >
                        <Trash /> {t('delete')}
                      </Button>
                    </ModalConfirm>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>

        {isEditing ? (
          <PostCommentEditForm
            postId={postId}
            comment={comment}
            onCancelEdit={() => setIsEditing(false)}
          />
        ) : (
          <TipTapEditorPreview content={comment.content} className="text-sm" />
        )}
      </Card>
    </div>
  )
}
