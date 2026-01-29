/* eslint-disable func-style */

import * as React from 'react'
import { useTranslation } from 'react-i18next'

import { cn } from '@/shared/lib/index'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  const { t } = useTranslation()

  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 hover:bg-input/20 dark:hover:bg-input/35 flex min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className
      )}
      placeholder={t('defaultPlaceholder')}
      {...props}
    />
  )
}

export { Textarea }
