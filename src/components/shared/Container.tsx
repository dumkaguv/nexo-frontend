import { cn } from '@/utils'

import type { ComponentProps } from 'react'

type Props = ComponentProps<'div'>

export const Container = ({ children, className, ...rest }: Props) => (
  <div className={cn('mx-auto max-w-[1280px]', className)} {...rest}>
    {children}
  </div>
)
