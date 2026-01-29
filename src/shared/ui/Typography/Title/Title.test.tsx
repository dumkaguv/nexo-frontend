import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Title } from './Title'

describe('Title', () => {
  it('renders the correct heading level', () => {
    render(<Title level={2}>Heading</Title>)

    expect(screen.getByText('Heading').tagName).toBe('H2')
  })
})
