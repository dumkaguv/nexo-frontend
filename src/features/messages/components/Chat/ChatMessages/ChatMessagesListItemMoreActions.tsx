import { Edit, Trash } from 'lucide-react'
import { useState } from 'react'

import { useTranslation } from 'react-i18next'

import { ButtonMoreActions, ModalConfirm } from '@/components/shared'
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator
} from '@/components/ui'

export const ChatMessagesListItemMoreActions = () => {
  const [isOpenPopover, setIsOpenPopover] = useState(false)

  const { t } = useTranslation()

  const onDelete = () => undefined
  const onEdit = () => undefined

  return (
    <Popover open={isOpenPopover} onOpenChange={setIsOpenPopover}>
      <PopoverTrigger asChild>
        <ButtonMoreActions className="hover:bg-secondary/50 self-center opacity-0 transition-opacity group-hover:opacity-100" />
      </PopoverTrigger>

      <PopoverContent className="w-fit px-1 py-2 text-sm">
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

          <ModalConfirm
            onOk={onDelete}
            //okButtonProps={{ loading: isPending }}
          >
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
