import { Edit, Trash } from 'lucide-react'

import { useState, type Dispatch, type SetStateAction } from 'react'

import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { ButtonMoreActions, ModalConfirm } from '@/components/shared'
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator
} from '@/components/ui'

import { CLIENT_TO_SERVER_EVENTS } from '@/config'
import { useWebSocket } from '@/hooks'

import type { ResponseMessageDto } from '@/api'
import type { CreateSendMessageSchema } from '@/features/conversations/zodSchemas'

type Props = {
  message: ResponseMessageDto
  setEditingMessage: Dispatch<SetStateAction<ResponseMessageDto | undefined>>
}

export const ChatMessagesListItemMoreActions = ({
  message,
  setEditingMessage
}: Props) => {
  const [isOpenPopover, setIsOpenPopover] = useState(false)

  const { setValue } = useFormContext<CreateSendMessageSchema>()
  const { emit } = useWebSocket()
  const { t } = useTranslation()

  const onDelete = () => {
    setIsOpenPopover(false)

    emit(CLIENT_TO_SERVER_EVENTS.message.delete, {
      id: message.id
    })
  }

  const onEdit = () => {
    setIsOpenPopover(false)
    setEditingMessage(message)

    setValue('content', message.content ?? '')
  }

  return (
    <Popover open={isOpenPopover} onOpenChange={setIsOpenPopover}>
      <PopoverTrigger asChild>
        <ButtonMoreActions className="hover:bg-secondary/50 self-center opacity-0 transition-opacity group-hover:opacity-50" />
      </PopoverTrigger>

      <PopoverContent
        onCloseAutoFocus={(e) => e.preventDefault()}
        className="w-fit px-1 py-2 text-sm"
      >
        <div className="flex flex-col gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onEdit}
            className="w-full justify-start"
          >
            <Edit /> {t('edit')}
          </Button>

          <Separator className="relative right-1 w-[calc(100%+8px)]!" />

          <ModalConfirm onOk={onDelete}>
            <Button
              variant="destructive"
              size="sm"
              className="bg-destructive/90 justify-start"
            >
              <Trash /> {t('delete')}
            </Button>
          </ModalConfirm>
        </div>
      </PopoverContent>
    </Popover>
  )
}
