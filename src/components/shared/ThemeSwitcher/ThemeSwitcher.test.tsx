import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { ThemeSwitcher } from '@/components/shared/ThemeSwitcher'

const { setTheme } = vi.hoisted(() => ({
  setTheme: vi.fn()
}))

vi.mock('@/stores', () => ({
  useThemeStore: () => ({
    theme: 'light',
    setTheme
  })
}))

describe('ThemeSwitcher', () => {
  it('updates theme from menu', async () => {
    const user = userEvent.setup()

    render(<ThemeSwitcher />)

    await user.click(screen.getByRole('button', { name: 'theme.toggleTheme' }))
    await user.click(screen.getByText('theme.dark'))

    expect(setTheme).toHaveBeenCalledWith('dark')
  })
})
