import { Edit, Trash } from 'lucide-react'

import { useState, type Dispatch, type SetStateAction } from 'react'

import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { useWebSocket } from '@/shared/hooks'
import { CLIENT_TO_SERVER_EVENTS } from '@/shared/lib/api/socket'
import { ButtonMoreActions, ModalConfirm } from '@/shared/ui'
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator
} from '@/shared/ui/shadcn'

import type { ResponseMessageDto } from '@/shared/api'
import type { SendMessageSchema } from '@/widgets/chat/contracts'

type Props = {
  message: ResponseMessageDto
  setEditingMessage: Dispatch<SetStateAction<ResponseMessageDto | undefined>>
}

export const ChatMessagesListItemMoreActions = ({
  message,
  setEditingMessage
}: Props) => {
  const [isOpenPopover, setIsOpenPopover] = useState(false)

  const { setValue } = useFormContext<SendMessageSchema>()
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
        <ButtonMoreActions className="hover:bg-secondary/50 focus-within:bg-secondary/50 self-center opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-50 max-lg:opacity-20" />
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
