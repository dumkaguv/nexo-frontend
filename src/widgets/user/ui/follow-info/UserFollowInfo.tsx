import { type ComponentProps, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { cn } from '@/shared/lib'
import { Typography } from '@/shared/ui'
import { Separator, Skeleton } from '@/shared/ui/shadcn'

import { SubscriptionModal } from '@/widgets/subscription'

import type { ResponseUserDto } from '@/shared/api'

type Props = {
  user?: ResponseUserDto
  isLoading?: boolean
  isVertical?: boolean
} & ComponentProps<'div'>

export const UserFollowInfo = ({
  user,
  isLoading,
  isVertical,
  className,
  ...rest
}: Props) => {
  const [isClickOnFollowers, setIsClickOnFollowers] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState(false)

  const { t } = useTranslation()

  const openModalFollowers = () => {
    setIsClickOnFollowers(true)
    setIsOpenModal(true)
  }

  const openModalFollowing = () => {
    setIsClickOnFollowers(false)
    setIsOpenModal(true)
  }

  const renderFollowInfo = (translationKey: string, count?: number) => (
    <div className={cn('flex items-center', isVertical && 'flex-col')}>
      {isLoading ? (
        <>
          <Skeleton
            className={cn('h-5 w-8 rounded', !isVertical && 'mr-1.5')}
          />
          <Typography.Paragraph className="text-muted-foreground">
            {t(translationKey)}
          </Typography.Paragraph>
        </>
      ) : (
        <div
          className={cn(
            'text-center duration-200',
            !isVertical && 'flex gap-1.5'
          )}
        >
          <Typography.Text className="font-bold">{count ?? 0}</Typography.Text>
          <Typography.Paragraph className="text-muted-foreground">
            {t(translationKey)}
          </Typography.Paragraph>
        </div>
      )}
    </div>
  )

  const commonBtnClass = 'hover:text-primary/90 cursor-pointer duration-200'

  return (
    <>
      {isVertical ? (
        <div className={cn('flex h-12 gap-4', className)} {...rest}>
          <button
            type="button"
            onClick={openModalFollowers}
            disabled={isLoading}
            className={commonBtnClass}
          >
            {renderFollowInfo('followers', user?.followersCount)}
          </button>

          <Separator className="size-10" orientation="vertical" />

          <button
            type="button"
            onClick={openModalFollowing}
            disabled={isLoading}
            className={commonBtnClass}
          >
            {renderFollowInfo('following', user?.followingCount)}
          </button>
        </div>
      ) : (
        <div className={cn('flex gap-3', className)} {...rest}>
          <button
            type="button"
            onClick={openModalFollowers}
            disabled={isLoading}
            className={commonBtnClass}
          >
            {renderFollowInfo('followers', user?.followersCount)}
          </button>

          <Separator orientation="vertical" className="min-h-6" />

          <button
            type="button"
            onClick={openModalFollowing}
            disabled={isLoading}
            className={commonBtnClass}
          >
            {renderFollowInfo('following', user?.followingCount)}
          </button>
        </div>
      )}

      <SubscriptionModal
        user={user}
        open={isOpenModal}
        onOpenChange={(open) => setIsOpenModal(open)}
        isFollowersTab={isClickOnFollowers}
      />
    </>
  )
}
