import { useTranslation } from 'react-i18next'

import { Typography } from '@/components/shared'

export const MyPosts = () => {
  const { t } = useTranslation()

  return <Typography.Title level={3}>{t('myPosts')}</Typography.Title>
}
