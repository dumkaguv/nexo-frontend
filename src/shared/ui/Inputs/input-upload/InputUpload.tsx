import { Slot } from '@radix-ui/react-slot'
import { Upload } from 'lucide-react'
import {
  useRef,
  type ChangeEvent,
  type ComponentProps,
  type PropsWithChildren
} from 'react'
import { useTranslation } from 'react-i18next'

import { cn } from '@/shared/lib'
import { Button, FieldLabel, Input } from '@/shared/ui/shadcn'

type Props = {
  label?: string
  accept?: string
  multiple?: boolean
  className?: string
  onChange?: (files: File[]) => void
} & Omit<ComponentProps<'input'>, 'onChange'> &
  PropsWithChildren

export const InputUpload = ({
  label,
  accept,
  multiple = false,
  className,
  onChange,
  children,
  ...props
}: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { t } = useTranslation()

  const onButtonClick = () => inputRef.current?.click()

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return
    }

    const files = Array.from(e.target.files)

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

      {children ? (
        <Slot onClick={onButtonClick}>{children}</Slot>
      ) : (
        <Button
          type="button"
          variant="outline"
          onClick={onButtonClick}
          className="flex items-center gap-2"
        >
          <Upload size={16} />
          {t('uploadFile')}
        </Button>
      )}
    </div>
  )
}
