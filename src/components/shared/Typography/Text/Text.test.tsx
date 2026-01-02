import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Text } from '@/components/shared/Typography/Text'

describe('Text', () => {
  it('renders a span', () => {
    render(<Text>Content</Text>)

    expect(screen.getByText('Content').tagName).toBe('SPAN')
  })
})
