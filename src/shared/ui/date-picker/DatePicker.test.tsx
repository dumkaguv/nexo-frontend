import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { DatePicker } from '@/shared/ui'

describe('DatePicker', () => {
  it('renders placeholder when no date is selected', () => {
    render(<DatePicker />)

    expect(screen.getByText('selectPlaceholder')).toBeInTheDocument()
  })
})
