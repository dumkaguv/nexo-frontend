import { cn } from '@/shared/lib'
import { LanguageSwitcher, ThemeSwitcher } from '@/shared/ui'
import { useDefineHeaderHeightCssVar } from '@/widgets/header/lib'

import { HeaderLogo } from '../logo'

import type { ComponentProps } from 'react'

export const HeaderUnAuthorized = ({
  className,
  ...rest
}: ComponentProps<'header'>) => {
  useDefineHeaderHeightCssVar()

  return (
    <header
      className={cn(
        'bg-card sticky top-0 z-10 flex flex-col gap-3 rounded-b-md p-2 shadow-md sm:h-14 sm:flex-row sm:items-center sm:justify-between sm:gap-5',
        className
      )}
      {...rest}
    >
      <HeaderLogo />

      <div className="flex w-full items-center justify-end gap-3 sm:w-auto">
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>
    </header>
  )
}
