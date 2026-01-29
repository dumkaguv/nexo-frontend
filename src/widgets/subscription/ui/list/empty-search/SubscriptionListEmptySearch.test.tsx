import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SubscriptionListEmptySearch } from './SubscriptionListEmptySearch'

describe('SubscriptionListEmptySearch', () => {
  it('renders empty search state', () => {
    render(<SubscriptionListEmptySearch />)

    expect(screen.getByText('noResultsFound')).toBeInTheDocument()
  })
})
