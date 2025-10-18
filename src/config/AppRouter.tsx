import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { AuthorizedLayout, NotAuthorizedLayout } from '@/layouts'

import { Routes as RoutesConfig } from './'
import { RouteLoader } from './RouteLoader'

const router = createBrowserRouter([
  {
    hydrateFallbackElement: <div></div>,
    element: (
      <>
        <RouteLoader />
        <AuthorizedLayout />
      </>
    ),
    children: [
      {
        path: RoutesConfig.home,
        lazy: async () => {
          const { HomePage } = await import('@/features/home')

          return { Component: HomePage }
        }
      },
      {
        path: RoutesConfig.settings.account,
        lazy: async () => {
          const { SettingsPage } = await import('@/features/userSettings')

          return { Component: SettingsPage }
        }
      }
    ]
  },
  {
    hydrateFallbackElement: <div></div>,
    element: (
      <>
        <RouteLoader />
        <NotAuthorizedLayout />
      </>
    ),
    children: [
      {
        path: RoutesConfig.login,
        lazy: async () => {
          const { LoginPage } = await import('@/features/auth')

          return { Component: LoginPage }
        }
      },
      {
        path: RoutesConfig.register,
        lazy: async () => {
          const { RegisterPage } = await import('@/features/auth')

          return { Component: RegisterPage }
        }
      },
      {
        path: `${RoutesConfig.activate}/:userId`,
        lazy: async () => {
          const { ActivateAccountPage } = await import('@/features/auth')

          return { Component: ActivateAccountPage }
        }
      }
    ]
  }
])

export const AppRouter = () => {
  return (
    <RouterProvider router={router} fallbackElement={<div>Loading...</div>}>
      <RouteLoader />
    </RouterProvider>
  )
}
