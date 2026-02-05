import { Outlet } from 'react-router-dom'

import { useScrollToTop } from '@/shared/hooks'
import { Container } from '@/shared/ui'
import { HeaderUnAuthorized } from '@/widgets/header'

export const NotAuthorizedLayout = () => {
  useScrollToTop()

  return (
    <>
      <HeaderUnAuthorized />

      <Container className="flex min-h-[calc(100dvh-var(--header-height))] flex-col items-center justify-center py-4 sm:py-5">
        <Outlet />
      </Container>
    </>
  )
}
