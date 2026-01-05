import { MessageSquareText } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from '@/components/ui'

export const ChatMessagesEmpty = () => {
  const { t } = useTranslation()

  return (
    <Empty className="mx-6 my-5 flex-1">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <MessageSquareText />
        </EmptyMedia>
        <EmptyTitle>{t('noMessagesYet')}</EmptyTitle>
        <EmptyDescription>{t('noMessagesYetDescription')}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
