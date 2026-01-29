import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SubscriptionListSkeleton } from './SubscriptionListSkeleton'

describe('SubscriptionListSkeleton', () => {
  it('renders default number of skeleton rows', () => {
    const { container } = render(<SubscriptionListSkeleton />)

    expect(container.querySelectorAll('[data-slot="skeleton"]')).toHaveLength(
      25
    )
  })

  it('renders custom number of skeleton rows', () => {
    const { container } = render(<SubscriptionListSkeleton count={2} />)

    expect(container.querySelectorAll('[data-slot="skeleton"]')).toHaveLength(
      10
    )
  })
})
