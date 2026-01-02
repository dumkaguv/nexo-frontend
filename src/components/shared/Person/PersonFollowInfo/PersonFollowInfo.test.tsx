import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'

import { PersonFollowInfo } from '@/components/shared/Person/PersonFollowInfo'

const useAuthStore = vi.fn()

vi.mock('@/stores', () => ({
  useAuthStore: () => useAuthStore()
}))

vi.mock('@/components/shared/Subscription/SubscriptionModal', () => ({
  SubscriptionModal: () => <div data-testid="subscription-modal" />
}))

describe('PersonFollowInfo', () => {
  beforeEach(() => {
    useAuthStore.mockReset()
  })

  it('renders followers and following counts', () => {
    useAuthStore.mockReturnValue({
      user: { followersCount: 3, followingCount: 5 },
      isPendingUser: false
    })

    render(<PersonFollowInfo />)

    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('followers')).toBeInTheDocument()
    expect(screen.getByText('following')).toBeInTheDocument()
  })
})
