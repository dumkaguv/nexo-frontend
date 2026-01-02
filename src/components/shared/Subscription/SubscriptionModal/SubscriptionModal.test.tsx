import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { SubscriptionModal } from '@/components/shared/Subscription/SubscriptionModal'

vi.mock('@/stores', () => ({
  useAuthStore: () => ({
    user: { followersCount: 1, followingCount: 2 }
  })
}))

vi.mock('@/hooks', () => ({
  useDebouncedValue: (value: string | undefined) => value
}))

vi.mock('@/components/shared/Subscription/SubscriptionList', () => ({
  SubscriptionList: () => <div data-testid="subscription-list" />
}))

vi.mock('@/components/shared', async () => {
  const actual = await vi.importActual<typeof import('@/components/shared')>(
    '@/components/shared'
  )

  return {
    ...actual,
    InputSearch: () => <input data-testid="input-search" />
  }
})

describe('SubscriptionModal', () => {
  it('renders tabs and search input', () => {
    render(<SubscriptionModal open />)

    expect(screen.getByText('followers')).toBeInTheDocument()
    expect(screen.getByText('following')).toBeInTheDocument()
    expect(screen.getByTestId('input-search')).toBeInTheDocument()
  })
})
