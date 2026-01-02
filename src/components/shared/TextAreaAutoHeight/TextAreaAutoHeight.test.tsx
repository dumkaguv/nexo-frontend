import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { TextAreaAutoHeight } from '@/components/shared/TextAreaAutoHeight'

describe('TextAreaAutoHeight', () => {
  it('uses default placeholder', () => {
    render(<TextAreaAutoHeight />)

    expect(screen.getByPlaceholderText('shareYourThoughts')).toBeInTheDocument()
  })

  it('adjusts height on input', () => {
    const { container } = render(<TextAreaAutoHeight />)
    const textarea = container.querySelector('textarea') as HTMLTextAreaElement

    Object.defineProperty(textarea, 'scrollHeight', {
      value: 120,
      configurable: true
    })

    fireEvent.input(textarea)

    expect(textarea.style.height).toBe('120px')
  })
})
