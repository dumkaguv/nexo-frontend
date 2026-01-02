import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useInvalidatePredicateQueries } from '@/hooks/useInvalidateQueries'

const invalidateQueries = vi.fn()

vi.mock('@tanstack/react-query', () => ({
  useQueryClient: () => ({ invalidateQueries })
}))

describe('useInvalidatePredicateQueries', () => {
  it('normalizes keys and invalidates queries', async () => {
    const { result } = renderHook(() => useInvalidatePredicateQueries())

    await result.current.invalidateQueries(['key-1', ['key-2']])

    expect(invalidateQueries).toHaveBeenCalledWith({
      queryKey: ['key-1'],
      refetchType: 'all'
    })
    expect(invalidateQueries).toHaveBeenCalledWith({
      queryKey: ['key-2'],
      refetchType: 'all'
    })
  })
})
