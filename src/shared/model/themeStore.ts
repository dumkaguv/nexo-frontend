import { create } from 'zustand'

export type Theme = 'light' | 'dark' | 'system'

type ThemeStore = {
  theme: Theme
  setTheme: (theme: Theme) => void
  applyTheme: (theme?: Theme) => void
}

const storageKey = 'vite-ui-theme'

const getSystemTheme = (): Theme => {
  if (
    typeof window === 'undefined' ||
    typeof window.matchMedia !== 'function'
  ) {
    return 'light'
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

const resolveTheme = (theme: Theme): Theme =>
  theme === 'system' ? getSystemTheme() : theme

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: (localStorage.getItem(storageKey) as Theme | null) ?? getSystemTheme(),

  setTheme: (theme) => {
    localStorage.setItem(storageKey, theme)

    const appliedTheme = resolveTheme(theme)

    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(appliedTheme)

    set({ theme })
  },

  applyTheme: (theme) => {
    const current =
      theme ?? (localStorage.getItem(storageKey) as Theme | null) ?? 'system'

    const appliedTheme = resolveTheme(current)

    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(appliedTheme)

    set({ theme: current })
  }
}))
