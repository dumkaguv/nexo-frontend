import { cn } from '@/utils'

import type { ComponentProps } from 'react'

const baseClass = 'leading-7 text-base text-muted-foreground tracking-tight'

export const Paragraph = ({
  children,
  className,
  ...props
}: ComponentProps<'p'>) => (
  <p className={cn(baseClass, className)} {...props}>
    {children}
  </p>
)
