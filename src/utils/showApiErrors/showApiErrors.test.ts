import { describe, expect, it, vi } from 'vitest'

import { showApiErrors } from '@/utils/showApiErrors'

const toastError = vi.fn()

vi.mock('sonner', () => ({
  toast: { error: toastError }
}))

vi.mock('@/config', () => ({
  i18n: { t: (key: string) => key }
}))

describe('showApiErrors', () => {
  it('uses api error message when present', () => {
    showApiErrors({ response: { data: { message: 'Server error' } } })

    expect(toastError).toHaveBeenCalledWith('Server error')
  })

  it('uses custom message when provided', () => {
    showApiErrors({}, 'Custom message')

    expect(toastError).toHaveBeenCalledWith('Custom message')
  })

  it('falls back to generic translation', () => {
    showApiErrors({})

    expect(toastError).toHaveBeenCalledWith('error.generic')
  })
})
