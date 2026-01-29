import { cn } from '@/shared/lib'
import { Card } from '@/shared/ui'

import type { ComponentProps } from 'react'

type Props = ComponentProps<'aside'> & {
  bodyClassName?: string
}

export const Sidebar = ({
  className,
  bodyClassName,
  children,
  ...rest
}: Props) => (
  <aside
    className={cn('w-full max-w-full lg:max-w-[280px]', className)}
    {...rest}
  >
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
