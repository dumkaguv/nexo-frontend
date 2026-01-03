import { AlertTriangle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useRouteError, isRouteErrorResponse } from 'react-router-dom'

import { Container } from '@/components/shared/Container'
import { Button } from '@/components/ui/Button'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from '@/components/ui/Empty'

export const RouterErrorFallback = () => {
  const { t } = useTranslation()
  const err = useRouteError()

  let message = t('error.errorOccurred')

  if (isRouteErrorResponse(err)) {
    message = `${err.status} ${err.statusText}`
  } else if (err instanceof Error) {
    message = err.message
  } else if (typeof err === 'string') {
    message = err
  }

  return (
    <Container className="flex flex-col items-center justify-center p-6">
      <Empty className="max-w-md">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <AlertTriangle className="text-destructive" />
          </EmptyMedia>
          <EmptyTitle>{t('error.somethingWentWrong')}</EmptyTitle>
          <EmptyDescription>{message}</EmptyDescription>
        </EmptyHeader>

        <Button onClick={() => window.location.reload()} className="mt-4">
          {t('error.tryAgain')}
        </Button>
      </Empty>
    </Container>
  )
}
