import { Outlet } from 'react-router-dom'

import { useUsersPresenceSocket } from '@/entities/user'
import { Container } from '@/shared/ui'
import { Header } from '@/widgets/header'

import { ProtectedRoute } from '../router/ProtectedRoute'

export const AuthorizedLayout = () => {
  useUsersPresenceSocket()

  return (
    <ProtectedRoute>
      <Container>
        <Header className="mb-4 sm:mb-6" />

        <Outlet />
      </Container>
    </ProtectedRoute>
  )
}
