import { type ComponentProps, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { SubscriptionModal, Typography } from '@/components/shared'
import { Separator, Skeleton } from '@/components/ui'
import { useAuthStore } from '@/stores'
import { cn } from '@/utils'

type Props = {
  isVertical?: boolean
} & ComponentProps<'div'>

export const PersonFollowInfo = ({ isVertical, className, ...rest }: Props) => {
  const { user, isPendingUser } = useAuthStore()

  const [isClickOnFollowers, setIsClickOnFollowers] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState(false)

  const { t } = useTranslation()

  const onToggleModal = () => setIsOpenModal((prev) => !prev)
  const onClickOnFollowers = () => setIsClickOnFollowers(true)
  const onClickOnFollowing = () => setIsClickOnFollowers(false)

  const renderFollowInfo = (translationKey: string, count?: number) => (
    <div className={cn('flex items-center', isVertical && 'flex-col')}>
      {isPendingUser ? (
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
          onClick={onToggleModal}
          className={cn(
            'hover:text-primary/90 text-center duration-200 hover:cursor-pointer',
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

  return (
    <>
      {isVertical ? (
        <div className={cn('flex h-12 gap-4', className)} {...rest}>
          <div onClick={onClickOnFollowers}>
            {renderFollowInfo('followers', user?.followersCount)}
          </div>

          <Separator className="size-10" orientation="vertical" />

          <div onClick={onClickOnFollowing}>
            {renderFollowInfo('following', user?.followingCount)}
          </div>
        </div>
      ) : (
        <div className={cn('flex gap-3', className)} {...rest}>
          <div onClick={onClickOnFollowers}>
            {renderFollowInfo('followers', user?.followersCount)}
          </div>

          <div onClick={onClickOnFollowing}>
            {renderFollowInfo('following', user?.followingCount)}
          </div>
        </div>
      )}

      <SubscriptionModal
        onOpenChange={onToggleModal}
        open={isOpenModal}
        isFollowersTab={isClickOnFollowers}
      />
    </>
  )
}
