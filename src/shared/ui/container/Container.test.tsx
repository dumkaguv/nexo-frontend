import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Container } from '@/shared/ui'

describe('Container', () => {
  it('renders with custom className', () => {
    const { container } = render(
      <Container className="custom">content</Container>
    )

    expect(container.firstChild).toHaveClass('custom')
  })
})
