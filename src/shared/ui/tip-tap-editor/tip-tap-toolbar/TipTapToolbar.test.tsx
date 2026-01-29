import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { TipTapToolbar } from '@/shared/ui/tip-tap-editor/tip-tap-toolbar'

vi.mock('@tiptap/react', () => ({
  useEditorState: () => ({
    isBold: false,
    canBold: true,
    isItalic: false,
    canItalic: true,
    isStrike: false,
    canStrike: true,
    isCode: false,
    canCode: true,
    canClearMarks: true,
    isParagraph: false,
    isHeading1: false,
    isHeading2: false,
    isHeading3: false,
    isHeading4: false,
    isHeading5: false,
    isHeading6: false,
    isBulletList: false,
    isOrderedList: false,
    isCodeBlock: false,
    isBlockquote: false,
    canUndo: true,
    canRedo: true
  })
}))

describe('TipTapToolbar', () => {
  it('calls editor commands when a button is clicked', async () => {
    const user = userEvent.setup()
    const run = vi.fn()

    const editor = {
      chain: () => ({
        focus: () => ({
          toggleBold: () => ({ run })
        })
      })
    }

    render(<TipTapToolbar editor={editor as never} />)

    const buttons = screen.getAllByRole('button')

    await user.click(buttons[0])

    expect(run).toHaveBeenCalled()
  })
})
