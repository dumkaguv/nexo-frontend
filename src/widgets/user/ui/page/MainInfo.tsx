import { Edit, Info, UserCheck, UserMinus } from 'lucide-react'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Link } from 'react-router-dom'

import { useAuthStore } from '@/entities/session'
import { UserAvatar, UserFullName, UserNickname } from '@/entities/user'
import { useToggleSubscription } from '@/features/subscription'
import {
  userControllerFindOneQueryKey,
  type ResponseUserDto
} from '@/shared/api'
import { Breakpoints, paths } from '@/shared/config'

import { useMaxWidth } from '@/shared/hooks'
import { cn } from '@/shared/lib'
import { Button } from '@/shared/ui/shadcn'

import { SidebarModal } from './SidebarModal'

import { UserFollowInfo } from '../follow-info'

type Props = {
  userData?: ResponseUserDto
  isLoading?: boolean
}

export const MainInfo = ({ userData, isLoading }: Props) => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const { user } = useAuthStore()

  const { t } = useTranslation()
  const isTablet = useMaxWidth(Breakpoints.lg)
  const isMobile = useMaxWidth(Breakpoints.md)

  const { follow, unfollow, isPendingFollow, isPendingUnfollow } =
    useToggleSubscription({
      queryKeys: userData?.id
        ? [userControllerFindOneQueryKey({ path: { id: String(userData.id) } })]
        : []
    })

  const onToggleModal = () => setIsOpenModal((prev) => !prev)
  const onToggleFollow = async () => {
    if (!userData) {
      return
    }

    const path = { id: String(userData.id) }

    if (userData.isFollowing) {
      await unfollow({ path })
    } else {
      await follow({ path })
    }
  }

  const isMe = Number(user?.id) === Number(userData?.id)
  let avatarSize = 96

  if (isTablet) {
    avatarSize = 80
  }

  if (isMobile) {
    avatarSize = 64
  }

  const isLoadingButtonState = isPendingFollow || isPendingUnfollow

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex w-full justify-between gap-4 max-md:gap-2">
          <div className="flex items-center justify-between gap-4 max-lg:gap-2.5 max-md:gap-2">
            <UserAvatar
              user={userData}
              size={avatarSize}
              className={cn(
                'size-24',
                isTablet && 'size-20',
                isMobile && 'size-16'
              )}
            />

            <div className="flex flex-col items-start gap-1 max-lg:gap-0">
              <div className="flex items-center">
                <UserFullName
                  name={userData?.profile.fullName}
                  className="text-2xl max-lg:text-xl"
                />
                {isTablet && (
                  <Button
                    size="icon"
                    variant="text"
                    onClick={onToggleModal}
                    className="size-7"
                  >
                    <Info />
                  </Button>
                )}
              </div>

              <UserNickname
                nickname={userData?.username}
                className="cursor-auto text-base"
              />

              <UserFollowInfo
                user={userData}
                isLoading={isLoading}
                isVertical={false}
              />
            </div>
          </div>

          {isMe && (
            <Button asChild className={cn(isMobile && 'size-7')}>
              <Link to={paths.settings.account}>
                <Edit />
                {!isMobile && t('edit')}
              </Link>
            </Button>
          )}

          {!isMe && userData && (
            <Button
              variant={userData.isFollowing ? 'secondary' : 'default'}
              onClick={onToggleFollow}
              loading={isLoadingButtonState}
              showChildrenWhenLoading={!isMobile}
            >
              {userData.isFollowing ? <UserMinus /> : <UserCheck />}
              {!isMobile && t(userData.isFollowing ? 'unfollow' : 'follow')}
            </Button>
          )}
        </div>
      </div>

      <SidebarModal
        userData={userData}
        open={isOpenModal}
        onOpenChange={setIsOpenModal}
      />
    </>
  )
}
