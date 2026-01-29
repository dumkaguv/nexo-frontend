import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import { NotFoundPage } from './NotFoundPage'

const navigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>('react-router-dom')

  return {
    ...actual,
    useNavigate: () => navigate
  }
})

describe('NotFoundPage', () => {
  it('navigates back when goBack is clicked', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    )

    await user.click(screen.getByRole('button', { name: 'goBack' }))

    expect(navigate).toHaveBeenCalledWith(-1)
  })
})
