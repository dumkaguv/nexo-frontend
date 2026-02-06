import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/shared/ui/shadcn'

import { StoryViewerList } from './viewers'

import type { DialogProps } from '@radix-ui/react-dialog'

type Props = {
  title: string
  storyId?: number
} & DialogProps

export const StoryViewersModal = ({ title, storyId, ...props }: Props) => {
  const { t } = useTranslation()
  const contentRef = useRef<HTMLDivElement | null>(null)

  return (
    <Dialog {...props}>
      <DialogContent
        aria-describedby={undefined}
        ref={contentRef}
        tabIndex={-1}
        showCloseButton={false}
        onOpenAutoFocus={(event) => {
          event.preventDefault()
          contentRef.current?.focus()
        }}
      >
        <DialogHeader className="mb-3">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="sr-only">
            {t('viewers')}
          </DialogDescription>
        </DialogHeader>
        <StoryViewerList storyId={storyId} onOpenChange={props.onOpenChange} />
      </DialogContent>
    </Dialog>
  )
}
