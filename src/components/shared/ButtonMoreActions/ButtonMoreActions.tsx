import { Ellipsis } from 'lucide-react'

import { useTranslation } from 'react-i18next'

import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  type ButtonProps
} from '@/components/ui'

import { cn } from '@/utils'

import type { JSX } from 'react'

type Props = {
  icon?: JSX.Element
} & ButtonProps

export const ButtonMoreActions = ({
  icon: Icon,
  className,
  ...props
}: Props) => {
  const { t } = useTranslation()

  return (
    <Tooltip>
      <TooltipContent>{t('moreActions')}</TooltipContent>
      <TooltipTrigger asChild>
        <Button
          variant="text"
          className={cn(
            'hover:bg-secondary/80',
            !Icon && 'size-7 p-0!',
            className
          )}
          {...props}
        >
          {Icon ? Icon : <Ellipsis />}
        </Button>
      </TooltipTrigger>
    </Tooltip>
  )
}
