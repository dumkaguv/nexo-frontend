import { Typography } from '@/components/shared'
import { Skeleton } from '@/components/ui'
import { useAuthStore } from '@/stores'
import { cn } from '@/utils'

import type { ComponentProps } from 'react'

type Props = {
  name?: string
} & ComponentProps<'h2'>

export const PersonName = ({ name, className, ...rest }: Props) => {
  const { user } = useAuthStore()

  return (
    <Typography.Title
      level={2}
      className={cn('text-xl font-bold', className)}
      {...rest}
    >
      {(name ?? user?.profile.fullName) ? (
        (name ?? user?.profile.fullName)
      ) : (
        <Skeleton className="mt-1.5 h-6 w-36" />
      )}
    </Typography.Title>
  )
}
