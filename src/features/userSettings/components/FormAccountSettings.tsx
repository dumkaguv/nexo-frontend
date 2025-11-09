import { useTranslation } from 'react-i18next'

import { Typography } from '@/components/shared'

import { FormChangePassword } from './FormChangePassword'
import { FormMainSettings } from './FormMainSettings'
import { FormUploadAvatar } from './FormUploadAvatar'

export const FormAccountSettings = () => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-4">
      <Typography.Title level={1} className="text-xl font-bold">
        {t('accountSettings')}
      </Typography.Title>

      <FormMainSettings />
      <FormUploadAvatar />
      <FormChangePassword />
    </div>
  )
}
