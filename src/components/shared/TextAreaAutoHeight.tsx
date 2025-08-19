import { useTranslation } from 'react-i18next'

import type { ComponentProps, FormEvent } from 'react'

export const TextAreaAutoHeight = (props: ComponentProps<'textarea'>) => {
  const { t } = useTranslation()

  return (
    <textarea
      className="h-auto w-full resize-none overflow-hidden pt-3 outline-0"
      id="postCreateTextarea"
      placeholder={t('shareYourThoughts')}
      onInput={(e: FormEvent<HTMLTextAreaElement>) => {
        const target = e.currentTarget
        target.style.height = 'auto'
        target.style.height = `${target.scrollHeight}px`
      }}
      {...props}
    />
  )
}
