import { QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { I18nextProvider } from 'react-i18next'

import { useThemeStore } from '@/stores'

import { AppRouter, i18n, queryClient } from './'

export const Providers = () => {
  const { applyTheme } = useThemeStore()

  useEffect(() => {
    applyTheme()
  }, [applyTheme])

  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <AppRouter />
        <Toaster />
      </I18nextProvider>
    </QueryClientProvider>
  )
}
