import { Outlet } from 'react-router-dom'

import { Container, HeaderUnAuthorized } from '@/components/shared'

export const NotAuthorizedLayout = () => {
  return (
    <>
      <HeaderUnAuthorized />

      <Container className="flex min-h-[calc(100dvh-var(--header-height))] flex-col items-center justify-center py-5">
        <Outlet />
      </Container>
    </>
  )
}
