import { Outlet } from 'react-router-dom'

import { Container, Header } from '@/components/shared'
import { ProtectedRoute } from '@/features/auth'

export const AuthorizedLayout = () => (
  <ProtectedRoute>
    <Container>
      <Header className="mb-6" />

      <Outlet />
    </Container>
  </ProtectedRoute>
)
