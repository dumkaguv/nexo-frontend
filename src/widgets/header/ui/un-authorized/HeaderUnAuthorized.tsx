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
        'bg-card sticky top-0 z-10 flex h-14 items-center justify-between gap-5 rounded-b-md p-2 shadow-md',
        className
      )}
      {...rest}
    >
      <HeaderLogo />

      <div className="flex w-full items-center justify-end gap-3 max-lg:gap-2 max-md:gap-1 sm:w-auto">
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>
    </header>
  )
}
