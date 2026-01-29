import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { TipTapEditor } from './TipTapEditor'

vi.mock('@tiptap/react', () => ({
  EditorContent: () => <div data-testid="editor-content" />,
  useEditor: () => ({
    getHTML: () => '<p>value</p>',
    commands: { setContent: vi.fn() }
  })
}))

vi.mock('@tiptap/extension-placeholder', () => ({
  Placeholder: { configure: () => ({}) }
}))

vi.mock('@tiptap/extension-text-style', () => ({
  TextStyleKit: {}
}))

vi.mock('@tiptap/starter-kit', () => ({
  default: {}
}))

vi.mock('@/shared/ui/tip-tap-editor/tip-tap-toolbar', () => ({
  TipTapToolbar: () => <div data-testid="toolbar" />
}))

describe('TipTapEditor', () => {
  it('renders toolbar and editor content', () => {
    render(<TipTapEditor value="<p>Hi</p>" />)

    expect(screen.getByTestId('toolbar')).toBeInTheDocument()
    expect(screen.getByTestId('editor-content')).toBeInTheDocument()
  })
})
