import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Typography } from '@/shared/ui'

type Props = {
  titleKey: string
  accountTextKey: string
  url: string
  urlTextKey: string
}

export const HeaderForm = ({
  titleKey,
  url,
  accountTextKey,
  urlTextKey
}: Props) => {
  const { t } = useTranslation()

  return (
    <>
      <Typography.Title
        level={1}
        className="mb-2 text-center text-4xl font-bold"
      >
        {t(titleKey)}
      </Typography.Title>

      <Typography.Paragraph className="mb-5">
        {t(accountTextKey)}{' '}
        <Link
          to={url}
          className="text-primary underline-offset-3 hover:underline"
        >
          {t(urlTextKey)}
        </Link>
      </Typography.Paragraph>
    </>
  )
}
