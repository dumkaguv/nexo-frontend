import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { SubscriptionList } from './SubscriptionList'

import type { ReactNode } from 'react'

const useSubscriptionList = vi.fn()

vi.mock('react-infinite-scroll-component', () => ({
  default: ({ children }: { children: ReactNode }) => <div>{children}</div>
}))

vi.mock('@/widgets/subscription/model', () => ({
  useSubscriptionList: (...args: unknown[]) => useSubscriptionList(...args)
}))

vi.mock('./skeleton', () => ({
  SubscriptionListSkeleton: () => <div data-testid="list-skeleton" />
}))

vi.mock('./empty', () => ({
  SubscriptionListEmpty: () => <div data-testid="list-empty" />
}))

vi.mock('./empty-search', () => ({
  SubscriptionListEmptySearch: () => <div data-testid="list-empty-search" />
}))

vi.mock('./item', () => ({
  SubscriptionListItem: () => <div data-testid="list-item" />
}))

describe('SubscriptionList', () => {
  it('renders skeleton when loading', () => {
    useSubscriptionList.mockReturnValue({
      data: undefined,
      isLoading: true,
      fetchNextPage: vi.fn(),
      hasNextPage: false
    })

    render(<SubscriptionList />)

    expect(screen.getByTestId('list-skeleton')).toBeInTheDocument()
  })

  it('renders empty search state when no results', () => {
    useSubscriptionList.mockReturnValue({
      data: [],
      isLoading: false,
      fetchNextPage: vi.fn(),
      hasNextPage: false
    })

    render(<SubscriptionList searchValue="john" />)

    expect(screen.getByTestId('list-empty-search')).toBeInTheDocument()
  })
})
