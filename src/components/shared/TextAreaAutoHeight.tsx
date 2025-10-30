import { useTranslation } from 'react-i18next'

import { Textarea } from '@/components/ui'
import { cn } from '@/utils'

import type { ComponentProps, FormEvent } from 'react'

export const TextAreaAutoHeight = (props: ComponentProps<'textarea'>) => {
  const { t } = useTranslation()

  const onInput = (e: FormEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget
    target.style.height = 'auto'
    target.style.height = `${target.scrollHeight}px`
  }

  return (
    <Textarea
      className={cn(
        'field-sizing-fixed h-auto resize-none overflow-hidden pt-3 outline-0',
        props.className
      )}
      placeholder={props.placeholder ?? t('shareYourThoughts')}
      onInput={onInput}
      {...props}
    />
  )
}
