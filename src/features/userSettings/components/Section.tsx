import { useTranslation } from 'react-i18next'

import { Typography } from '@/components/shared'
import { Button } from '@/components/ui'
import { cn } from '@/utils'

import type { ReactNode } from 'react'

type Props = {
  title: string
  isPending: boolean
  children: ReactNode
  className?: string
}

export const Section = ({ title, isPending, children, className }: Props) => {
  const { t } = useTranslation()

  return (
    <section
      className={cn('border-foreground/20 rounded-xl border p-4', className)}
    >
      <Typography.Title level={2} className="text-primary text-lg font-bold">
        {t(title)}
      </Typography.Title>

      {children}

      <Button
        type="submit"
        size="lg"
        loading={isPending}
        className="self-start"
      >
        {t('saveChanges')}
      </Button>
    </section>
  )
}
