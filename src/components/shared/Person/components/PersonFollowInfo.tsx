import { useTranslation } from 'react-i18next'

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

  return (
    <div className={cn('flex h-12 gap-4', className)} {...rest}>
      <div className="flex flex-col items-center">
        {isLoading ? (
          <Skeleton className="h-5 w-8 rounded" />
        ) : (
          <span className="font-bold">{followersCount ?? 0}</span>
        )}
        <p className="text-muted-foreground">{t('followers')}</p>
      </div>

      <Separator className="h-10 w-10" orientation="vertical" />

      <div className="flex flex-col items-center">
        {isLoading ? (
          <Skeleton className="h-5 w-8 rounded" />
        ) : (
          <span className="font-bold">{followingCount ?? 0}</span>
        )}
        <p className="text-muted-foreground">{t('following')}</p>
      </div>
    </div>
  )
}
