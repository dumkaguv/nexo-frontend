import { Outlet } from 'react-router-dom'

import { Container, Header } from '@/components/shared'
import { ProtectedRoute } from '@/features/auth'
import { useUsersPresenceSocket } from '@/hooks'

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
