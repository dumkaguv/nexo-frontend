import { Navigate } from 'react-router-dom'

import { useProtectedRoute } from '@/entities/session'
import { paths } from '@/shared/config'

import type { PropsWithChildren } from 'react'

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const isAuth = useProtectedRoute()

  if (!isAuth) {
    return <Navigate to={paths.auth.login} />
  }

  return children
}
