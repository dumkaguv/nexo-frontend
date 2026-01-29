import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { UserAvatar } from './UserAvatar'

import type { ComponentProps } from 'react'

vi.mock('@/entities/user', () => ({
  useOnlineUsersStore: () => ({
    onlineUserIds: new Set([1])
  })
}))

vi.mock('@/shared/ui', () => ({
  AvatarWithColorInitials: (props: ComponentProps<'div'>) => (
    <div data-slot="avatar-initials" {...props} />
  )
}))

vi.mock('@/shared/ui/shadcn', () => ({
  Avatar: (props: ComponentProps<'div'>) => (
    <div data-slot="avatar" {...props} />
  ),
  AvatarImage: (props: ComponentProps<'img'>) => (
    <img data-slot="avatar-image" alt="" {...props} />
  ),
  Badge: (props: ComponentProps<'div'>) => <div data-slot="badge" {...props} />,
  Skeleton: (props: ComponentProps<'div'>) => (
    <div data-slot="skeleton" {...props} />
  )
}))

describe('UserAvatar', () => {
  it('renders skeleton while loading', () => {
    const { container } = render(<UserAvatar isLoading />)

    expect(
      container.querySelector('[data-slot="skeleton"]')
    ).toBeInTheDocument()
  })

  it('renders avatar image when user has avatar', () => {
    const user = { id: 1, profile: { avatar: { url: '/user.png' } } }

    const { container } = render(<UserAvatar user={user as never} />)

    const img = container.querySelector('[data-slot="avatar-image"]')

    expect(img).toHaveAttribute('src', '/user.png')
  })

  it('renders fallback initials when avatar is missing', () => {
    const user = { id: 1, profile: { avatar: null } }

    const { container } = render(<UserAvatar user={user as never} />)

    expect(
      container.querySelector('[data-slot="avatar-initials"]')
    ).toBeInTheDocument()
  })

  it('renders online badge when user is online', () => {
    const user = { id: 1, profile: { avatar: { url: '/user.png' } } }

    const { container } = render(
      <UserAvatar user={user as never} showOnlineBadge />
    )

    expect(container.querySelector('[data-slot="badge"]')).toBeInTheDocument()
  })
})
