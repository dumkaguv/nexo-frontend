import { useState } from 'react'
import { Link } from 'react-router-dom'

import { AvatarWithColorInitials, Card, DayLabel } from '@/components/shared'
import * as User from '@/components/shared/Person'

import { paths } from '@/config'

import { PostComments, PostCommentsSection } from './PostComments'
import { PostLikes } from './PostLikes'
import { PostMoreActions } from './PostMoreActions'

import type { ResponsePostDto } from '@/api'

type Props = {
  post: ResponsePostDto
}

export const PostCard = ({ post }: Props) => {
  const [isOpenCommentSection, setIsOpenCommentSection] = useState(false)

  const onToggleCommentSection = () => setIsOpenCommentSection((prev) => !prev)

  return (
    <Card className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-8">
        <div className="flex items-center gap-3">
          <Link to={paths.profile.root}>
            <AvatarWithColorInitials user={post.user} />
          </Link>
          <div className="flex items-center gap-2">
            <Link to={paths.profile.root}>
              <User.Name className="text-base" />
            </Link>

            <DayLabel date={post.createdAt} />
          </div>
        </div>

        <PostMoreActions post={post} />
      </div>

      <div className="grid gap-4">
        <div>{post.content}</div>

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
