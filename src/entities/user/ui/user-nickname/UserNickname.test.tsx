import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import { UserNickname } from './UserNickname'

import type { ComponentProps } from 'react'

vi.mock('@/shared/config', () => ({
  paths: {
    user: {
      byId: (id: number) => `/users/${id}`
    }
  }
}))

vi.mock('@/shared/ui', () => ({
  Typography: {
    Text: ({ children, ...props }: ComponentProps<'span'>) => (
      <span {...props}>{children}</span>
    )
  }
}))

vi.mock('@/shared/ui/shadcn', () => ({
  Button: ({ children, ...props }: ComponentProps<'button'>) => (
    <button {...props}>{children}</button>
  ),
  Skeleton: (props: ComponentProps<'div'>) => (
    <div data-slot="skeleton" {...props} />
  )
}))

describe('UserNickname', () => {
  it('renders skeleton while loading', () => {
    const { container } = render(<UserNickname isLoading nickname="jane" />)

    expect(
      container.querySelector('[data-slot="skeleton"]')
    ).toBeInTheDocument()
  })

  it('renders nickname without @ when asLink is false', () => {
    render(<UserNickname nickname="jane" userId={2} />)

    expect(screen.getByText('jane')).toBeInTheDocument()
  })

  it('renders nickname with @ when asLink is true', () => {
    render(
      <MemoryRouter>
        <UserNickname nickname="jane" asLink userId={2} />
      </MemoryRouter>
    )

    const link = screen.getByRole('link', { name: '@jane' })

    expect(link).toHaveAttribute('href', '/users/2')
  })
})
