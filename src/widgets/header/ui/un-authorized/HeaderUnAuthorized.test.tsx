import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { HeaderUnAuthorized } from '@/widgets/header/ui'

vi.mock('@/shared/ui', () => ({
  LanguageSwitcher: () => <div data-testid="language-switcher" />,
  ThemeSwitcher: () => <div data-testid="theme-switcher" />
}))

vi.mock('@/widgets/header/ui/logo', () => ({
  HeaderLogo: () => <div data-testid="header-logo" />
}))

describe('HeaderUnAuthorized', () => {
  it('renders header content', () => {
    render(<HeaderUnAuthorized />)

    expect(screen.getByTestId('header-logo')).toBeInTheDocument()
    expect(screen.getByTestId('language-switcher')).toBeInTheDocument()
    expect(screen.getByTestId('theme-switcher')).toBeInTheDocument()
  })
})
