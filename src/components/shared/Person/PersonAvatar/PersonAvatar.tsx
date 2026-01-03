import { AvatarWithColorInitials } from '@/components/shared/AvatarWithColorInitials'
import { Avatar, AvatarImage, Skeleton } from '@/components/ui'
import { useAuthStore } from '@/stores'
import { cn } from '@/utils'

import type { CSSProperties, JSX } from 'react'

type Props = {
  src?: string | null
  size?: number
  className?: string
  avatarImageClassName?: string
  style?: CSSProperties
}

export const PersonAvatar = ({
  src,
  size,
  className,
  avatarImageClassName,
  style
}: Props) => {
  const { user, isPendingUser } = useAuthStore()

  let content: JSX.Element

  if (isPendingUser) {
    content = (
      <Skeleton
        className={cn('size-16 rounded-full', className)}
        style={style}
      />
    )
  } else if (src || user?.profile.avatar?.url) {
    content = (
      <AvatarImage
        className={cn('object-cover', avatarImageClassName)}
        src={src ?? user?.profile.avatar?.url}
        style={style}
      />
    )
  } else {
    content = <AvatarWithColorInitials user={user} size={size} />
  }

  return <Avatar className={cn('size-16', className)}>{content}</Avatar>
}
