/* eslint-disable @typescript-eslint/no-empty-function */

import '@testing-library/jest-dom'

import { vi, beforeAll } from 'vitest'

import type { ClassValue } from 'clsx'

beforeAll(() => {
  process.env.VITE_PUBLIC_API_URL ??= 'http://localhost:3000'
})

vi.mock('react-i18next', async () => {
  const actual =
    await vi.importActual<typeof import('react-i18next')>('react-i18next')

  return {
    ...actual,
    initReactI18next: {
      type: '3rdParty',
      init: () => {}
    },
    useTranslation: () => ({
      t: (key: string) => key
    })
  }
})

if (!globalThis.ResizeObserver) {
  globalThis.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
}

if (!window.matchMedia) {
  window.matchMedia = (query) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false
    }) as never
}

vi.mock('@/shared/lib', async () => {
  const actual =
    await vi.importActual<typeof import('@/shared/lib')>('@/shared/lib')

  return {
    ...actual,
    cn: (...args: ClassValue[]) =>
      args
        .flat()
        .filter((v): v is string => Boolean(v))
        .join(' ')
  }
})

vi.mock('@/shared/lib', async () => {
  const actual =
    await vi.importActual<typeof import('@/shared/lib')>('@/shared/lib')

  return {
    ...actual,
    cn: (...args: ClassValue[]) =>
      args
        .flat()
        .filter((v): v is string => Boolean(v))
        .join(' ')
  }
})

vi.mock('@tanstack/react-query', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@tanstack/react-query')>()

  return {
    ...actual,

    QueryClient: actual.QueryClient,
    QueryClientProvider: actual.QueryClientProvider,

    useQuery: vi.fn(),
    useInfiniteQuery: vi.fn(),
    useMutation: vi.fn(),
    useQueryClient: vi.fn()
  }
})
