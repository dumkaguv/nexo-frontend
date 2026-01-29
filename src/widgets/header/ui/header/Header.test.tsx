import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Header } from '@/widgets/header'

vi.mock('@/shared/ui', () => ({
  LanguageSwitcher: () => <div data-testid="language-switcher" />,
  ThemeSwitcher: () => <div data-testid="theme-switcher" />
}))

vi.mock('@/widgets/header/ui/logo', () => ({
  HeaderLogo: () => <div data-testid="header-logo" />
}))

vi.mock('@/widgets/header/ui/search', () => ({
  HeaderSearch: () => <div data-testid="header-search" />
}))

vi.mock('@/widgets/header/ui/avatar', () => ({
  HeaderAvatar: () => <div data-testid="header-avatar" />
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
