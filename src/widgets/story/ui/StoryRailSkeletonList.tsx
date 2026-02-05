import { cn } from '@/shared/lib'
import { Skeleton } from '@/shared/ui/shadcn'

type Props = {
  count?: number
  className?: string
}

export const StoryRailSkeletonList = ({ count = 5, className }: Props) => {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} className="size-16 rounded-full max-lg:size-14" />
      ))}
    </div>
  )
}
