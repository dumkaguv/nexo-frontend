import { Pencil, X } from 'lucide-react'

import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { TipTapEditorPreview, Typography } from '@/components/shared'

import { Button } from '@/components/ui'

import type { ResponseMessageDto } from '@/api'

import type { CreateSendMessageSchema } from '@/features/conversations/zodSchemas'
import type { Dispatch, SetStateAction } from 'react'

type Props = {
  editingMessage?: ResponseMessageDto
  setEditingMessage: Dispatch<SetStateAction<ResponseMessageDto | undefined>>
}

export const ChatEditingMessage = ({
  editingMessage,
  setEditingMessage
}: Props) => {
  const { setValue } = useFormContext<CreateSendMessageSchema>()
  const { t } = useTranslation()

  const onCancelEdit = () => {
    setValue('content', '')
    setEditingMessage(undefined)
  }

  return (
    <div className="flex justify-between gap-3 border-t px-4 py-2">
      <div className="flex gap-3">
        <Pencil size={16} className="mt-0.5" />

        <div className="flex flex-col">
          <Typography.Text className="text-sm font-semibold">
            {t('edit')} {t('message').toLowerCase()}
          </Typography.Text>

          <TipTapEditorPreview content={editingMessage?.content ?? ''} />
        </div>
      </div>

      <Button variant="ghost" onClick={onCancelEdit}>
        <X size={16} />
      </Button>
    </div>
  )
}
