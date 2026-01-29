import { useTranslation } from 'react-i18next'

import { cn } from '@/shared/lib'
import { Typography } from '@/shared/ui'
import { Spinner } from '@/shared/ui/shadcn'

import type { ComponentProps } from 'react'

export const HeaderSearchLoading = ({
  className,
  ...props
}: ComponentProps<'div'>) => {
  const { t } = useTranslation()

  return (
    <div className={cn('flex items-center gap-2 px-2', className)} {...props}>
      <Spinner className="size-3" />{' '}
      <Typography.Text className="text-muted-foreground text-sm">
        {t('loading')}
      </Typography.Text>
    </div>
  )
}
