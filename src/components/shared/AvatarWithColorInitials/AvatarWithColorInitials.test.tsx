import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { AvatarWithColorInitials } from '@/components/shared/AvatarWithColorInitials'

describe('AvatarWithColorInitials', () => {
  it('renders initials for a user without avatar', () => {
    const user = {
      profile: {
        id: 1,
        fullName: 'John Doe',
        avatar: null
      }
    }

    render(<AvatarWithColorInitials user={user as never} />)

    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('throws when user and name are provided together', () => {
    const user = {
      profile: {
        id: 1,
        fullName: 'John Doe'
      }
    }

    expect(() =>
      render(<AvatarWithColorInitials user={user as never} name="Jane" />)
    ).toThrow()
  })
})
