import { Edit } from 'lucide-react'

import { useTranslation } from 'react-i18next'

import { Link } from 'react-router-dom'

import { AvatarWithColorInitials } from '@/components/shared'
import * as Person from '@/components/shared/Person'
import { Button } from '@/components/ui'
import { paths } from '@/config'

import type { ResponseUserDto } from '@/api'

type Props = {
  userData?: ResponseUserDto
  isMe?: boolean
}

export const MainInfo = ({ userData, isMe }: Props) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-5">
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex items-center justify-between gap-4">
          <AvatarWithColorInitials
            user={userData}
            size={96}
            className="size-24"
          />
          <div className="flex flex-col items-start gap-1">
            <Person.Name
              name={userData?.profile.fullName}
              className="text-2xl"
            />
            <Person.Nickname
              nickname={userData?.username}
              className="cursor-auto text-base"
            />
            <Person.FollowInfo isVertical={false} />
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
