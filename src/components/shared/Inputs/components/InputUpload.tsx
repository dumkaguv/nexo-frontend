import { Upload } from 'lucide-react'

import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button, Input, Label } from '@/components/ui'
import { cn } from '@/utils'

import type { ChangeEvent} from 'react';

type Props = {
  label?: string
  accept?: string
  multiple?: boolean
  className?: string
  onChange?: (files: FileList | null) => void
  value?: FileList | null
}

export const InputUpload = ({
  label,
  accept,
  multiple,
  className,
  onChange,
  value
}: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [_F, setSelectedFiles] = useState<FileList | null>(value ?? null)

  const { t } = useTranslation()

  const handleButtonClick = () => {
    inputRef.current?.click()
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    setSelectedFiles(files)
    onChange?.(files)
  }

  return (
    <div className={cn('space-y-2', className)}>
      {label && <Label>{t(label)}</Label>}

      <Input
        type="file"
        ref={inputRef}
        onChange={handleChange}
        accept={accept}
        multiple={multiple}
        className="hidden"
      />

      <Button
        type="button"
        variant="outline"
        onClick={handleButtonClick}
        className="flex items-center gap-2"
      >
        <Upload className="h-4 w-4" />
        {t('uploadFile')}
      </Button>
    </div>
  )
}
