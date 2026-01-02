import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { SubscriptionList } from '@/components/shared/Subscription/SubscriptionList'

import type { ReactNode } from 'react'

const useInfiniteQuery = vi.fn()

vi.mock('@tanstack/react-query', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@tanstack/react-query')>()

  return {
    ...actual,
    useInfiniteQuery: (...args: unknown[]) => useInfiniteQuery(...args)
  }
})

vi.mock('react-infinite-scroll-component', () => ({
  default: ({ children }: { children: ReactNode }) => <div>{children}</div>
}))

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>('react-router-dom')

  return {
    ...actual,
    useParams: () => ({ id: '1' })
  }
})

vi.mock('@/stores', () => ({
  useAuthStore: () => ({ user: { id: 1 } })
}))

vi.mock('@/components/shared/Subscription/SubscriptionListSkeleton', () => ({
  SubscriptionListSkeleton: () => <div data-testid="list-skeleton" />
}))

vi.mock('@/components/shared/Subscription/SubscriptionListEmpty', () => ({
  SubscriptionListEmpty: () => <div data-testid="list-empty" />
}))

vi.mock('@/components/shared/Subscription/SubscriptionListEmptySearch', () => ({
  SubscriptionListEmptySearch: () => <div data-testid="list-empty-search" />
}))

vi.mock('@/components/shared/Subscription/SubscriptionListItem', () => ({
  SubscriptionListItem: () => <div data-testid="list-item" />
}))

vi.mock('@/api', () => ({
  subscriptionControllerFindAllFollowersInfiniteOptions: () => ({}),
  subscriptionControllerFindAllFollowingInfiniteOptions: () => ({})
}))

describe('SubscriptionList', () => {
  it('renders skeleton when loading', () => {
    useInfiniteQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      fetchNextPage: vi.fn(),
      hasNextPage: false
    })

    render(<SubscriptionList />)

    expect(screen.getByTestId('list-skeleton')).toBeInTheDocument()
  })

  it('renders empty search state when no results', () => {
    useInfiniteQuery.mockReturnValue({
      data: { pages: [{ data: [] }] },
      isLoading: false,
      fetchNextPage: vi.fn(),
      hasNextPage: false
    })

    render(<SubscriptionList searchValue="john" />)

    expect(screen.getByTestId('list-empty-search')).toBeInTheDocument()
  })
})
