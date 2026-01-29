/* eslint-disable func-style */

import { cn } from '@/shared/lib'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        'bg-accent-foreground/20 animate-pulse rounded-md',
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
