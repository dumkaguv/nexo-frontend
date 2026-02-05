import { Send } from 'lucide-react'

import { useTranslation } from 'react-i18next'

import { Card, Typography } from '@/shared/ui'

export const ConversationNotSelected = () => {
  const { t } = useTranslation()

  return (
    <Card className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
      <div className="relative mt-5 mr-3 w-fit">
        <Send size={64} className="rotate-15" />
        <div className="absolute top-1/2 left-1/2 size-24 -translate-x-[45%] -translate-y-1/2 rounded-full border-2 border-black dark:border-white" />
      </div>

      <div className="flex flex-col gap-2">
        <Typography.Text>{t('yourMessages')}</Typography.Text>
        <Typography.Text>{t('sendMessagesAndPhotos')}</Typography.Text>
      </div>
    </Card>
  )
}
