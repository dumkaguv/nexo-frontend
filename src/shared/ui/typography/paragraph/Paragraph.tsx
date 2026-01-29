import { cn } from '@/shared/lib'

import type { ComponentProps } from 'react'

const baseClass = 'leading-7 text-base  tracking-tight'

type Props = {
  isMuted?: boolean
} & ComponentProps<'p'>

export const Paragraph = ({
  children,
  className,
  isMuted = true,
  ...props
}: Props) => (
  <p
    className={cn(baseClass, isMuted && 'text-muted-foreground', className)}
    {...props}
  >
    {children}
  </p>
)
