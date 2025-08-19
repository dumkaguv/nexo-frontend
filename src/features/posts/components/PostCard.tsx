import { Link } from 'react-router-dom'

import { Card, DayLabel } from '@/components/shared'
import * as User from '@/components/shared/Person'
import { Routes } from '@/config'
import { getFileType } from '@/features/posts/utils'

import type { Post } from '@/types'

type Props = {
  post: Post
}

export const PostCard = ({ post }: Props) => {
  const counts = post.files?.reduce(
    (acc, { type }) => {
      const fileType = getFileType(String(type))
      if (fileType) {
        acc[fileType] += 1
      }

      return acc
    },
    { image: 0, video: 0 }
  ) ?? { image: 0, video: 0 }

  return (
    <Card className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Link to={Routes.profile}>
          <User.Avatar
            src={post.author?.profile.avatarUrl}
            className="size-12"
          />
        </Link>
        <div className="flex items-center gap-2">
          <Link to={Routes.profile}>
            <User.Name
              name={post.author?.profile.fullName}
              className="text-base"
            />
          </Link>
          <DayLabel date={post.createdAt} />
        </div>
      </div>

      <div>{post.content}</div>

      <div className="flex flex-wrap items-center gap-5">
        {post.files?.map(({ id, url, type }) => {
          const fileType = getFileType(String(type))

          if (fileType === 'image') {
            return (
              <img
                key={id}
                src={url}
                alt=""
                width={300}
                height={300}
                style={{ width: counts.image === 1 ? '100%' : undefined }}
                className="aspect-[100/49] max-h-[350px]"
              />
            )
          }

          if (fileType === 'video') {
            return (
              <video
                key={id}
                src={url}
                width={300}
                height={300}
                style={{ width: counts.video === 1 ? '100%' : undefined }}
                className="h-full max-h-[350px]"
                controls
              />
            )
          }

          return null
        })}
      </div>
    </Card>
  )
}
