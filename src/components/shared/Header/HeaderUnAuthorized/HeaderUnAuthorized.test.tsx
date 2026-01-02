import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { HeaderUnAuthorized } from '@/components/shared/Header/HeaderUnAuthorized'

vi.mock('@/components/shared/Header/HeaderLogo', () => ({
  HeaderLogo: () => <div data-testid="header-logo" />
}))
vi.mock('@/components/shared/LanguageSwitcher', () => ({
  LanguageSwitcher: () => <div data-testid="language-switcher" />
}))
vi.mock('@/components/shared/ThemeSwitcher', () => ({
  ThemeSwitcher: () => <div data-testid="theme-switcher" />
}))

describe('HeaderUnAuthorized', () => {
  it('renders header content', () => {
    render(<HeaderUnAuthorized />)

    expect(screen.getByTestId('header-logo')).toBeInTheDocument()
    expect(screen.getByTestId('language-switcher')).toBeInTheDocument()
    expect(screen.getByTestId('theme-switcher')).toBeInTheDocument()
  })
})
