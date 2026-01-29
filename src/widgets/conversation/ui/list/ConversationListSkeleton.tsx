import { cn } from '@/shared/lib'
import { Skeleton } from '@/shared/ui/shadcn'

import type { ComponentProps } from 'react'

type Props = {
  count?: number
} & ComponentProps<'ul'>

export const ConversationListSkeleton = ({
  count = 5,
  className,
  ...props
}: Props) => (
  <ul className={cn('flex flex-col gap-4', className)} {...props}>
    {Array.from({ length: count }).map((_, i) => (
      <li key={i} className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Skeleton className="size-11 rounded-full" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-40 rounded" />
            <Skeleton className="h-3 w-24 rounded" />
          </div>
        </div>
      </li>
    ))}
  </ul>
)
