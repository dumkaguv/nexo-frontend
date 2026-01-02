import { renderHook } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { useQueryParams } from '@/hooks/useQueryParams'

import type { ReactNode } from 'react'

describe('useQueryParams', () => {
  it('parses query params from location', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <MemoryRouter initialEntries={['/?a=1&b=2']}>{children}</MemoryRouter>
    )

    const { result } = renderHook(() => useQueryParams(), { wrapper })

    expect(result.current).toMatchObject({ a: '1', b: '2' })
  })
})
