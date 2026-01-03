import { Link } from 'react-router-dom'

import { Typography } from '@/components/shared'
import { Button, Skeleton } from '@/components/ui'
import { paths } from '@/config'
import { useAuthStore } from '@/stores'
import { cn } from '@/utils'

import type { ComponentProps, JSX } from 'react'

type Props = {
  nickname?: string
  asLink?: boolean
  userId?: number
} & ComponentProps<'button'>

export const PersonNickname = ({
  nickname,
  asLink,
  userId,
  className,
  ...rest
}: Props) => {
  const { user } = useAuthStore()

  const username = nickname ?? user?.username

  let content: JSX.Element

  if (!username) {
    content = <Skeleton className="mt-1.5 h-4 w-14" />
  } else if (asLink) {
    content = (
      <Link to={paths.user.byId(Number(userId) || Number(user?.id))}>
        @{username}
      </Link>
    )
  } else {
    content = (
      <Typography.Text className="text-muted-foreground">
        {username}
      </Typography.Text>
    )
  }

  return (
    <Button
      asChild
      className={cn('h-fit p-0', className)}
      variant={asLink ? 'link' : 'text'}
      {...rest}
    >
      {content}
    </Button>
  )
}
