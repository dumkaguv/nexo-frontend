/* eslint-disable func-style */

import { useTranslation } from 'react-i18next'

import { cn } from '@/shared/lib'

import type { ComponentProps } from 'react'

function Input({
  placeholder,
  type,
  className,
  ...props
}: ComponentProps<'input'>) {
  const { t } = useTranslation()

  return (
    <input
      type={type}
      placeholder={placeholder ?? t('defaultPlaceholder')}
      data-slot="input"
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-12 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'hover:border-primary',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className
      )}
      {...props}
    />
  )
}

export { Input }
