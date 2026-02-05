import { MessageSquareText } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from '@/shared/ui/shadcn'

export const ConversationEmpty = () => {
  const { t } = useTranslation()

  return (
    <Empty className="p-3.5 lg:p-7">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <MessageSquareText />
        </EmptyMedia>
        <EmptyTitle>{t('noActiveChats')}</EmptyTitle>
        <EmptyDescription>{t('noActiveChatsDescription')}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
