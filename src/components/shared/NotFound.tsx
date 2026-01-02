import { FileQuestion } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

import { Container } from '@/components/shared/Container'
import { Button } from '@/components/ui/Button'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from '@/components/ui/Empty'
import { paths } from '@/config/paths'

export const NotFound = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <Container className="flex flex-col items-center justify-center p-6">
      <Empty className="max-w-md">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FileQuestion className="text-muted-foreground" />
          </EmptyMedia>
          <EmptyTitle>{t('pageNotFound')}</EmptyTitle>
          <EmptyDescription>{t('pageNotFoundDescription')}</EmptyDescription>
        </EmptyHeader>
        <div className="mt-4 flex gap-3">
          <Button onClick={() => navigate(-1)} variant="outline">
            {t('goBack')}
          </Button>
          <Button asChild variant="default">
            <Link to={paths.home.root}>{t('goToHome')}</Link>
          </Button>
        </div>
      </Empty>
    </Container>
  )
}
