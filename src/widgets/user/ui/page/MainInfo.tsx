import { Edit } from 'lucide-react'

import { useTranslation } from 'react-i18next'

import { Link } from 'react-router-dom'

import { useAuthStore } from '@/entities/session'
import { UserAvatar, UserFullName, UserNickname } from '@/entities/user'
import { paths } from '@/shared/config'

import { Button } from '@/shared/ui/shadcn'

import { UserFollowInfo } from '../follow-info'

import type { ResponseUserDto } from '@/shared/api'

type Props = {
  userData?: ResponseUserDto
  isLoading?: boolean
}

export const MainInfo = ({ userData, isLoading }: Props) => {
  const { user } = useAuthStore()

  const { t } = useTranslation()

  const isMe = Number(user?.id) === Number(userData?.id)

  return (
    <div className="flex flex-col gap-5">
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex items-center justify-between gap-4">
          <UserAvatar user={userData} size={96} className="size-24" />

          <div className="flex flex-col items-start gap-1">
            <UserFullName
              name={userData?.profile.fullName}
              className="text-2xl"
            />
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
          <Button asChild>
            <Link to={paths.settings.account}>
              <Edit />
              {t('edit')}
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}
