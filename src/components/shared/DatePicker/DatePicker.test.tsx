import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { DatePicker } from '@/components/shared/DatePicker'

describe('DatePicker', () => {
  it('renders placeholder when no date is selected', () => {
    render(<DatePicker />)

    expect(screen.getByText('selectPlaceholder')).toBeInTheDocument()
  })
})
