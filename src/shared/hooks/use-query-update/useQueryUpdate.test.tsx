import { renderHook } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import { useQueryUpdate } from './useQueryUpdate'

import type { ReactNode } from 'react'

const navigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>('react-router-dom')

  return {
    ...actual,
    useNavigate: () => navigate
  }
})

describe('useQueryUpdate', () => {
  it('pushes updated query string', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <MemoryRouter initialEntries={['/?a=1']}>{children}</MemoryRouter>
    )

    const { result } = renderHook(() => useQueryUpdate(), { wrapper })

    result.current.updateQuery({ b: 2 })

    expect(navigate).toHaveBeenCalledWith('/?a=1&b=2')
  })

  it('resets query when reset is true', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <MemoryRouter initialEntries={['/?a=1']}>{children}</MemoryRouter>
    )

    const { result } = renderHook(() => useQueryUpdate(), { wrapper })

    result.current.updateQuery({ a: 2 }, true)

    expect(navigate).toHaveBeenCalledWith('/?a=2')
  })
})
