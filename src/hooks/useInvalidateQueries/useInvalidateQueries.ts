import { useQueryClient } from '@tanstack/react-query'

export const useInvalidatePredicateQueries = () => {
  const queryClient = useQueryClient()

  const invalidateQueries = async (
    keys: unknown | unknown[]
  ): Promise<void> => {
    const normalized = Array.isArray(keys) ? keys : [keys]

    await Promise.all(
      normalized.map((key) => {
        const queryKey = Array.isArray(key) ? key : [key]

        return queryClient.invalidateQueries({ queryKey, refetchType: 'all' })
      })
    )
  }

  return { invalidateQueries }
}
