import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher'

const { changeLanguage } = vi.hoisted(() => ({
  changeLanguage: vi.fn()
}))

vi.mock('react-i18next', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-i18next')>()

  return {
    ...actual,
    useTranslation: () => ({
      t: (key: string) => key,
      i18n: { language: 'en' }
    })
  }
})

vi.mock('@/config', () => ({
  i18n: { changeLanguage }
}))

describe('LanguageSwitcher', () => {
  it('changes language when menu item is clicked', async () => {
    const user = userEvent.setup()

    render(<LanguageSwitcher />)

    await user.click(screen.getByRole('button', { name: 'changeLanguage' }))
    await user.click(screen.getByText('languages.ru'))

    expect(changeLanguage).toHaveBeenCalledWith('ru')
  })
})
