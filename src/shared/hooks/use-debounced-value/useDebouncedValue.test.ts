import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi, afterEach } from 'vitest'

import { useDebouncedValue } from './useDebouncedValue'

describe('useDebouncedValue', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('updates value after delay', () => {
    vi.useFakeTimers()

    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebouncedValue(value, delay),
      { initialProps: { value: 'a', delay: 200 } }
    )

    expect(result.current).toBe('a')

    rerender({ value: 'b', delay: 200 })

    act(() => {
      vi.advanceTimersByTime(199)
    })

    expect(result.current).toBe('a')

    act(() => {
      vi.advanceTimersByTime(1)
    })

    expect(result.current).toBe('b')
  })
})
