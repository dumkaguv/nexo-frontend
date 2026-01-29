import { useState } from 'react'
import { Link } from 'react-router-dom'

import { UserAvatar, UserFullName } from '@/entities/user'
import { EditPostForm } from '@/features/post'
import { paths } from '@/shared/config'

import { cn } from '@/shared/lib'
import { Card, DayLabel, ImagePreview, TipTapEditorPreview } from '@/shared/ui'

import { PostCommentsButton, PostCommentsSection } from '../comments'
import { PostLikesButton } from '../likes'
import { PostMoreActions } from '../more-actions'

import type { ResponsePostDto } from '@/shared/api'

type Props = {
  post: ResponsePostDto
}

export const PostCard = ({ post }: Props) => {
  const [isOpenCommentSection, setIsOpenCommentSection] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const onToggleCommentSection = () => setIsOpenCommentSection((prev) => !prev)
  const onEdit = () => setIsEditing(true)
  const onCancelEdit = () => setIsEditing(false)

  const previewUrls = post.files?.map(({ file }) => file?.url) ?? []
  const totalFiles = previewUrls.length

  if (isEditing) {
    return (
      <EditPostForm
        post={post}
        onCancelEdit={onCancelEdit}
        onSuccessCallback={onCancelEdit}
      />
    )
  }

  return (
    <Card className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <div className="flex items-center gap-3">
          <Link to={paths.user.byId(post.user.id)}>
            <UserAvatar user={post.user} />
          </Link>
          <div className="flex items-center gap-2">
            <Link to={paths.user.byId(post.user.id)}>
              <UserFullName
                name={post.user.profile.fullName}
                className="text-base"
              />
            </Link>

            <DayLabel date={post.createdAt} />
          </div>
        </div>

        <PostMoreActions post={post} onButtonEdit={onEdit} />
      </div>

      <div className="grid gap-4">
        <div className="flex flex-col gap-3">
          <TipTapEditorPreview content={post.content} />

          <ImagePreview
            srcs={previewUrls}
            maxImages={totalFiles < 3 ? totalFiles + 1 : 3}
            className="size-full max-h-80"
            containerClassName={cn(
              'grid gap-3',
              totalFiles === 1 && 'grid-cols-1',
              totalFiles === 2 && 'grid-cols-2',
              totalFiles >= 3 && 'grid-cols-2 sm:grid-cols-3'
            )}
          />
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-4">
          <PostLikesButton
            postId={post.id}
            likesCount={post.likesCount}
            isLiked={post.isLiked}
          />
          <PostCommentsButton
            commentsCount={post.commentsCount}
            onClick={onToggleCommentSection}
          />
        </div>

        {isOpenCommentSection && <PostCommentsSection postId={post.id} />}
      </div>
    </Card>
  )
}
