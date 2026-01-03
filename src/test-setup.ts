/* eslint-disable @typescript-eslint/no-empty-function */

import '@testing-library/jest-dom'

import { vi, beforeAll } from 'vitest'

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

vi.mock('@/utils/cn', async () => {
  const actual =
    await vi.importActual<typeof import('@/utils/cn')>('@/utils/cn')

  return {
    ...actual,
    cn: actual.cn
  }
})

vi.mock('@/utils', async () => {
  const actual = await vi.importActual<typeof import('@/utils')>('@/utils')

  return {
    ...actual,
    cn: actual.cn
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
