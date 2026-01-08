import { useTranslation } from 'react-i18next'

import { Typography, DayLabel } from '@/components/shared'

import type { ResponseUserDto, ResponseUserProfileDto } from '@/api'

type Props = {
  user: ResponseUserDto | ResponseUserProfileDto
}

export const PersonLastActivity = ({ user }: Props) => {
  const { t } = useTranslation()

  return (
    <div className="flex items-center gap-1">
      <Typography.Text className="text-muted-foreground text-xs">
        {t('lastActivity')}:
      </Typography.Text>

      <DayLabel
        date={user.lastActivity}
        text={t('todayAt').toLowerCase()}
        showIcon={false}
        className="text-muted-foreground text-xs"
      />
    </div>
  )
}
