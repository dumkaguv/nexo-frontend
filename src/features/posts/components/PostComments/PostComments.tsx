import { MessageCircle } from 'lucide-react'

import { useTranslation } from 'react-i18next'

import { Typography } from '@/components/shared'
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui'

const { Text } = Typography

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
          <div
            onClick={onClick}
            className="flex cursor-pointer items-center gap-1.5"
          >
            <Button
              variant="text"
              size="icon"
              className="h-5 w-fit justify-start"
            >
              <MessageCircle />
            </Button>
            <Text className="text-sm">{commentsCount}</Text>
          </div>
        </TooltipTrigger>
      </Tooltip>
    </div>
  )
}
