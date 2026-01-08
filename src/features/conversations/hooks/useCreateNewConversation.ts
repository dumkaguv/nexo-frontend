import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import {
  conversationControllerCreateMutation,
  conversationControllerFindAllInfiniteQueryKey,
  conversationControllerFindAllSuggestionsInfiniteQueryKey
} from '@/api'
import { paths } from '@/config'
import { useInvalidatePredicateQueries } from '@/hooks'
import { showApiErrors } from '@/utils'

export const useCreateNewConversation = () => {
  const { invalidateQueries } = useInvalidatePredicateQueries()
  const navigate = useNavigate()

  const { mutateAsync: createConversation, isPending: isCreatingConversation } =
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

  return { createConversation, isCreatingConversation }
}
