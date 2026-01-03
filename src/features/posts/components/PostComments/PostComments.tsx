import { MessageCircle } from 'lucide-react'

import { useTranslation } from 'react-i18next'

import { Typography } from '@/components/shared'
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui'

type Props = {
  commentsCount: number
  onClick: () => void
}

export const PostComments = ({ commentsCount, onClick }: Props) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-5">
      <Tooltip>
        <TooltipContent>{t('comment')}</TooltipContent>
        <TooltipTrigger asChild>
          <Button
            variant="text"
            onClick={onClick}
            className="flex h-5 w-fit items-center justify-start gap-1.5 p-0"
          >
            <MessageCircle />
            <Typography.Text className="text-sm">
              {commentsCount}
            </Typography.Text>
          </Button>
        </TooltipTrigger>
      </Tooltip>
    </div>
  )
}
