import { type QueryKey, useQueryClient } from '@tanstack/react-query'

export const useInvalidateQueries = () => {
  const queryClient = useQueryClient()

  const invalidateQueries = async (keys: QueryKey) => {
    await Promise.all(
      keys.map((queryKey) => {
        queryClient.refetchQueries({
          queryKey: [queryKey]
        })
      })
    )
  }

  return { invalidateQueries }
}
