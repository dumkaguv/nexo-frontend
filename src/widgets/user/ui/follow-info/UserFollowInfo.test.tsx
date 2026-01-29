import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { UserFollowInfo } from './UserFollowInfo'

vi.mock('@/entities/subscription/ui/SubscriptionModal', () => ({
  SubscriptionModal: () => <div data-testid="subscription-modal" />
}))

describe('UserFollowInfo', () => {
  it('renders followers and following counts', () => {
    render(
      <UserFollowInfo
        user={{ followersCount: 3, followingCount: 5 } as never}
      />
    )

    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('followers')).toBeInTheDocument()
    expect(screen.getByText('following')).toBeInTheDocument()
  })
})
