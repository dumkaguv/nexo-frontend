import { AvatarWithColorInitials } from '@/components/shared/AvatarWithColorInitials'
import { Avatar, AvatarImage, Skeleton } from '@/components/ui'
import { useAuthStore } from '@/stores'
import { cn } from '@/utils'

type Props = {
  src?: string | null
  size?: number
  className?: string
  avatarImageClassName?: string
}

export const PersonAvatar = ({
  src,
  size,
  className,
  avatarImageClassName
}: Props) => {
  const { user, isPendingUser } = useAuthStore()

  return (
    <Avatar className={cn('size-16', className)}>
      {isPendingUser ? (
        <Skeleton className={cn('size-16 rounded-full', className)} />
      ) : src ? (
        <AvatarImage
          className={cn('object-cover', avatarImageClassName)}
          src={src ?? user?.profile.avatar?.url}
        />
      ) : (
        <AvatarWithColorInitials user={user} size={size} />
      )}
    </Avatar>
  )
}
