import { BookMinus } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import {
  EmptyDescription,
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from '@/shared/ui/shadcn'

export const HeaderSearchEmpty = () => {
  const { t } = useTranslation()

  return (
    <Empty className="p-2 md:p-4">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <BookMinus />
        </EmptyMedia>

        <EmptyTitle>{t('noResultsFound')}</EmptyTitle>
        <EmptyDescription>{t('tryToTypeAnythingElse')}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
