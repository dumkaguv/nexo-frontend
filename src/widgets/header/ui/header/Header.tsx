import { Breakpoints } from '@/shared/config'
import { useMinWidth } from '@/shared/hooks'
import { cn } from '@/shared/lib'
import { LanguageSwitcher, ThemeSwitcher } from '@/shared/ui'

import {
  useDefineHeaderHeightCssVar,
  useHideOnScroll
} from '@/widgets/header/lib'

import { HeaderAvatar } from '../avatar'
import { HeaderLogo } from '../logo'

import { HeaderSearch, HeaderSearchPopup } from '../search'

import type { ComponentProps } from 'react'

export const Header = ({ className, ...rest }: ComponentProps<'header'>) => {
  const hidden = useHideOnScroll()
  const isDesktop = useMinWidth(Breakpoints.md)

  useDefineHeaderHeightCssVar()

  return (
    <header
      className={cn(
        'bg-card sticky top-0 z-10 flex gap-3 rounded-b-md p-2 shadow-md max-sm:py-1 sm:flex-row sm:items-center sm:justify-between sm:gap-5',
        'transition-transform duration-300 ease-in-out will-change-transform',
        hidden ? '-translate-y-full' : 'translate-y-0',
        className
      )}
      {...rest}
    >
      <div className="flex items-center justify-end gap-3 max-lg:gap-2.5 sm:w-auto">
        <HeaderLogo />
        {isDesktop && <HeaderSearch />}
      </div>

      <div className="ml-auto flex items-center justify-end gap-3 max-lg:gap-2 sm:w-auto">
        {!isDesktop && <HeaderSearchPopup />}
        <ThemeSwitcher />
        <LanguageSwitcher />
        <HeaderAvatar />
      </div>
    </header>
  )
}
