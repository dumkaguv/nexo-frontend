import { cn } from '@/utils'

import type { ComponentProps } from 'react'

const textBaseClass = 'text-base leading-6'

export const Text = ({
  children,
  className,
  ...props
}: ComponentProps<'span'>) => (
  <span className={cn(textBaseClass, className)} {...props}>
    {children}
  </span>
)
