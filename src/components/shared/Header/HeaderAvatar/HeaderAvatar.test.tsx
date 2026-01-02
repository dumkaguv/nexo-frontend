import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import { HeaderAvatar } from '@/components/shared/Header/HeaderAvatar'

const mutateAsync = vi.fn()

vi.mock('@tanstack/react-query', () => ({
  useMutation: () => ({ mutateAsync, isPending: false }),
  useQueryClient: () => ({
    cancelQueries: vi.fn(),
    clear: vi.fn()
  })
}))

vi.mock('@/api', () => ({
  authControllerLogoutMutation: () => ({})
}))

vi.mock('@/stores', () => ({
  useAuthStore: () => ({ setUser: vi.fn() })
}))

vi.mock('@/utils', () => ({
  showApiErrors: vi.fn()
}))

vi.mock('@/utils/clearAccessToken', () => ({
  clearAccessToken: vi.fn()
}))

vi.mock('sonner', () => ({
  toast: { success: vi.fn() }
}))

vi.mock('@/components/shared/Person/PersonAvatar', () => ({
  PersonAvatar: () => <div data-testid="person-avatar" />
}))

describe('HeaderAvatar', () => {
  it('shows menu items when opened', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <HeaderAvatar />
      </MemoryRouter>
    )

    await user.click(screen.getByRole('button'))

    expect(screen.getByText('messages')).toBeInTheDocument()
    expect(screen.getByText('settings')).toBeInTheDocument()
    expect(screen.getByText('auth.logout')).toBeInTheDocument()
  })
})
