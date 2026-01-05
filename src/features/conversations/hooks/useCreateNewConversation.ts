import { useMutation } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  conversationControllerCreateMutation,
  conversationControllerFindAllInfiniteQueryKey,
  conversationControllerFindAllSuggestionsInfiniteQueryKey,
  type ResponseConversationDto
} from '@/api'
import { paths } from '@/config'
import { useInvalidatePredicateQueries, useQueryUpdate } from '@/hooks'
import { showApiErrors } from '@/utils'

type Props = {
  conversation?: ResponseConversationDto
  isLoading: boolean
}

export const useCreateNewConversation = ({
  conversation,
  isLoading
}: Props) => {
  const { params } = useQueryUpdate()
  const { invalidateQueries } = useInvalidatePredicateQueries()
  const navigate = useNavigate()

  const startedRef = useRef(false)

  const { mutate: createConversation, isPending: isCreatingConversation } =
    useMutation({
      ...conversationControllerCreateMutation(),
      onError: (e) => showApiErrors(e),
      onSuccess: async ({ data: { id } }) => {
        if (!id) {
          return
        }

        await invalidateQueries([
          conversationControllerFindAllSuggestionsInfiniteQueryKey(),
          conversationControllerFindAllInfiniteQueryKey()
        ])

        void navigate(
          { pathname: paths.conversations.byId(id), search: '' },
          { replace: true }
        )
      }
    })

  useEffect(() => {
    if (
      !params.receiverId ||
      conversation?.id ||
      isLoading ||
      isCreatingConversation ||
      startedRef.current
    ) {
      return
    }

    startedRef.current = true

    createConversation({ body: { receiverId: Number(params.receiverId) } })
  }, [
    params.receiverId,
    conversation?.id,
    isLoading,
    isCreatingConversation,
    createConversation
  ])

  return { isCreatingConversation }
}
