import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import { SubscriptionListItem } from './SubscriptionListItem'

vi.mock('@tanstack/react-query', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@tanstack/react-query')>()

  return {
    ...actual,
    useMutation: () => ({ mutateAsync: vi.fn(), isPending: false })
  }
})

vi.mock('@/shared/hooks', () => ({
  useInvalidatePredicateQueries: () => ({ invalidateQueries: vi.fn() })
}))

vi.mock('@/shared/model', () => ({
  useAuthStore: () => ({ user: { id: 1 } })
}))

vi.mock('@/entities/person', () => ({
  AvatarWithColorInitials: () => <div data-testid="avatar" />,
  Name: ({ name }: { name: string }) => <div>{name}</div>,
  Nickname: ({ nickname }: { nickname: string }) => <div>{nickname}</div>
}))

vi.mock('@/shared/api', () => ({
  conversationControllerFindOneByUserIdOptions: () => ({}),
  profileControllerMeDetailedQueryKey: () => [],
  subscriptionControllerFindAllFollowersInfiniteQueryKey: () => [],
  subscriptionControllerFindAllFollowingInfiniteQueryKey: () => [],
  subscriptionControllerRemoveFollowerMutation: () => ({}),
  subscriptionControllerUnfollowMutation: () => ({})
}))

vi.mock('sonner', () => ({
  toast: { success: vi.fn() }
}))

vi.mock('@/shared/lib', async () => {
  const actual =
    await vi.importActual<typeof import('@/shared/lib')>('@/shared/lib')

  return {
    ...actual,
    showApiErrors: vi.fn()
  }
})

describe('SubscriptionListItem', () => {
  it('renders user info', () => {
    const queryClient = new QueryClient()

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <SubscriptionListItem
            data={
              {
                user: {
                  id: 2,
                  username: 'john',
                  profile: { fullName: 'John Doe' }
                }
              } as never
            }
            isFollowersTab
          />
        </MemoryRouter>
      </QueryClientProvider>
    )

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('john')).toBeInTheDocument()
  })
})
