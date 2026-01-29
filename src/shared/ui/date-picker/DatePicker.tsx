import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { useTranslation } from 'react-i18next'

import { cn } from '@/shared/lib'
import {
  Button,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/shared/ui/shadcn'

import type { ComponentProps } from 'react'
import type { DayPickerProps } from 'react-day-picker'
import type { ControllerRenderProps, FieldValues } from 'react-hook-form'

type Props<T extends FieldValues> = DayPickerProps & {
  buttonVariant?: ComponentProps<typeof Button>['variant']
  field?: ControllerRenderProps<T>
}

export const DatePicker = <T extends FieldValues>({
  field,
  ...props
}: Props<T>) => {
  const { t } = useTranslation()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-62.5 justify-between text-left font-normal',
            !field?.value && 'text-muted-foreground'
          )}
        >
          {field?.value ? format(field?.value, 'PPP') : t('selectPlaceholder')}
          <CalendarIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          captionLayout="dropdown"
          selected={field?.value}
          onSelect={field?.onChange}
          {...props}
        />
      </PopoverContent>
    </Popover>
  )
}
