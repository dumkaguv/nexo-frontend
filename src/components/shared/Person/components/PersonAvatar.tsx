import { Avatar, AvatarImage, Skeleton } from '@/components/ui'
import { ImageFallbacks } from '@/config'
import { useAuthStore } from '@/stores'
import { cn } from '@/utils'

type Props = {
  src?: string | null
  className?: string
  avatarImageClassName?: string
}

export const PersonAvatar = ({
  src,
  className,
  avatarImageClassName
}: Props) => {
  const { user, isPendingUser } = useAuthStore()

  return (
    <Avatar className={cn('size-16', className)}>
      {isPendingUser ? (
        <Skeleton className={cn('size-16 rounded-full', className)} />
      ) : (
        <AvatarImage
          className={cn('object-cover', avatarImageClassName)}
          src={src ?? user?.profile.avatarUrl ?? ImageFallbacks.avatar}
        />
      )}
    </Avatar>
  )
}
