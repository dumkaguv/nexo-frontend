import dayjs from 'dayjs'
import { Calendar, CalendarCheck, Mail } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { DayLabel, TipTapEditorPreview, Typography } from '@/components/shared'

import type { ResponseUserDto } from '@/api'

type Props = {
  userData?: ResponseUserDto
}

export const Sidebar = ({ userData }: Props) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-2.5">
      <Typography.Title level={3}>{t('about')}</Typography.Title>

      {userData?.profile.biography && (
        <TipTapEditorPreview content={userData.profile.biography} />
      )}

      {userData?.email && (
        <div className="flex items-center gap-2">
          <Mail size={18} />
          <div className="flex items-center gap-1">
            <Typography.Text className="text-sm">
              {t('auth.email')}:
            </Typography.Text>
            <Typography.Text className="text-sm font-bold">
              {userData.email}
            </Typography.Text>
          </div>
        </div>
      )}

      {userData?.profile.birthDay && (
        <div className="flex items-center gap-2">
          <Calendar size={18} />
          <div className="flex items-center gap-1">
            <Typography.Text className="text-sm">
              {t('birthDay')}:
            </Typography.Text>
            <Typography.Text className="text-sm font-bold">
              {dayjs(userData.profile.birthDay).format('D MMMM YYYY')}
            </Typography.Text>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        <CalendarCheck size={18} />
        <Typography.Text className="text-sm">{t('joinedOn')}</Typography.Text>
        <DayLabel
          date={userData?.createdAt ?? ''}
          showIcon={false}
          className="text-sm font-bold"
        />
      </div>
    </div>
  )
}
