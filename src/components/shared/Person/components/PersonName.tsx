import { Typography } from '@/components/shared'
import { Skeleton } from '@/components/ui'
import { cn } from '@/utils'

import type { ComponentProps } from 'react'

type Props = ComponentProps<'h2'> & {
  name?: string
}

export const PersonName = ({ name, className, ...rest }: Props) => {
  return (
    <Typography.Title
      level={2}
      className={cn('text-xl font-bold', className)}
      {...rest}
    >
      {name ? name : <Skeleton className="mt-1.5 h-6 w-36" />}
    </Typography.Title>
  )
}
