import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { SubscriptionListItem } from '@/components/shared/Subscription/SubscriptionListItem'

vi.mock('@tanstack/react-query', () => ({
  useMutation: () => ({ mutateAsync: vi.fn(), isPending: false })
}))

vi.mock('@/hooks', () => ({
  useInvalidatePredicateQueries: () => ({ invalidateQueries: vi.fn() })
}))

vi.mock('@/stores', () => ({
  useAuthStore: () => ({ user: { id: 1 } })
}))

vi.mock('@/components/shared/Person', () => ({
  Name: ({ name }: { name: string }) => <div>{name}</div>,
  Nickname: ({ nickname }: { nickname: string }) => <div>{nickname}</div>
}))

vi.mock('@/components/shared', async () => {
  const actual = await vi.importActual<typeof import('@/components/shared')>(
    '@/components/shared'
  )

  return {
    ...actual,
    AvatarWithColorInitials: () => <div data-testid="avatar" />
  }
})

vi.mock('@/api', () => ({
  profileControllerMeDetailedQueryKey: () => [],
  subscriptionControllerFindAllFollowersInfiniteQueryKey: () => [],
  subscriptionControllerFindAllFollowingInfiniteQueryKey: () => [],
  subscriptionControllerUnfollowMutation: () => ({})
}))

vi.mock('sonner', () => ({
  toast: { success: vi.fn() }
}))

vi.mock('@/utils', () => ({
  showApiErrors: vi.fn()
}))

describe('SubscriptionListItem', () => {
  it('renders user info', () => {
    render(
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
    )

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('john')).toBeInTheDocument()
  })
})
