import { cn } from '@/shared/lib'
import { Skeleton } from '@/shared/ui/shadcn'

import type { ComponentProps } from 'react'

type Props = {
  count?: number
} & ComponentProps<'ul'>

export const SubscriptionListSkeleton = ({
  count = 5,
  className,
  ...props
}: Props) => (
  <ul className={cn('flex flex-col gap-4', className)} {...props}>
    {Array.from({ length: count }).map((_, i) => (
      <li key={i} className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Skeleton className="h-10 w-10 rounded-full max-[450px]:h-8 max-[450px]:w-8" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-32 rounded max-[450px]:h-3.5 max-[450px]:w-24" />
            <Skeleton className="h-3 w-20 rounded max-[450px]:h-2.5 max-[450px]:w-16" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-28 rounded-md max-[450px]:h-8 max-[450px]:w-24" />
          <Skeleton className="h-8 w-8 rounded-md max-[450px]:h-7 max-[450px]:w-7" />
        </div>
      </li>
    ))}
  </ul>
)
