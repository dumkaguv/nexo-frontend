import { MoreVertical, Trash } from 'lucide-react'
import { useState } from 'react'

import { useTranslation } from 'react-i18next'

import { ButtonMoreActions, ModalConfirm } from '@/components/shared'
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui'

export const ChatHeaderMoreActions = () => {
  const [isOpenPopover, setIsOpenPopover] = useState(false)

  const { t } = useTranslation()

  const onDelete = () => undefined

  return (
    <Popover open={isOpenPopover} onOpenChange={setIsOpenPopover}>
      <PopoverTrigger asChild>
        <ButtonMoreActions icon={<MoreVertical />} />
      </PopoverTrigger>

      <PopoverContent className="w-fit px-1 py-2 text-sm">
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
      </PopoverContent>
    </Popover>
  )
}
