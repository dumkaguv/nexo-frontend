import { cn } from '@/shared/lib'
import { Typography } from '@/shared/ui'
import { Skeleton } from '@/shared/ui/shadcn'

import type { ComponentProps } from 'react'

type Props = {
  name: string | undefined
  isLoading?: boolean
} & ComponentProps<'h2'>

export const UserFullName = ({
  name,
  isLoading,
  className,
  ...rest
}: Props) => {
  if (isLoading) {
    return <Skeleton className="mt-1.5 h-6 w-36" />
  }

  return (
    <Typography.Title
      level={2}
      className={cn('text-xl font-bold', className)}
      {...rest}
    >
      {name}
    </Typography.Title>
  )
}
