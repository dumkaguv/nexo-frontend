import { describe, expect, it } from 'vitest'

import { getInitials, isEmptyHTMLEditor } from '@/utils/string'

describe('getInitials', () => {
  it('returns ? for empty input', () => {
    expect(getInitials('')).toBe('?')
    expect(getInitials('   ')).toBe('?')
    expect(getInitials(undefined)).toBe('?')
  })

  it('returns two letters for single word', () => {
    expect(getInitials('John')).toBe('JO')
  })

  it('returns first letters for two words', () => {
    expect(getInitials('John Doe')).toBe('JD')
  })

  it('ignores extra spaces', () => {
    expect(getInitials('  John   Doe  ')).toBe('JD')
  })
})

describe('isEmptyHTMLEditor', () => {
  it('detects empty html content', () => {
    expect(isEmptyHTMLEditor('<p></p>')).toBe(true)
    expect(isEmptyHTMLEditor('&nbsp;')).toBe(true)
    expect(isEmptyHTMLEditor('<br />')).toBe(true)
  })

  it('detects non-empty html content', () => {
    expect(isEmptyHTMLEditor('<p>Hello</p>')).toBe(false)
  })
})
