import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Card } from '@/shared/ui'

describe('Card', () => {
  it('renders children when not loading', () => {
    render(<Card>Content</Card>)

    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders skeletons when loading', () => {
    const { container } = render(<Card loading rows={2} />)

    expect(container.querySelectorAll('[data-slot="skeleton"]')).toHaveLength(2)
  })
})
