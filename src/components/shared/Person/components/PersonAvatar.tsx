import { Avatar, AvatarImage, Skeleton } from '@/components/ui'
import { ImageFallbacks } from '@/config'
import { cn } from '@/utils'

type Props = {
  src?: string | null
  className?: string
  isLoading?: boolean
}

export const PersonAvatar = ({ src, isLoading, className }: Props) => {
  return (
    <Avatar className={className}>
      {isLoading ? (
        <Skeleton className={cn('rounded-full', className)} />
      ) : (
        <AvatarImage
          className="object-cover"
          src={src ?? ImageFallbacks.avatar}
        />
      )}
    </Avatar>
  )
}
