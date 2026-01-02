import { describe, expect, it } from 'vitest'

import { getTextColorForBackground, stringToColor } from '@/utils/color'

describe('getTextColorForBackground', () => {
  it('returns black for light backgrounds', () => {
    expect(getTextColorForBackground('hsl(200, 65%, 61%)')).toBe('#000')
  })

  it('returns white for dark backgrounds', () => {
    expect(getTextColorForBackground('hsl(200, 65%, 30%)')).toBe('#fff')
  })

  it('returns white for invalid format', () => {
    expect(getTextColorForBackground('invalid')).toBe('#fff')
  })
})

describe('stringToColor', () => {
  it('returns deterministic color for same input', () => {
    expect(stringToColor('test')).toBe(stringToColor('test'))
  })

  it('returns valid hsl format', () => {
    const value = stringToColor('example')
    const match = value.match(/^hsl\((\d+), 65%, 60%\)$/)

    expect(match).not.toBeNull()

    if (!match) {
      return
    }

    const hue = Number(match[1])

    expect(hue).toBeGreaterThanOrEqual(0)
    expect(hue).toBeLessThan(360)
  })
})
