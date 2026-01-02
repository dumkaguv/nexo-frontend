import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { InputUpload } from './InputUpload'

describe('InputUpload', () => {
  it('renders label when provided', () => {
    render(<InputUpload label="inputs.uploadLabel" />)

    expect(screen.getByText('inputs.uploadLabel')).toBeInTheDocument()
  })

  it('renders default button', () => {
    render(<InputUpload />)

    const button = screen.getByRole('button', { name: 'uploadFile' })

    expect(button).toBeInTheDocument()
  })

  it('clicking default button triggers hidden input click()', async () => {
    const user = userEvent.setup()

    const clickSpy = vi
      .spyOn(HTMLInputElement.prototype, 'click')
      .mockImplementation(vi.fn())

    render(<InputUpload />)

    const button = screen.getByRole('button', { name: 'uploadFile' })

    await user.click(button)

    expect(clickSpy).toHaveBeenCalled()
  })

  it('passes accept and multiple props to input', () => {
    render(<InputUpload accept="image/*" multiple />)

    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement

    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('accept', 'image/*')
    expect(input).toHaveAttribute('multiple')
  })

  it('calls onChange with selected files', () => {
    const onChange = vi.fn()

    render(<InputUpload onChange={onChange} multiple />)

    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement

    const file1 = new File(['a'], 'a.txt', { type: 'text/plain' })
    const file2 = new File(['b'], 'b.txt', { type: 'text/plain' })

    fireEvent.change(input, {
      target: { files: [file1, file2] }
    })

    expect(onChange).toHaveBeenCalled()
    expect(onChange).toHaveBeenCalledWith([file1, file2])
  })

  it('renders custom children and clicking them triggers input click()', async () => {
    const user = userEvent.setup()

    const clickSpy = vi
      .spyOn(HTMLInputElement.prototype, 'click')
      .mockImplementation(vi.fn())

    render(
      <InputUpload>
        <button type="button">Custom trigger</button>
      </InputUpload>
    )

    const trigger = screen.getByRole('button', { name: 'Custom trigger' })

    await user.click(trigger)

    expect(clickSpy).toHaveBeenCalled()
  })
})
