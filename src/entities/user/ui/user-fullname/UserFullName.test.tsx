import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { UserFullName } from './UserFullName'

import type { ComponentProps } from 'react'

vi.mock('@/shared/ui', () => ({
  Typography: {
    Title: ({ children, ...props }: ComponentProps<'h2'>) => (
      <h2 {...props}>{children}</h2>
    )
  }
}))

vi.mock('@/shared/ui/shadcn', () => ({
  Skeleton: (props: ComponentProps<'div'>) => (
    <div data-slot="skeleton" {...props} />
  )
}))

describe('UserFullName', () => {
  it('renders skeleton while loading', () => {
    const { container } = render(<UserFullName isLoading name="Jane Doe" />)

    expect(
      container.querySelector('[data-slot="skeleton"]')
    ).toBeInTheDocument()
  })

  it('renders provided name', () => {
    render(<UserFullName name="Jane Doe" />)

    expect(screen.getByText('Jane Doe')).toBeInTheDocument()
  })
})
