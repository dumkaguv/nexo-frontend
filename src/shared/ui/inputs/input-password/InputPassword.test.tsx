import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { InputPassword } from './InputPassword'

describe('InputPassword', () => {
  it('renders with placeholder', () => {
    render(<InputPassword />)

    const input = screen.getByPlaceholderText('inputPassword')

    expect(input).toBeInTheDocument()
  })

  it('renders with default type = "password" by default', () => {
    render(<InputPassword />)

    const input = screen.getByPlaceholderText('inputPassword')

    expect(input).toHaveAttribute('type', 'password')
  })

  it('toggles input type when button is clicked', async () => {
    const user = userEvent.setup()

    render(<InputPassword />)

    const input = screen.getByPlaceholderText('inputPassword')
    const button = screen.getByRole('button')

    expect(input).toHaveAttribute('type', 'password')

    await user.click(button)
    expect(input).toHaveAttribute('type', 'text')

    await user.click(button)
    expect(input).toHaveAttribute('type', 'password')
  })

  it('passes props to Input (e.g., value and onChange)', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<InputPassword onChange={onChange} />)

    const input = screen.getByPlaceholderText('inputPassword')

    await user.type(input, 'abc')

    expect(onChange).toHaveBeenCalled()
  })
})
