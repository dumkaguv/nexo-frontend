import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

type Props = {
  titleKey: string
  accountTextKey: string
  url: string
  urlTextKey: string
}

export const FormHeader = ({
  titleKey,
  url,
  accountTextKey,
  urlTextKey
}: Props) => {
  const { t } = useTranslation()

  return (
    <>
      <h1 className="mb-2 text-center text-4xl font-bold">{t(titleKey)}</h1>
      <p className="mb-5">
        {t(accountTextKey)}{' '}
        <Link
          to={url}
          className="text-primary underline-offset-3 hover:underline"
        >
          {t(urlTextKey)}
        </Link>
      </p>
    </>
  )
}
