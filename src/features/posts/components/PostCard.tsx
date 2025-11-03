import { Link } from 'react-router-dom'

import { AvatarWithColorInitials, Card, DayLabel } from '@/components/shared'
import * as User from '@/components/shared/Person'

import { paths } from '@/config'

import { PostLikes } from './PostLikes'
import { PostMoreActions } from './PostMoreActions'

import type { ResponsePostDto } from '@/api'

type Props = {
  post: ResponsePostDto
}

export const PostCard = ({ post }: Props) => {
  return (
    <Card className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-8">
        <div className="flex items-center gap-3">
          <Link to={paths.profile.root}>
            <AvatarWithColorInitials
              id={post.user.id}
              name={post.user.profile.fullName}
              src={post.user.profile.avatarUrl}
            />
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

        <PostLikes postId={post.id} isLiked={post.isLiked} />
      </div>
    </Card>
  )
}
