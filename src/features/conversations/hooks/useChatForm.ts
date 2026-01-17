import { zodResolver } from '@hookform/resolvers/zod'

import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { useTranslation } from 'react-i18next'

import {
  uploadControllerUploadMutation,
  type ResponseConversationDto,
  type ResponseMessageDto,
  type ResponseUserDto
} from '@/api'
import { CLIENT_TO_SERVER_EVENTS } from '@/config'
import {
  createSendMessageSchema,
  type CreateSendMessageSchema
} from '@/features/conversations/zodSchemas'

import { useWebSocket } from '@/hooks'

import { showApiErrors } from '@/utils'

import { useCreateNewConversation } from './useCreateNewConversation'

import type { Dispatch, SetStateAction } from 'react'

type Props = {
  conversation?: ResponseConversationDto
  user?: ResponseUserDto
  onSubmitCb?: () => void
  editingMessage?: ResponseMessageDto
  setEditingMessage: Dispatch<SetStateAction<ResponseMessageDto | undefined>>
}

export const useChatForm = ({
  conversation,
  user,
  onSubmitCb,
  editingMessage,
  setEditingMessage
}: Props) => {
  const { t } = useTranslation()
  const { emit } = useWebSocket()

  const { createConversation } = useCreateNewConversation()

  const schema = createSendMessageSchema(t)

  const form = useForm<CreateSendMessageSchema>({
    resolver: zodResolver(schema),
    defaultValues: { content: '', files: [] }
  })

  const { mutateAsync: upload, isPending } = useMutation({
    ...uploadControllerUploadMutation(),
    onError: (e) => showApiErrors(e)
  })

  const onSubmit = async ({ content, files }: CreateSendMessageSchema) => {
    setEditingMessage(undefined)

    const uploadResponse = await Promise.all(
      files?.map((file) => upload({ body: { file } })) ?? []
    )
    const fileIds = uploadResponse
      .map(({ data }) => data?.id)
      .filter((id): id is number => !!id)

    const sendMessage = (conversation: ResponseConversationDto) =>
      emit(CLIENT_TO_SERVER_EVENTS.message.send, {
        receiverId: conversation.receiver.id,
        conversationId: conversation.id,
        content,
        fileIds
      })

    if (conversation?.id) {
      if (editingMessage) {
        emit(CLIENT_TO_SERVER_EVENTS.message.update, {
          id: editingMessage.id,
          content
        })
      } else {
        sendMessage(conversation)
      }
    } else {
      if (!user?.id) {
        return
      }

      const conversation = await createConversation({
        body: { receiverId: user.id }
      })

      if (conversation?.data?.id) {
        sendMessage(conversation.data)
      }
    }

    onSubmitCb?.()

    requestAnimationFrame(() =>
      form.reset(
        { content: '', files: [] },
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
    ...form,
    onSubmit: form.handleSubmit(onSubmit),
    isPendingUpload: isPending
  }
}
