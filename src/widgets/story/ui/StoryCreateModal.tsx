import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useAuthStore } from '@/entities/session'
import { useCreateStory } from '@/features/story'
import { cn } from '@/shared/lib'
import { ImagePreview, InputUpload } from '@/shared/ui'
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/shared/ui/shadcn'

type Props = {
  open: boolean
  onOpenChange: (nextOpen: boolean) => void
}

export const StoryCreateModal = ({ open, onOpenChange }: Props) => {
  const { t } = useTranslation()
  const { user } = useAuthStore()

  const [previewFile, setPreviewFile] = useState<File | undefined>()
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { createStory, isPending } = useCreateStory({ userId: user?.id })

  useEffect(() => {
    if (open) {
      return
    }

    setPreviewFile(undefined)
    setFiles([])
  }, [open])

  const onPreviewChange = (nextFiles: File[]) => {
    setPreviewFile(nextFiles[0])
  }

  const onFilesChange = (nextFiles: File[]) => {
    if (!nextFiles.length) {
      return
    }

    setFiles((prev) => [...prev, ...nextFiles])
  }

  const onDeleteFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const onSubmit = async () => {
    if (isSubmitting) {
      return
    }

    if (!previewFile || files.length === 0) {
      return
    }

    setIsSubmitting(true)

    try {
      await createStory({ previewFile, files })
      onOpenChange(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  const previewFiles = useMemo(
    () => (previewFile ? [previewFile] : []),
    [previewFile]
  )

  const canSubmit =
    !!previewFile && files.length > 0 && !isPending && !isSubmitting

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onOpenAutoFocus={() => undefined}>
        <DialogHeader>
          <DialogTitle>{t('addStory')}</DialogTitle>
          <DialogDescription className="sr-only">
            {t('preview')}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <InputUpload
              label="preview"
              accept="image/*,video/*"
              onChange={onPreviewChange}
            />
            {previewFile && (
              <ImagePreview
                files={previewFiles}
                className="size-24"
                containerClassName="mt-2"
              />
            )}
          </div>

          <div className="flex flex-col gap-2">
            <InputUpload
              label="uploadFile"
              accept="image/*,video/*"
              multiple
              onChange={onFilesChange}
            />
            <ImagePreview
              files={files}
              className="size-24"
              showDeleteIcon
              isPending={isPending}
              onDeleteImage={onDeleteFile}
              containerClassName={cn(
                'mt-2 grid gap-3',
                files.length === 2 && 'grid-cols-2',
                files.length >= 3 && 'grid-cols-3'
              )}
            />
          </div>

          <Button
            onClick={onSubmit}
            disabled={!canSubmit}
            loading={isPending || isSubmitting}
          >
            {t('publish')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
