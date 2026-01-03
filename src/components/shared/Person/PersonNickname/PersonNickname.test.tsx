import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi, beforeEach } from 'vitest'

import { PersonNickname } from '@/components/shared/Person/PersonNickname'

const useAuthStore = vi.fn()

vi.mock('@/stores', () => ({
  useAuthStore: () => useAuthStore()
}))

describe('PersonNickname', () => {
  beforeEach(() => {
    useAuthStore.mockReset()
  })

  it('renders nickname as link', () => {
    useAuthStore.mockReturnValue({ user: { id: 1, username: 'john' } })

    render(
      <MemoryRouter>
        <PersonNickname nickname="jane" asLink userId={2} />
      </MemoryRouter>
    )

    expect(screen.getByText('@jane')).toBeInTheDocument()
  })
})
