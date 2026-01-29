import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { AvatarWithColorInitials } from './AvatarWithColorInitials'

import type { ComponentProps } from 'react'

vi.mock('@/shared/ui/shadcn', () => ({
  Avatar: (props: ComponentProps<'div'>) => (
    <div data-slot="avatar" {...props} />
  )
}))

describe('AvatarWithColorInitials', () => {
  it('renders initials for a provided name', () => {
    render(<AvatarWithColorInitials name="John Doe" />)

    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('applies size styles and colors', () => {
    render(<AvatarWithColorInitials name="Jane Doe" id={7} size={40} />)

    const avatar = screen.getByText('JD').closest('[data-slot="avatar"]')

    if (!(avatar instanceof HTMLElement)) {
      throw new Error('Expected avatar element to be an HTMLElement')
    }

    expect(avatar).toHaveStyle({
      width: '40px',
      height: '40px',
      fontSize: '16px'
    })
    expect(avatar.style.backgroundColor).not.toBe('')
    expect(avatar.style.color).not.toBe('')
  })
})
