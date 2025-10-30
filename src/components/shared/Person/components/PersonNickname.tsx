import { Link } from 'react-router-dom'

import { Typography } from '@/components/shared'
import { Button, Skeleton } from '@/components/ui'
import { paths } from '@/config'
import { useAuthStore } from '@/stores'
import { cn } from '@/utils'

import type { ComponentProps } from 'react'

type Props = {
  nickname?: string
  asLink?: boolean
} & ComponentProps<'button'>

export const PersonNickname = ({
  nickname,
  asLink,
  className,
  ...rest
}: Props) => {
  const { user } = useAuthStore()

  return (
    <Button
      asChild
      className={cn('h-fit p-0', className)}
      variant={asLink ? 'link' : 'text'}
      {...rest}
    >
      {(nickname ?? user?.username) ? (
        asLink ? (
          <Link
            to={paths.settings.account}
          >{`@${nickname ?? user?.username}`}</Link>
        ) : (
          <Typography.Text className="text-muted-foreground">
            {user?.username}
          </Typography.Text>
        )
      ) : (
        <Skeleton className="mt-1.5 h-4 w-14" />
      )}
    </Button>
  )
}
