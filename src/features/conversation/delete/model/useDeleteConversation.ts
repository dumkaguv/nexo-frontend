import { useMutation } from '@tanstack/react-query'

import { useNavigate } from 'react-router-dom'

import {
  conversationControllerFindAllInfiniteQueryKey,
  conversationControllerFindAllSuggestionsInfiniteQueryKey,
  conversationControllerRemoveMutation
} from '@/shared/api'
import { paths } from '@/shared/config'
import { useInvalidatePredicateQueries } from '@/shared/hooks'
import { showApiErrors } from '@/shared/lib'

export const useDeleteConversation = () => {
  const navigate = useNavigate()
  const { invalidateQueries } = useInvalidatePredicateQueries()

  const { mutateAsync: deleteConversation, isPending } = useMutation({
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

  return {
    deleteConversation,
    isPending
  }
}
