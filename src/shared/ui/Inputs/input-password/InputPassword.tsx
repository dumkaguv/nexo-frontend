import { Eye, EyeOff } from 'lucide-react'

import { useState, type ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'

import { cn } from '@/shared/lib'
import { Button, Input } from '@/shared/ui/shadcn'

type Props = ComponentProps<'input'>

export const InputPassword = ({ className, ...rest }: Props) => {
  const [isShowed, setIsShowed] = useState(false)

  const { t } = useTranslation()

  const onShow = () => setIsShowed((prev) => !prev)

  return (
    <div className="flex h-12 items-center">
      <Input
        type={isShowed ? 'text' : 'password'}
        placeholder={t('inputPassword')}
        className={cn('flex-1 rounded-r-none', className)}
        autoComplete="current-password"
        {...rest}
      />
      <Button
        type="button"
        onClick={onShow}
        variant="outline"
        size="icon"
        aria-label={isShowed ? t('hidePassword') : t('showPassword')}
        className="h-full rounded-l-none border-l-0"
      >
        {isShowed ? <Eye /> : <EyeOff />}
      </Button>
    </div>
  )
}
