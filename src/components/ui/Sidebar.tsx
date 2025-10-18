import { Card } from '@/components/shared'
import { cn } from '@/utils'

import type { ComponentProps } from 'react'

type Props = ComponentProps<'aside'> & {
  bodyClassName?: string
}

export const Sidebar = ({
  className,
  bodyClassName,
  children,
  ...rest
}: Props) => {
  return (
    <aside className={cn('w-[280px] max-w-[280px]', className)} {...rest}>
      <Card
        className={cn(
          'sticky top-[calc(var(--header-height)+20px)] flex flex-col items-center justify-start',
          bodyClassName
        )}
      >
        {children}
      </Card>
    </aside>
  )
}
