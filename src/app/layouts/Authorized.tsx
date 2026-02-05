import { Outlet } from 'react-router-dom'

import { useUsersPresenceSocket } from '@/entities/user'
import { useScrollToTop } from '@/shared/hooks'
import { Container } from '@/shared/ui'
import { Header } from '@/widgets/header'

import { ProtectedRoute } from '../router/ProtectedRoute'

export const AuthorizedLayout = () => {
  useUsersPresenceSocket()

  useScrollToTop()

  return (
    <ProtectedRoute>
      <Container>
        <Header className="mb-6 max-lg:mb-5 max-md:mb-4 max-sm:mb-3" />

        <Outlet />
      </Container>
    </ProtectedRoute>
  )
}
