import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { ErrorFallback } from '@/components/shared/ErrorFallback'

describe('ErrorFallback', () => {
  it('renders error message and handles retry', async () => {
    const user = userEvent.setup()
    const onReset = vi.fn()

    render(
      <ErrorFallback error={new Error('Boom')} resetErrorBoundary={onReset} />
    )

    expect(screen.getByText('Boom')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'error.tryAgain' }))

    expect(onReset).toHaveBeenCalledTimes(1)
  })
})
