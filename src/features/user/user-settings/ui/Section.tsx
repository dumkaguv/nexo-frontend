import { Bookmark } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { cn } from '@/shared/lib'
import { Typography } from '@/shared/ui'
import { Button } from '@/shared/ui/shadcn'

import type { PropsWithChildren } from 'react'

type Props = {
  titleKey: string
  isPending: boolean
  className?: string
} & PropsWithChildren

export const Section = ({
  titleKey,
  isPending,
  children,
  className
}: Props) => {
  const { t } = useTranslation()

  return (
    <section
      className={cn('border-foreground/20 rounded-xl border p-4', className)}
    >
      <Typography.Title
        level={2}
        className="text-primary text-lg font-bold max-lg:text-lg"
      >
        {t(titleKey)}
      </Typography.Title>

      {children}

      <Button
        type="submit"
        size="lg"
        loading={isPending}
        className="self-start"
      >
        <Bookmark />
        {t('saveChanges')}
      </Button>
    </section>
  )
}
