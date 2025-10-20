import { useTranslation } from 'react-i18next'

import { Typography } from '@/components/shared'
import { Separator, Skeleton } from '@/components/ui'
import { cn } from '@/utils'

import type { ComponentProps } from 'react'

const { Paragraph, Text } = Typography

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

  return (
    <div className={cn('flex h-12 gap-4', className)} {...rest}>
      <div className="flex flex-col items-center">
        {isLoading ? (
          <Skeleton className="h-5 w-8 rounded" />
        ) : (
          <Text className="font-bold">{followersCount ?? 0}</Text>
        )}
        <Paragraph className="text-muted-foreground">
          {t('followers')}
        </Paragraph>
      </div>

      <Separator className="h-10 w-10" orientation="vertical" />

      <div className="flex flex-col items-center">
        {isLoading ? (
          <Skeleton className="h-5 w-8 rounded" />
        ) : (
          <Text className="font-bold">{followingCount ?? 0}</Text>
        )}
        <Paragraph className="text-muted-foreground">
          {t('following')}
        </Paragraph>
      </div>
    </div>
  )
}
