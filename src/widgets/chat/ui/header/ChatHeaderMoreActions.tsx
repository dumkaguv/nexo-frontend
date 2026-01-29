import { MoreVertical, Trash } from 'lucide-react'
import { useState } from 'react'

import { useTranslation } from 'react-i18next'

import { useParams } from 'react-router-dom'

import { toast } from 'sonner'

import { useDeleteConversation } from '@/features/conversation'

import { ButtonMoreActions, ModalConfirm } from '@/shared/ui'
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/shared/ui/shadcn'

export const ChatHeaderMoreActions = () => {
  const [isOpenPopover, setIsOpenPopover] = useState(false)

  const { t } = useTranslation()
  const { id } = useParams()

  const { deleteConversation, isPending } = useDeleteConversation()

  const onDelete = () => {
    if (!id) {
      toast.error(t('somethingWentWrong'))

      return
    }

    void deleteConversation({ path: { id: String(id) } })
  }

  return (
    <Popover open={isOpenPopover} onOpenChange={setIsOpenPopover}>
      <PopoverTrigger asChild>
        <ButtonMoreActions icon={<MoreVertical />} />
      </PopoverTrigger>

      <PopoverContent className="w-fit px-1 py-2 text-sm">
        <ModalConfirm onOk={onDelete} okButtonProps={{ loading: isPending }}>
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
