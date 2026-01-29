import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import {
  conversationControllerCreateMutation,
  conversationControllerFindAllInfiniteQueryKey,
  conversationControllerFindAllSuggestionsInfiniteQueryKey
} from '@/shared/api'
import { paths } from '@/shared/config'
import { useInvalidatePredicateQueries } from '@/shared/hooks'
import { showApiErrors } from '@/shared/lib'

export const useCreateNewConversation = () => {
  const { invalidateQueries } = useInvalidatePredicateQueries()
  const navigate = useNavigate()

  const { mutateAsync: createConversation, isPending: isCreatingConversation } =
    useMutation({
      ...conversationControllerCreateMutation(),
      onError: (e) => showApiErrors(e),
      onSuccess: async ({ data }) => {
        if (!data?.id) {
          return
        }

        await invalidateQueries([
          conversationControllerFindAllSuggestionsInfiniteQueryKey(),
          conversationControllerFindAllInfiniteQueryKey()
        ])

        void navigate(
          { pathname: paths.conversations.byId(data.id), search: '' },
          { replace: true }
        )
      }
    })

  return { createConversation, isCreatingConversation }
}
