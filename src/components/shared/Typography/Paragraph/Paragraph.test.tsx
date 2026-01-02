import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Paragraph } from '@/components/shared/Typography/Paragraph'

describe('Paragraph', () => {
  it('renders muted text by default', () => {
    render(<Paragraph>Body</Paragraph>)

    expect(screen.getByText('Body')).toHaveClass('text-muted-foreground')
  })

  it('renders unmuted text when isMuted is false', () => {
    render(<Paragraph isMuted={false}>Body</Paragraph>)

    expect(screen.getByText('Body')).not.toHaveClass('text-muted-foreground')
  })
})
