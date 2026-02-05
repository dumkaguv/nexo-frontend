import { ErrorBoundary } from 'react-error-boundary'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { AuthorizedLayout, NotAuthorizedLayout } from '@/app/layouts'
import { NotFoundPage } from '@/pages/not-found'
import { paths } from '@/shared/config'
import { ErrorFallback } from '@/widgets/error-fallback'
import { RouterErrorFallback } from '@/widgets/router-error-fallback'

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
          const { FeedPage } = await import('@/pages/feed')

          return { Component: FeedPage }
        }
      },
      {
        path: paths.settings.account,
        lazy: async () => {
          const { UserSettingsPage } = await import('@/pages/user')

          return { Component: UserSettingsPage }
        }
      },
      {
        path: paths.conversations.root,
        lazy: async () => {
          const { ConversationPage } = await import('@/pages/conversation')

          return { Component: ConversationPage }
        },
        children: [
          {
            path: paths.conversations.new,
            lazy: async () => {
              const { Chat } = await import('@/widgets/chat')

              return { Component: Chat }
            }
          },
          {
            path: paths.conversations.byId(':id'),
            lazy: async () => {
              const { Chat } = await import('@/widgets/chat')

              return { Component: Chat }
            }
          }
        ]
      },

      {
        path: paths.user.byId(':id'),
        lazy: async () => {
          const { UserPage } = await import('@/pages/user')

          return { Component: UserPage }
        }
      },
      {
        path: '*',
        element: <NotFoundPage />
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
          const { LoginPage } = await import('@/pages/auth')

          return { Component: LoginPage }
        }
      },
      {
        path: paths.auth.register,
        lazy: async () => {
          const { RegisterPage } = await import('@/pages/auth')

          return { Component: RegisterPage }
        }
      },
      {
        path: '*',
        element: <NotFoundPage />
      }
    ]
  }
])

export const AppRouter = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <RouterProvider router={router} />
    </ErrorBoundary>
  )
}
