import { cn } from '@/shared/lib'
import { Card } from '@/shared/ui'

import type { ComponentProps } from 'react'

export type SidebarProps = ComponentProps<'aside'> & {
  bodyClassName?: string
}

export const Sidebar = ({
  className,
  bodyClassName,
  children,
  ...rest
}: SidebarProps) => (
  <aside className={cn('w-full max-w-80 max-lg:max-w-70', className)} {...rest}>
    <Card
      className={cn(
        'flex flex-col items-center justify-start lg:sticky lg:top-[calc(var(--header-height)+20px)]',
        bodyClassName
      )}
    >
      {children}
    </Card>
  </aside>
)
