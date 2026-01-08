import { ErrorBoundary } from 'react-error-boundary'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import {
  ErrorFallback,
  NotFound,
  RouterErrorFallback
} from '@/components/shared'
import { AuthorizedLayout } from '@/layouts/Authorized'

import { NotAuthorizedLayout } from '@/layouts/NotAuthorized'

import { paths } from './paths'
import { RouteLoader } from './RouteLoader'

const router = createBrowserRouter([
  {
    hydrateFallbackElement: <div />,
    ErrorBoundary: RouterErrorFallback,
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
        path: paths.conversations.root,
        lazy: async () => {
          const { ConversationsPage } = await import('@/features/conversations')

          return { Component: ConversationsPage }
        },
        children: [
          {
            path: paths.conversations.new,
            lazy: async () => {
              const { Chat } = await import(
                '@/features/conversations/components'
              )

              return { Component: Chat }
            }
          },
          {
            path: paths.conversations.byId(':id'),
            lazy: async () => {
              const { Chat } = await import(
                '@/features/conversations/components'
              )

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
    hydrateFallbackElement: <div />,
    ErrorBoundary: RouterErrorFallback,
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
        path: '*',
        element: <NotFound />
      }
    ]
  }
])

export const AppRouter = () => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <RouterProvider router={router} />
  </ErrorBoundary>
)
