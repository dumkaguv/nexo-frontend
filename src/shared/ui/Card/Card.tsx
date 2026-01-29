import { cn } from '@/shared/lib'
import { Skeleton } from '@/shared/ui/shadcn'

import type { ComponentProps } from 'react'

export type CardProps = {
  rows?: number
  loading?: boolean
} & ComponentProps<'div'>

export const Card = ({
  children,
  className,
  rows = 3,
  loading = false,
  ...rest
}: CardProps) => (
  <div
    className={cn(
      'border-accent bg-card rounded-md border p-4 shadow-sm sm:p-5',
      className
    )}
    {...rest}
  >
    {loading ? (
      <div className="flex flex-col gap-3">
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>
    ) : (
      children
    )}
  </div>
)
