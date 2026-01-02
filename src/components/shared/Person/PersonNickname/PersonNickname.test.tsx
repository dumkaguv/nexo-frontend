import { render, screen } from '@testing-library/react'
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

  it('renders nickname text', () => {
    useAuthStore.mockReturnValue({ user: { username: 'john' } })

    render(<PersonNickname nickname="jane" />)

    expect(screen.getByText('jane')).toBeInTheDocument()
  })
})
