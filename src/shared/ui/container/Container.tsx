import { cn } from '@/shared/lib'

import type { ComponentProps } from 'react'

type Props = ComponentProps<'div'>

export const Container = ({ children, className, ...rest }: Props) => (
  <div
    className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}
    {...rest}
  >
    {children}
  </div>
)
