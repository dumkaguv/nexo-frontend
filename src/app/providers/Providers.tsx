import { QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'

import { AppRouter } from '@/app/router'
import { i18n } from '@/shared/config'
import { queryClient } from '@/shared/lib/api/tanstackQueryClient'
import { useThemeStore } from '@/shared/model'
import { Toaster } from '@/shared/ui/shadcn'

import { WebSocketProvider } from './WebSocketProvider'

export const Providers = () => {
  const { applyTheme } = useThemeStore()

  useEffect(() => applyTheme(), [applyTheme])

  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <WebSocketProvider>
          <AppRouter />
          <Toaster />
        </WebSocketProvider>
      </I18nextProvider>
    </QueryClientProvider>
  )
}
