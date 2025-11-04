import { Ellipsis } from 'lucide-react'

import { useTranslation } from 'react-i18next'

import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui'

import type { ComponentProps } from 'react'

export const ButtonMoreActions = (props: ComponentProps<'button'>) => {
  const { t } = useTranslation()

  return (
    <Tooltip>
      <TooltipContent>{t('moreActions')}</TooltipContent>
      <TooltipTrigger asChild>
        <Button
          variant="text"
          className="hover:bg-secondary/80 size-7 !p-0"
          {...props}
        >
          <Ellipsis />
        </Button>
      </TooltipTrigger>
    </Tooltip>
  )
}
