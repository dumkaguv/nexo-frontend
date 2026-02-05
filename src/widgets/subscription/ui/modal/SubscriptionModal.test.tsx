import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { SubscriptionModal } from './SubscriptionModal'

vi.mock('@/shared/hooks', () => ({
  useDebouncedValue: (value: string | undefined) => value,
  useMinWidth: () => false,
  useMaxWidth: () => false
}))

vi.mock('../list', () => ({
  SubscriptionList: () => <div data-testid="subscription-list" />
}))

vi.mock('@/shared/ui', async () => {
  const actual =
    await vi.importActual<typeof import('@/shared/ui')>('@/shared/ui')

  return {
    ...actual,
    InputSearch: () => <input data-testid="input-search" />
  }
})

describe('SubscriptionModal', () => {
  it('renders tabs and search input', () => {
    render(
      <SubscriptionModal
        open
        user={{ followersCount: 1, followingCount: 2 } as never}
      />
    )

    expect(screen.getByText(/followers/)).toBeInTheDocument()
    expect(screen.getByText(/following/)).toBeInTheDocument()
    expect(screen.getByTestId('input-search')).toBeInTheDocument()
  })
})
