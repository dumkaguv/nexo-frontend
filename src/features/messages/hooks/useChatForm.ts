import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useTranslation } from 'react-i18next'

import {
  createSendMessageSchema,
  type CreateSendMessageSchema
} from '@/features/messages/zodSchemas'

import { useWebSocket } from '@/hooks'

import type { ResponseConversationDto } from '@/api'

type Props = {
  conversation?: ResponseConversationDto
}

export const useChatForm = ({ conversation }: Props) => {
  const { t } = useTranslation()
  const { emit } = useWebSocket()

  const schema = createSendMessageSchema(t)

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateSendMessageSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      content: ''
    }
  })

  const onSubmit = ({ content }: CreateSendMessageSchema) => {
    emit('message:send', {
      receiverId: Number(conversation?.receiver.id),
      conversationId: Number(conversation?.id),
      content
    })

    requestAnimationFrame(() =>
      reset(
        { content: '' },
        {
          keepErrors: false,
          keepDirty: false,
          keepTouched: false,
          keepIsSubmitted: false,
          keepDefaultValues: false
        }
      )
    )
  }

  return {
    onSubmit: handleSubmit(onSubmit),
    control,
    errors
  }
}
