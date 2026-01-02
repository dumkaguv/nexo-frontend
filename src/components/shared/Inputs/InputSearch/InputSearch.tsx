import { Search, X } from 'lucide-react'
import { type ComponentProps, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Typography } from '@/components/shared'
import {
  Button,
  Input,
  Spinner,
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui'
import { cn } from '@/utils'

import type { ChangeEvent } from 'react'

type Props = {
  onButtonClearClick?: () => void
  inputClassName?: string
  loading?: boolean
} & ComponentProps<'input'>

export const InputSearch = ({
  value,
  defaultValue,
  placeholder,
  onChange,
  onButtonClearClick,
  className,
  inputClassName,
  loading,
  ...props
}: Props) => {
  const { t } = useTranslation()

  const [innerValue, setInnerValue] = useState<string>(
    String(defaultValue ?? '')
  )

  const isControlled = value !== undefined
  const currentValue = isControlled ? String(value ?? '') : innerValue

  const onChangeInner = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInnerValue(e.target.value)
    }

    onChange?.(e)
  }

  const onClear = () => {
    if (!isControlled) setInnerValue('')
    onChange?.({ target: { value: '' } } as ChangeEvent<HTMLInputElement>)
    onButtonClearClick?.()
  }

  const showClear = currentValue.length > 0

  return (
    <div className={cn('relative h-fit', className)}>
      <Input
        {...props}
        value={currentValue}
        onChange={onChangeInner}
        className={cn('bg-custom-gray h-10 px-8', inputClassName)}
        placeholder={placeholder ?? t('inputs.inputSearch')}
      />

      <Search
        size={16}
        className="pointer-events-none absolute inset-y-0 left-2 my-auto opacity-50"
      />

      {showClear && (
        <Tooltip>
          <TooltipContent>{t('clear')}</TooltipContent>
          <TooltipTrigger asChild>
            <Button
              type="button"
              className="absolute top-1/2 right-0 mr-2 -translate-y-1/2 opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600"
              onClick={onClear}
              variant="link"
            >
              <X size={16} className="text-gray-600 dark:text-gray-400" />
            </Button>
          </TooltipTrigger>
        </Tooltip>
      )}

      {loading && (
        <div className="absolute top-1/2 right-11 -translate-y-1/2">
          <div className="flex items-center gap-2 px-2">
            <Spinner className="size-3" />
            <Typography.Text className="text-muted-foreground text-sm">
              {t('loading')}
            </Typography.Text>
          </div>
        </div>
      )}
    </div>
  )
}
