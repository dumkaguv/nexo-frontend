import { Eye, EyeOff } from 'lucide-react'
import { ComponentProps, useState } from 'react'

import { useTranslation } from 'react-i18next'

import { Button, Input } from '@/components/ui'
import { cn } from '@/utils'


type Props = ComponentProps<'input'>

export const InputPassword = ({ className, ...rest }: Props) => {
  const [isShowed, setIsShowed] = useState(false)

  const { t } = useTranslation()

  const handleShow = () => setIsShowed((prev) => !prev)

  return (
    <div className="flex h-12 items-center">
      <Input
        type={isShowed ? 'text' : 'password'}
        placeholder={t('inputs.inputPassword')}
        className={cn('flex-1 rounded-r-none', className)}
        autoComplete="current-password"
        {...rest}
      />
      <Button
        type="button"
        onClick={handleShow}
        variant="outline"
        size="icon"
        className="h-full rounded-l-none border-l-0"
      >
        {isShowed ? <Eye /> : <EyeOff />}
      </Button>
    </div>
  )
}
