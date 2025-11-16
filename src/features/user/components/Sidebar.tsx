import { Calendar, CalendarCheck, Mail } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { DayLabel, Typography } from '@/components/shared'

import type { ResponseUserDto } from '@/api'

type Props = {
  userData?: ResponseUserDto
}

export const Sidebar = ({ userData }: Props) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-3.5">
      <Typography.Title level={3}>{t('about')}</Typography.Title>

      {userData?.profile.biography && (
        <Typography.Paragraph isMuted={false}>
          {userData?.profile.biography}
        </Typography.Paragraph>
      )}

      {userData?.email && (
        <div className="flex items-center gap-2">
          <Mail size={18} />
          <div className="flex items-center gap-1">
            <Typography.Text>{t('auth.email')}:</Typography.Text>
            <Typography.Text className="font-bold">
              {userData.email}
            </Typography.Text>
          </div>
        </div>
      )}

      {userData?.profile.birthDay && (
        <div className="flex items-center gap-2">
          <Calendar size={18} />
          <div className="flex items-center gap-1">
            <Typography.Text>{t('birthDay')}:</Typography.Text>
            <DayLabel
              date={userData.profile.birthDay}
              showIcon={false}
              className="text-base font-bold"
            />
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        <CalendarCheck size={18} />
        <Typography.Text>{t('joinedOn')}</Typography.Text>
        <DayLabel
          date={userData?.createdAt ?? ''}
          showIcon={false}
          className="text-base font-bold"
        />
      </div>
    </div>
  )
}
