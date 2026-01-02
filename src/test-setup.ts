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
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      init: () => {}
    },
    useTranslation: () => ({
      t: (key: string) => key
    })
  }
})
