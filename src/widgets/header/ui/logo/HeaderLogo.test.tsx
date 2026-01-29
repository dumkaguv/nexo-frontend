import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { HeaderLogo } from './HeaderLogo'

describe('HeaderLogo', () => {
  it('links to home', () => {
    render(
      <MemoryRouter>
        <HeaderLogo />
      </MemoryRouter>
    )

    const link = screen.getByRole('link', { name: 'Nexo' })

    expect(link).toHaveAttribute('href', '/')
  })
})
