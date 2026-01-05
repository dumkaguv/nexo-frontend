import DOMPurify from 'dompurify'

import { cn } from '@/utils'

import type { ComponentProps } from 'react'

type Props = {
  content: string
} & ComponentProps<'div'>

export const TipTapEditorPreview = ({
  content,
  className,
  ...props
}: Props) => (
  <div
    dangerouslySetInnerHTML={{
      __html: DOMPurify.sanitize(content)
    }}
    className={cn('tiptap min-w-0 wrap-break-word break-all', className)}
    {...props}
  />
)
