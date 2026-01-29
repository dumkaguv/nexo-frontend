import { cn } from '@/shared/lib'
import { LanguageSwitcher, ThemeSwitcher } from '@/shared/ui'

import { useDefineHeaderHeightCssVar } from '@/widgets/header/lib'

import { HeaderAvatar } from '../avatar'
import { HeaderLogo } from '../logo'

import { HeaderSearch } from '../search'

import type { ComponentProps } from 'react'

export const Header = ({ className, ...rest }: ComponentProps<'header'>) => {
  useDefineHeaderHeightCssVar()

  return (
    <header
      className={cn(
        'bg-card sticky top-0 z-10 flex flex-col gap-3 rounded-b-md p-2 shadow-md sm:flex-row sm:items-center sm:justify-between sm:gap-5',
        className
      )}
      {...rest}
    >
      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-5">
        <HeaderLogo />
        <HeaderSearch />
      </div>

      <div className="flex w-full items-center justify-end gap-3 sm:w-auto">
        <ThemeSwitcher />
        <LanguageSwitcher />
        <HeaderAvatar />
      </div>
    </header>
  )
}
