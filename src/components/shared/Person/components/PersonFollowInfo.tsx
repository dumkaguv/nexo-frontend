import { useTranslation } from 'react-i18next'

import { Typography } from '@/components/shared'
import { Separator, Skeleton } from '@/components/ui'
import { cn } from '@/utils'

import type { ComponentProps } from 'react'

type Props = ComponentProps<'div'> & {
  followersCount?: number
  followingCount?: number
  isLoading?: boolean
}

export const PersonFollowInfo = ({
  followersCount,
  followingCount,
  className,
  isLoading = false,
  ...rest
}: Props) => {
  const { t } = useTranslation()

  const renderFollowInfo = (translationKey: string, count?: number) => (
    <div className="flex flex-col items-center">
      {isLoading ? (
        <Skeleton className="h-5 w-8 rounded" />
      ) : (
        <Typography.Text className="font-bold">{count ?? 0}</Typography.Text>
      )}
      <Typography.Paragraph className="text-muted-foreground">
        {t(translationKey)}
      </Typography.Paragraph>
    </div>
  )

  return (
    <div className={cn('flex h-12 gap-4', className)} {...rest}>
      {renderFollowInfo('followers', followersCount)}

      <Separator className="h-10 w-10" orientation="vertical" />

      {renderFollowInfo('following', followingCount)}
    </div>
  )
}
