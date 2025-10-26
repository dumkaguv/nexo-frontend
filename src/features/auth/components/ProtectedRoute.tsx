import { Navigate } from 'react-router-dom'

import { paths } from '@/config'
import { useProtectedRoute } from '@/features/auth/hooks'

import type { PropsWithChildren } from 'react'

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const isAuth = useProtectedRoute()
  if (!isAuth) {
    return <Navigate to={paths.auth.login} />
  }

  return children
}
