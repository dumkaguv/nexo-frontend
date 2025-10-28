import { Upload } from 'lucide-react'

import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button, FieldLabel, Input } from '@/components/ui'
import { cn } from '@/utils'

import type { ChangeEvent, ComponentProps } from 'react'

type Props = {
  label?: string
  accept?: string
  multiple?: boolean
  className?: string
  onChange?: (files: FileList | null) => void
  value?: FileList | null
} & Omit<ComponentProps<'input'>, 'value' | 'onChange'>

export const InputUpload = ({
  label,
  accept,
  multiple,
  className,
  onChange,
  value,
  ...props
}: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [_F, setSelectedFiles] = useState<FileList | null>(value ?? null)

  const { t } = useTranslation()

  const onButtonClick = () => inputRef.current?.click()

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    setSelectedFiles(files)
    onChange?.(files)
  }

  return (
    <div className={cn('space-y-2', className)}>
      {label && <FieldLabel>{t(label)}</FieldLabel>}

      <Input
        type="file"
        ref={inputRef}
        onChange={onChangeInput}
        accept={accept}
        multiple={multiple}
        className="hidden"
        {...props}
      />

      <Button
        type="button"
        variant="outline"
        onClick={onButtonClick}
        className="flex items-center gap-2"
      >
        <Upload size={16} />
        {t('uploadFile')}
      </Button>
    </div>
  )
}
