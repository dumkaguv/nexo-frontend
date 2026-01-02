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

type Props = {
  error: Error
  resetErrorBoundary: () => void
}

export const ErrorFallback = ({ error, resetErrorBoundary }: Props) => {
  const { t } = useTranslation()

  return (
    <Container className="flex flex-col items-center justify-center p-6">
      <Empty className="max-w-md">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <AlertTriangle className="text-destructive" />
          </EmptyMedia>
          <EmptyTitle>{t('error.somethingWentWrong')}</EmptyTitle>
          <EmptyDescription>
            {error.message || t('error.errorOccurred')}
          </EmptyDescription>
        </EmptyHeader>
        <Button onClick={resetErrorBoundary} variant="default" className="mt-4">
          {t('error.tryAgain')}
        </Button>
      </Empty>
    </Container>
  )
}
