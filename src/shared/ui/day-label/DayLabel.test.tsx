import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi, afterEach } from 'vitest'

import { DayLabel } from '@/shared/ui'

describe('DayLabel', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders today label for current date', () => {
    vi.useFakeTimers()
    const now = new Date(2024, 0, 1, 10, 0, 0)

    vi.setSystemTime(now)

    render(<DayLabel date={now} showIcon={false} />)

    expect(screen.getByText(/todayAt/i)).toBeInTheDocument()
  })
})
