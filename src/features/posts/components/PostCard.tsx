import { useState } from 'react'
import { Link } from 'react-router-dom'

import {
  AvatarWithColorInitials,
  Card,
  DayLabel,
  ImagePreview,
  TipTapEditorPreview
} from '@/components/shared'
import * as User from '@/components/shared/Person'

import { paths } from '@/config'

import { cn } from '@/utils'

import { FormCreatePost } from './'
import { PostComments, PostCommentsSection } from './PostComments'
import { PostLikes } from './PostLikes'
import { PostMoreActions } from './PostMoreActions'

import type { ResponsePostDto } from '@/api'

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
      <FormCreatePost
        post={post}
        isEditing={isEditing}
        onCancelEdit={onCancelEdit}
        onSuccessCallback={onCancelEdit}
      />
    )
  }

  return (
    <Card className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-8">
        <div className="flex items-center gap-3">
          <Link to={paths.user.byId(post.user.id)}>
            <AvatarWithColorInitials user={post.user} />
          </Link>
          <div className="flex items-center gap-2">
            <Link to={paths.user.byId(post.user.id)}>
              <User.Name className="text-base" />
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
            className="size-full max-h-[320px]"
            containerClassName={cn(
              'grid gap-3',
              totalFiles === 1 && 'grid-cols-1',
              totalFiles === 2 && 'grid-cols-2',
              totalFiles >= 3 && 'grid-cols-3'
            )}
          />
        </div>

        <div className="mt-2 flex items-center gap-5">
          <PostLikes
            postId={post.id}
            likesCount={post.likesCount}
            isLiked={post.isLiked}
          />
          <PostComments
            commentsCount={post.commentsCount}
            onClick={onToggleCommentSection}
          />
        </div>

        {isOpenCommentSection && <PostCommentsSection postId={post.id} />}
      </div>
    </Card>
  )
}
