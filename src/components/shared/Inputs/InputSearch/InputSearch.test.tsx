import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { InputSearch } from './InputSearch'

describe('InputSearch', () => {
  it('renders input with placeholder', () => {
    render(<InputSearch />)

    const input = screen.getByPlaceholderText('inputs.inputSearch')
    expect(input).toBeInTheDocument()
  })

  it('shows clear button when value is entered', async () => {
    const user = userEvent.setup()

    render(<InputSearch />)

    const input = screen.getByRole('textbox')

    await user.type(input, 'test')

    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('clears value when clear button is clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<InputSearch onChange={onChange} />)

    const input = screen.getByRole('textbox')

    await user.type(input, 'abc')

    const clearButton = screen.getByRole('button')
    await user.click(clearButton)

    expect(onChange).toHaveBeenCalled()
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: '' })
      })
    )
  })

  it('shows loading indicator when loading=true', () => {
    render(<InputSearch loading />)

    expect(screen.getByText('loading')).toBeInTheDocument()
  })
})
