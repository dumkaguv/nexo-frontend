import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { ModalConfirm } from '@/shared/ui'

describe('ModalConfirm', () => {
  it('calls onOk when confirmed', async () => {
    const user = userEvent.setup()
    const onOk = vi.fn()

    render(
      <ModalConfirm onOk={onOk}>
        <button type="button">Open</button>
      </ModalConfirm>
    )

    await user.click(screen.getByRole('button', { name: 'Open' }))
    await user.click(screen.getByRole('button', { name: 'confirm' }))

    expect(onOk).toHaveBeenCalledTimes(1)
  })
})
