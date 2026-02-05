export const LocalStorage = {
  token: 'token'
} as const

export const emptyHtmlRegex =
  /^(\s|&nbsp;|<br\s*\/?>|<\/?p>|<[^>]*?>|\u200B)*$/i

export const Breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280
} as const

export const BreakpointsMax = {
  sm: Breakpoints.sm - 1,
  md: Breakpoints.md - 1,
  lg: Breakpoints.lg - 1,
  xl: Breakpoints.xl - 1
} as const
