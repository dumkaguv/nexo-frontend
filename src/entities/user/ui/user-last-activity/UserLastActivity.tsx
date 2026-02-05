import { useTranslation } from 'react-i18next'

import { Typography, DayLabel } from '@/shared/ui'

import type { ResponseUserDto, ResponseUserProfileDto } from '@/shared/api'

type Props = {
  user: ResponseUserDto | ResponseUserProfileDto
}

export const UserLastActivity = ({ user }: Props) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-wrap items-center gap-1 max-md:leading-tight">
      <Typography.Text className="text-muted-foreground text-xs">
        {t('lastActivity')}:
      </Typography.Text>

      <DayLabel
        date={user.lastActivityAt}
        text={t('todayAt').toLowerCase()}
        showIcon={false}
        className="text-muted-foreground text-xs"
      />
    </div>
  )
}
