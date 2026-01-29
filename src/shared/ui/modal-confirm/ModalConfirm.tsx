import { Check, X } from 'lucide-react'
import { type PropsWithChildren, useState, type MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Spinner,
  type ButtonProps
} from '@/shared/ui/shadcn'

type Props = {
  onOk: () => void | Promise<void>
  okButtonProps?: ButtonProps
  title?: string
} & PropsWithChildren

export const ModalConfirm = ({
  onOk: onOkCb,
  okButtonProps,
  title,
  children
}: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const { t } = useTranslation()

  const onOk = async (e: MouseEvent) => {
    e.preventDefault()
    await onOkCb()
    setIsOpen(false)
  }

  const isPending = okButtonProps?.disabled || okButtonProps?.loading

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {title ?? t('areYouAbsolutelySure')}
          </AlertDialogTitle>
          <AlertDialogDescription />
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            <X />
            {t('cancel')}
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive/70 hover:bg-destructive/80"
            onClick={onOk}
            disabled={isPending}
          >
            {isPending ? <Spinner /> : <Check />} {t('confirm')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
