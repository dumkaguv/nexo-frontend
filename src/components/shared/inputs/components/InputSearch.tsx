import { Search, X } from 'lucide-react'
import { ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'

import { Button, Input } from '@/components/ui'
import { cn } from '@/utils'

type Props = ComponentProps<'input'> & {
  onButtonClearClick?: () => void
}

export const InputSearch = ({
  placeholder,
  onButtonClearClick,
  className,
  ...rest
}: Props) => {
  const { t } = useTranslation()

  return (
    <div className={cn('relative h-fit', className)}>
      <Input
        className="bg-custom-gray px-8"
        placeholder={placeholder ?? t('inputs.inputSearch')}
        {...rest}
      />
      <Search
        size={16}
        className="pointer-events-none absolute inset-y-0 left-2 my-auto opacity-50"
      />
      {onButtonClearClick && (
        <Button
          className="absolute top-1/2 right-0 -translate-y-1/2 opacity-50"
          onClick={onButtonClearClick}
          variant="link"
        >
          <X size={16} className="text-gray-600" />
        </Button>
      )}
    </div>
  )
}
