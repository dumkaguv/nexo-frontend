import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'

import { PersonName } from '@/components/shared/Person/PersonName'

const useAuthStore = vi.fn()

vi.mock('@/stores', () => ({
  useAuthStore: () => useAuthStore()
}))

describe('PersonName', () => {
  beforeEach(() => {
    useAuthStore.mockReset()
  })

  it('renders provided name', () => {
    useAuthStore.mockReturnValue({ user: undefined })

    render(<PersonName name="Jane Doe" />)

    expect(screen.getByText('Jane Doe')).toBeInTheDocument()
  })

  it('renders store name when no prop is provided', () => {
    useAuthStore.mockReturnValue({ user: { profile: { fullName: 'John' } } })

    render(<PersonName />)

    expect(screen.getByText('John')).toBeInTheDocument()
  })
})
