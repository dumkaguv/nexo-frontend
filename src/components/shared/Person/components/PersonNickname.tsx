import { Link } from 'react-router-dom'

import { Button, Skeleton } from '@/components/ui'
import { Routes } from '@/config'
import { cn } from '@/utils'

import type { ComponentProps } from 'react'

type Props = ComponentProps<'button'> & {
  nickname?: string
}

export const PersonNickname = ({ className, nickname, ...rest }: Props) => {
  return (
    <Button
      asChild
      className={cn('h-fit p-0', className)}
      variant="link"
      {...rest}
    >
      {nickname ? (
        <Link to={Routes.settings.account}>{`@${nickname}`}</Link>
      ) : (
        <Skeleton className="mt-1.5 h-4 w-14" />
      )}
    </Button>
  )
}
