import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Header } from '@/components/shared/Header/Header'

vi.mock('@/components/shared/Header/HeaderLogo', () => ({
  HeaderLogo: () => <div data-testid="header-logo" />
}))
vi.mock('@/components/shared/Header/HeaderSearch', () => ({
  HeaderSearch: () => <div data-testid="header-search" />
}))
vi.mock('@/components/shared/Header/HeaderAvatar', () => ({
  HeaderAvatar: () => <div data-testid="header-avatar" />
}))
vi.mock('@/components/shared/LanguageSwitcher', () => ({
  LanguageSwitcher: () => <div data-testid="language-switcher" />
}))
vi.mock('@/components/shared/ThemeSwitcher', () => ({
  ThemeSwitcher: () => <div data-testid="theme-switcher" />
}))

describe('Header', () => {
  it('renders header content', () => {
    render(<Header />)

    expect(screen.getByTestId('header-logo')).toBeInTheDocument()
    expect(screen.getByTestId('header-search')).toBeInTheDocument()
    expect(screen.getByTestId('header-avatar')).toBeInTheDocument()
    expect(screen.getByTestId('language-switcher')).toBeInTheDocument()
    expect(screen.getByTestId('theme-switcher')).toBeInTheDocument()
  })
})
