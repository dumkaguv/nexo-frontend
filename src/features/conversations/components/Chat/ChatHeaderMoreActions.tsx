import { useMutation } from '@tanstack/react-query'
import { MoreVertical, Trash } from 'lucide-react'
import { useState } from 'react'

import { useTranslation } from 'react-i18next'

import { useNavigate, useParams } from 'react-router-dom'

import { toast } from 'sonner'

import {
  conversationControllerFindAllInfiniteQueryKey,
  conversationControllerFindAllSuggestionsInfiniteQueryKey,
  conversationControllerRemoveMutation
} from '@/api'
import { ButtonMoreActions, ModalConfirm } from '@/components/shared'
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui'
import { paths } from '@/config'
import { useInvalidatePredicateQueries } from '@/hooks'
import { showApiErrors } from '@/utils'

export const ChatHeaderMoreActions = () => {
  const [isOpenPopover, setIsOpenPopover] = useState(false)

  const { t } = useTranslation()
  const { id } = useParams()
  const navigate = useNavigate()
  const { invalidateQueries } = useInvalidatePredicateQueries()

  const { mutate, isPending } = useMutation({
    ...conversationControllerRemoveMutation(),
    onSuccess: () => {
      void invalidateQueries([
        conversationControllerFindAllInfiniteQueryKey(),
        conversationControllerFindAllSuggestionsInfiniteQueryKey()
      ])
      void navigate(paths.conversations.root)
    },
    onError: (e) => showApiErrors(e)
  })

  const onDelete = () => {
    if (!id) {
      toast.error(t('somethingWentWrong'))

      return
    }

    mutate({ path: { id: String(id) } })
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
