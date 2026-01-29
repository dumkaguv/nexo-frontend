import { useTranslation } from 'react-i18next'

import {
  ChangePasswordForm,
  MainSettingsForm,
  UploadAvatarForm
} from '@/features/user'
import { Typography } from '@/shared/ui'

export const UserSettingsForm = () => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-4">
      <Typography.Title level={1} className="text-xl font-bold">
        {t('accountSettings')}
      </Typography.Title>

      <MainSettingsForm />
      <UploadAvatarForm />
      <ChangePasswordForm />
    </div>
  )
}
