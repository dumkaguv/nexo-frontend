import { AlertTriangle } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Container } from '@/components/shared/Container'
import { Button } from '@/components/ui/Button'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from '@/components/ui/Empty'

export type ErrorFallbackProps = {
  error?: Error
  resetErrorBoundary?: () => void
}

export const ErrorFallback = ({
  error,
  resetErrorBoundary
}: ErrorFallbackProps) => {
  const { t } = useTranslation()

  return (
    <Container className="flex flex-col items-center justify-center p-6">
      <Empty className="max-w-md">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <AlertTriangle className="text-destructive" />
          </EmptyMedia>
          <EmptyTitle>{t('somethingWentWrong')}</EmptyTitle>
          <EmptyDescription>
            {error?.message || t('errorOccurred')}
          </EmptyDescription>
        </EmptyHeader>
        <Button onClick={resetErrorBoundary} variant="default" className="mt-4">
          {t('tryAgain')}
        </Button>
      </Empty>
    </Container>
  )
}
