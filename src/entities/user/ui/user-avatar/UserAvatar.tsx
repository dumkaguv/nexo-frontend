import { useOnlineUsersStore } from '@/entities/user'
import { cn } from '@/shared/lib'
import { AvatarWithColorInitials } from '@/shared/ui'
import { Avatar, AvatarImage, Badge, Skeleton } from '@/shared/ui/shadcn'

import type { ResponseUserDto, ResponseUserProfileDto } from '@/shared/api'

import type { CSSProperties, ReactNode } from 'react'

type Props = {
  user: ResponseUserProfileDto | ResponseUserDto | undefined
  size?: number
  isLoading?: boolean
  showOnlineBadge?: boolean
  className?: string
  avatarImageClassName?: string
  style?: CSSProperties
}

export const UserAvatar = ({
  user,
  size,
  isLoading,
  showOnlineBadge = false,
  className,
  avatarImageClassName,
  style
}: Props) => {
  const { onlineUserIds } = useOnlineUsersStore()

  const isOnline = showOnlineBadge && user?.id && onlineUserIds.has(user.id)

  const renderWithOnlineBadge = (children: ReactNode) => (
    <div className="relative">
      {children}

      {isOnline && (
        <Badge className="absolute right-0 -bottom-px size-3.5 rounded-full border-2 border-white bg-[#1cd14f] p-0 dark:border-[#262626]" />
      )}
    </div>
  )

  if (isLoading) {
    return (
      <Skeleton
        className={cn('size-11 rounded-full', className)}
        style={style}
      />
    )
  }

  if (user?.profile.avatar?.url) {
    return renderWithOnlineBadge(
      <Avatar className={cn('size-11', className)} style={style}>
        <AvatarImage
          src={user.profile.avatar.url}
          className={cn(avatarImageClassName)}
        />
      </Avatar>
    )
  }

  return renderWithOnlineBadge(
    <AvatarWithColorInitials
      name={user?.profile.fullName}
      id={user?.id}
      size={size}
      className={cn('rounded-full object-cover', !size && 'size-11', className)}
    />
  )
}
