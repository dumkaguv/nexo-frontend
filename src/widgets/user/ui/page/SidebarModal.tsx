import { useTranslation } from 'react-i18next'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/shared/ui/shadcn'

import { Sidebar } from './Sidebar'

import type { ResponseUserDto } from '@/shared/api'

import type { DialogProps } from '@radix-ui/react-dialog'

type Props = {
  userData?: ResponseUserDto
} & DialogProps

export const SidebarModal = ({ userData, ...props }: Props) => {
  const { t } = useTranslation()

  return (
    <Dialog {...props}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader className="mb-5">
          <DialogTitle>{t('about')}</DialogTitle>
        </DialogHeader>

        <Sidebar userData={userData} showTitle={false} />
      </DialogContent>
    </Dialog>
  )
}
