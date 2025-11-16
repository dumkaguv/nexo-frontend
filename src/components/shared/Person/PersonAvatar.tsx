import { AvatarWithColorInitials } from '@/components/shared/AvatarWithColorInitials'
import { Avatar, AvatarImage, Skeleton } from '@/components/ui'
import { useAuthStore } from '@/stores'
import { cn } from '@/utils'

import type { CSSProperties } from 'react'

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

  return (
    <Avatar className={cn('size-16', className)}>
      {isPendingUser ? (
        <Skeleton
          className={cn('size-16 rounded-full', className)}
          style={style}
        />
      ) : src ? (
        <AvatarImage
          className={cn('object-cover', avatarImageClassName)}
          src={src ?? user?.profile.avatar?.url}
          style={style}
        />
      ) : (
        <AvatarWithColorInitials user={user} size={size} />
      )}
    </Avatar>
  )
}
