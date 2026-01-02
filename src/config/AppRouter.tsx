import { ErrorBoundary } from 'react-error-boundary'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { ErrorFallback, NotFound } from '@/components/shared'
import { AuthorizedLayout } from '@/layouts/Authorized'

import { NotAuthorizedLayout } from '@/layouts/NotAuthorized'

import { paths } from './paths'
import { RouteLoader } from './RouteLoader'

const router = createBrowserRouter([
  {
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
      },
      {
        path: paths.messages.root,
        lazy: async () => {
          const { MessagesPage } = await import('@/features/messages')

          return { Component: MessagesPage }
        },
        children: [
          {
            path: ':id',
            lazy: async () => {
              const { Chat } = await import('@/features/messages/components')

              return { Component: Chat }
            }
          }
        ]
      },
      {
        path: paths.user.byId(':id'),
        lazy: async () => {
          const { UserPage } = await import('@/features/user/pages')

          return { Component: UserPage }
        }
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  },
  {
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
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
])

export const AppRouter = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <RouterProvider router={router}>
        <RouteLoader />
      </RouterProvider>
    </ErrorBoundary>
  )
}
