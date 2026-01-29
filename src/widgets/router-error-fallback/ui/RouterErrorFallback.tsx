import { AlertTriangle, RotateCcw } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useRouteError, isRouteErrorResponse } from 'react-router-dom'

import { Container } from '@/shared/ui'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  Button
} from '@/shared/ui/shadcn'

export const RouterErrorFallback = () => {
  const { t } = useTranslation()
  const err = useRouteError()

  let message = t('errorOccurred')

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
          <EmptyTitle>{t('somethingWentWrong')}</EmptyTitle>
          <EmptyDescription>{message}</EmptyDescription>
        </EmptyHeader>

        <Button onClick={() => window.location.reload()}>
          <RotateCcw />
          {t('tryAgain')}
        </Button>
      </Empty>
    </Container>
  )
}
