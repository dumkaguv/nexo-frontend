import { render } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'

import { PersonAvatar } from '@/components/shared/Person/PersonAvatar'

import type { ComponentProps, ReactNode } from 'react'

const useAuthStore = vi.fn()

vi.mock('@/stores', () => ({
  useAuthStore: () => useAuthStore()
}))

vi.mock('@/components/ui', () => ({
  Avatar: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  AvatarImage: (props: ComponentProps<'img'>) => (
    <img data-slot="avatar-image" alt="" {...props} />
  ),
  Skeleton: (props: ComponentProps<'div'>) => (
    <div data-slot="skeleton" {...props} />
  )
}))

describe('PersonAvatar', () => {
  beforeEach(() => {
    useAuthStore.mockReset()
  })

  it('renders skeleton while pending', () => {
    useAuthStore.mockReturnValue({ user: undefined, isPendingUser: true })

    const { container } = render(<PersonAvatar />)

    expect(
      container.querySelector('[data-slot="skeleton"]')
    ).toBeInTheDocument()
  })

  it('renders avatar image when src is provided', () => {
    useAuthStore.mockReturnValue({
      user: { profile: { avatar: { url: '/user.png' } } },
      isPendingUser: false
    })

    const { container } = render(<PersonAvatar src="/custom.png" />)

    const img = container.querySelector('[data-slot="avatar-image"]')

    expect(img).toHaveAttribute('src', '/custom.png')
  })
})
