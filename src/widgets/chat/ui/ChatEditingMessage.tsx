import { Pencil, X } from 'lucide-react'

import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { TipTapEditorPreview, Typography } from '@/shared/ui'
import { Button } from '@/shared/ui/shadcn'

import type { SendMessageSchema } from '../contracts'

import type { ResponseMessageDto } from '@/shared/api'

import type { Dispatch, SetStateAction } from 'react'

type Props = {
  editingMessage?: ResponseMessageDto
  setEditingMessage: Dispatch<SetStateAction<ResponseMessageDto | undefined>>
}

export const ChatEditingMessage = ({
  editingMessage,
  setEditingMessage
}: Props) => {
  const { setValue } = useFormContext<SendMessageSchema>()
  const { t } = useTranslation()

  const onCancelEdit = () => {
    setValue('content', '')
    setEditingMessage(undefined)
  }

  return (
    <div className="flex justify-between gap-3 border-t px-4 py-2 max-lg:px-3">
      <div className="flex gap-3">
        <Pencil size={16} className="mt-0.5" />

        <div className="flex flex-col">
          <Typography.Text className="text-sm font-semibold">
            {t('edit')} {t('message').toLowerCase()}
          </Typography.Text>

          <TipTapEditorPreview content={editingMessage?.content ?? ''} />
        </div>
      </div>

      <Button variant="ghost" onClick={onCancelEdit} className="max-lg:size-7">
        <X size={16} />
      </Button>
    </div>
  )
}
