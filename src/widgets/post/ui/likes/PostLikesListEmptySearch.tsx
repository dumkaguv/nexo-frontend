import { SearchX } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from '@/shared/ui/shadcn'

export const PostLikesListEmptySearch = () => {
  const { t } = useTranslation()

  return (
    <Empty className="p-5 md:p-7">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchX />
        </EmptyMedia>
        <EmptyTitle>{t('noResultsFound')}</EmptyTitle>
        <EmptyDescription>{t('tryToTypeAnythingElse')}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
