import 'dayjs/locale/ru'
import 'dayjs/locale/en'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

import { useTranslation } from 'react-i18next'

import { i18n } from '@/config/i18n'
import { cn } from '@/utils'

import { Typography } from './Typography'

import type { Dayjs } from 'dayjs'
import type { ComponentProps } from 'react'

const { Text } = Typography

dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)

dayjs.locale(i18n.language)

i18n.on('languageChanged', (lng) => {
  dayjs.locale(lng.toLowerCase().split('-')[0])
})

type Props = {
  date: string | Date | Dayjs
  showIcon?: boolean
  className?: string
} & ComponentProps<'span'>

export const DayLabel = ({
  date,
  showIcon = true,
  className,
  ...props
}: Props) => {
  const { t } = useTranslation()

  const d = dayjs(date)
  const now = dayjs()

  let label: string

  if (d.isSame(now, 'day')) {
    label = `${t('today_at')} ${d.format('HH:mm')}`
  } else if (d.isAfter(now.subtract(7, 'day'))) {
    label = d.fromNow()
  } else {
    label = d.format('D MMMM YYYY')
  }

  return (
    <>
      {showIcon ? (
        <div className="ml-1 flex items-center justify-center gap-1.5">
          <div className="-mt-0.5 size-[5px] rounded-full bg-neutral-300 dark:bg-neutral-500" />
          <Text className={cn('text-sm', className)} {...props}>
            {label}
          </Text>
        </div>
      ) : (
        <Text className={cn('text-sm', className)} {...props}>
          {label}
        </Text>
      )}
    </>
  )
}
