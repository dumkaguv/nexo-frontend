import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SubscriptionListEmpty } from './SubscriptionListEmpty'

describe('SubscriptionListEmpty', () => {
  it('renders empty state for following', () => {
    render(<SubscriptionListEmpty isFollowersTab={false} />)

    expect(screen.getByText('noFollowingYet')).toBeInTheDocument()
  })
})
