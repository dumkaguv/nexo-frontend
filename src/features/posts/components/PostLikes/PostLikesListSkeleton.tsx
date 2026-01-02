import { Skeleton } from '@/components/ui'
import { cn } from '@/utils'

import type { ComponentProps } from 'react'

type Props = {
  count?: number
} & ComponentProps<'ul'>

export const PostLikesListSkeleton = ({
  count = 5,
  className,
  ...props
}: Props) => (
  <ul className={cn('flex flex-col gap-4', className)} {...props}>
    {Array.from({ length: count }).map((_, i) => (
      <li key={i} className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-32 rounded" />
            <Skeleton className="h-3 w-20 rounded" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-28 rounded-md" />
        </div>
      </li>
    ))}
  </ul>
)
