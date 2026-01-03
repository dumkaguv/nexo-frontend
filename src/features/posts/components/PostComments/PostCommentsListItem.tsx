import { useMutation } from '@tanstack/react-query'

import { Edit, Trash } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Link } from 'react-router-dom'
import { toast } from 'sonner'

import {
  type ResponsePostCommentDto,
  postControllerFindAllCommentsInfiniteQueryKey,
  postControllerFindAllInfiniteQueryKey,
  postControllerRemoveCommentMutation
} from '@/api'
import {
  AvatarWithColorInitials,
  ButtonMoreActions,
  Card,
  DayLabel,
  ModalConfirm,
  TipTapEditorPreview
} from '@/components/shared'

import * as Person from '@/components/shared/Person'

import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator
} from '@/components/ui'
import { paths } from '@/config'
import { useInvalidatePredicateQueries } from '@/hooks'
import { useAuthStore } from '@/stores'

import { showApiErrors } from '@/utils'

import { PostCommentsEditForm } from './PostCommentsEditForm'

type Props = {
  comment: ResponsePostCommentDto
  postId: number
}

export const PostCommentsListItem = ({ comment, postId }: Props) => {
  const [isOpenPopover, setIsOpenPopover] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const { user } = useAuthStore()
  const { t } = useTranslation()
  const { invalidateQueries } = useInvalidatePredicateQueries()

  const { mutateAsync: deleteCommentAsync, isPending } = useMutation({
    ...postControllerRemoveCommentMutation(),
    onSuccess: async () => {
      void invalidateQueries([postControllerFindAllInfiniteQueryKey()])
      await invalidateQueries([
        postControllerFindAllCommentsInfiniteQueryKey({
          path: { id: String(postId) }
        })
      ])
      toast.success(t('success'))
    },
    onError: (e) => showApiErrors(e)
  })

  const path = { id: String(postId), commentId: String(comment.id) }
  const onDelete = async () => await deleteCommentAsync({ path })
  const onEdit = () => {
    setIsOpenPopover(false)
    setIsEditing(true)
  }

  const isMe = user?.id === comment.user.id

  return (
    <div className="flex items-start gap-2">
      <Link to={paths.user.byId(comment.user.id)}>
        <AvatarWithColorInitials user={comment.user} />
      </Link>

      <Card className="bg-input/25 grid w-full gap-1 px-5 py-3">
        <div className="flex items-center justify-between gap-5">
          <Link to={paths.user.byId(comment.user.id)}>
            <Person.Name
              name={comment.user.profile.fullName}
              className="text-base"
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
          <PostCommentsEditForm
            postId={postId}
            comment={comment}
            setIsEditing={setIsEditing}
          />
        ) : (
          <TipTapEditorPreview content={comment.content} className="text-sm" />
        )}
      </Card>
    </div>
  )
}
