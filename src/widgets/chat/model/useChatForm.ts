import { zodResolver } from '@hookform/resolvers/zod'

import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { useTranslation } from 'react-i18next'

import { useCreateNewConversation } from '@/features/conversation'
import {
  uploadControllerUploadMutation,
  type PostWsMessagesMessageSendData,
  type PostWsMessagesMessageUpdateData,
  type ResponseConversationDto,
  type ResponseMessageDto,
  type ResponseUserDto
} from '@/shared/api'

import { useWebSocket } from '@/shared/hooks'

import { showApiErrors } from '@/shared/lib'
import { CLIENT_TO_SERVER_EVENTS } from '@/shared/lib/api/socket'

import { createSendMessageSchema, type SendMessageSchema } from '../contracts'

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

  const form = useForm<SendMessageSchema>({
    resolver: zodResolver(schema),
    defaultValues: { content: '', files: [] }
  })

  const { mutateAsync: upload, isPending } = useMutation({
    ...uploadControllerUploadMutation(),
    onError: (e) => showApiErrors(e)
  })

  const onSubmit = async ({ content, files }: SendMessageSchema) => {
    setEditingMessage(undefined)

    const uploadResponse = await Promise.all(
      files?.map((file) => upload({ body: { file } })) ?? []
    )
    const fileIds = uploadResponse
      .map(({ data }) => data?.id)
      .filter((id): id is number => !!id)

    const sendMessage = (conversation: ResponseConversationDto) => {
      const payload: PostWsMessagesMessageSendData['body'] = {
        receiverId: conversation.receiver.id,
        conversationId: conversation.id,
        content,
        fileIds
      }

      emit(CLIENT_TO_SERVER_EVENTS.message.send, payload)
    }

    if (conversation?.id) {
      if (editingMessage) {
        const payload: PostWsMessagesMessageUpdateData['body'] = {
          id: editingMessage.id,
          content
        }

        emit(CLIENT_TO_SERVER_EVENTS.message.update, payload)
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
