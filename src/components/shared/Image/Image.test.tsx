import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Image } from '@/components/shared/Image'

describe('Image', () => {
  it('renders an image with provided attributes', () => {
    render(<Image src="/test.png" alt="preview" />)

    const img = screen.getByAltText('preview')

    expect(img).toHaveAttribute('src', '/test.png')
  })
})
