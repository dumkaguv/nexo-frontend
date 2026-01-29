import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ButtonMoreActions } from '@/shared/ui'

describe('ButtonMoreActions', () => {
  it('renders a button', () => {
    render(<ButtonMoreActions />)

    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
