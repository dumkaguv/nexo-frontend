import { Link } from 'react-router-dom'

import { Button, Skeleton } from '@/components/ui'
import { paths } from '@/config'
import { useAuthStore } from '@/stores'
import { cn } from '@/utils'

import type { ComponentProps } from 'react'

type Props = {
  nickname?: string
} & ComponentProps<'button'>

export const PersonNickname = ({ nickname, className, ...rest }: Props) => {
  const { user } = useAuthStore()

  return (
    <Button
      asChild
      className={cn('h-fit p-0', className)}
      variant="link"
      {...rest}
    >
      {(nickname ?? user?.username) ? (
        <Link
          to={paths.settings.account}
        >{`@${nickname ?? user?.username}`}</Link>
      ) : (
        <Skeleton className="mt-1.5 h-4 w-14" />
      )}
    </Button>
  )
}
