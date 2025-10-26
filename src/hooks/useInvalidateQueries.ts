import { useQueryClient } from '@tanstack/react-query'

type QueryKeyItem = { _id: string }

export const useInvalidatePredicateQueries = () => {
  const queryClient = useQueryClient()

  const flattenToQueryKeyItems = (keys: unknown): QueryKeyItem[] => {
    if (!Array.isArray(keys)) return []
    return keys.flatMap((entry) => {
      if (Array.isArray(entry)) {
        return entry.filter(
          (k): k is QueryKeyItem => !!k && typeof k === 'object' && '_id' in k
        )
      }
      if (entry && typeof entry === 'object' && '_id' in entry) {
        return [entry]
      }
      return []
    })
  }

  const invalidateQueries = async (rawKeys: unknown): Promise<void> => {
    const normalized = flattenToQueryKeyItems(rawKeys)

    await Promise.all(
      normalized.map((key) =>
        queryClient.refetchQueries({
          predicate: (q) =>
            typeof q.queryKey?.[0] === 'object' &&
            // @ts-expect-error - must be _id
            q.queryKey[0]?._id === key._id
        })
      )
    )
  }

  return { invalidateQueries }
}
