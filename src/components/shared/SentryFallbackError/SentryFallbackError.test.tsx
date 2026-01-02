import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { SentryFallbackError } from '@/components/shared/SentryFallbackError'

describe('SentryFallbackError', () => {
  it('renders error info and retries', async () => {
    const user = userEvent.setup()
    const onReset = vi.fn()

    render(
      <SentryFallbackError
        error={new Error('Boom')}
        componentStack="stack"
        eventId="event-1"
        resetError={onReset}
      />
    )

    expect(screen.getByText('Something went wrong.')).toBeInTheDocument()
    expect(screen.getByText('Event ID: event-1')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Try again' }))

    expect(onReset).toHaveBeenCalledTimes(1)
  })
})
