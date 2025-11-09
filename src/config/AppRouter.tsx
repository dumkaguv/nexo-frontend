import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { AuthorizedLayout } from '@/layouts/Authorized'

import { NotAuthorizedLayout } from '@/layouts/NotAuthorized'

import { paths } from './paths'
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
        path: paths.home.root,
        lazy: async () => {
          const { FeedPage } = await import('@/features/feed')

          return { Component: FeedPage }
        }
      },
      {
        path: paths.settings.account,
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
        path: paths.auth.login,
        lazy: async () => {
          const { LoginPage } = await import('@/features/auth')

          return { Component: LoginPage }
        }
      },
      {
        path: paths.auth.register,
        lazy: async () => {
          const { RegisterPage } = await import('@/features/auth')

          return { Component: RegisterPage }
        }
      },
      {
        path: `:userId`,
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
