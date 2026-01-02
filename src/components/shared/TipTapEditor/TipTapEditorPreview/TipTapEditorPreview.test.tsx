import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { TipTapEditorPreview } from '@/components/shared/TipTapEditor/TipTapEditorPreview'

vi.mock('dompurify', () => ({
  default: {
    sanitize: (content: string) => `safe:${content}`
  }
}))

describe('TipTapEditorPreview', () => {
  it('renders sanitized html', () => {
    const { container } = render(<TipTapEditorPreview content="<p>Hello</p>" />)

    const root = container.querySelector('div')

    expect(root?.innerHTML).toBe('safe:<p>Hello</p>')
  })
})
