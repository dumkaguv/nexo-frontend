import { Link } from 'react-router-dom'

import { paths } from '@/shared/config'
import { cn } from '@/shared/lib'
import { Typography } from '@/shared/ui'
import { Button, Skeleton } from '@/shared/ui/shadcn'

import type { ComponentProps, JSX } from 'react'

type Props = {
  nickname?: string
  userId?: number
  asLink?: boolean
  isLoading?: boolean
} & ComponentProps<'button'>

export const UserNickname = ({
  nickname,
  asLink,
  userId,
  isLoading,
  className,
  ...rest
}: Props) => {
  let content: JSX.Element

  if (isLoading) {
    content = <Skeleton className="mt-1.5 h-4 w-14" />
  } else if (asLink) {
    content = <Link to={paths.user.byId(Number(userId))}>@{nickname}</Link>
  } else {
    content = (
      <Typography.Text className="text-muted-foreground">
        {nickname}
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
