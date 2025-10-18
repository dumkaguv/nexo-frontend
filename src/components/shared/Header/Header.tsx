import { useEffect } from 'react'

import { LanguageSwitcher, ThemeSwitcher } from '@/components/shared'
import { cn } from '@/utils'
import { defineHeaderHeightCssVar } from '@/utils'

import { HeaderAvatar } from './HeaderAvatar'
import { HeaderLogo } from './HeaderLogo'
import { HeaderSearch } from './HeaderSearch'

import type { ComponentProps} from 'react';

type Props = ComponentProps<'header'>

export const Header = ({ className, ...rest }: Props) => {
  useEffect(() => {
    defineHeaderHeightCssVar()
  }, [])

  return (
    <header
      className={cn(
        'bg-card sticky top-0 z-10 flex items-center justify-between gap-5 rounded-b-md p-2 shadow-md',
        className
      )}
      {...rest}
    >
      <div className="flex items-center gap-5">
        <HeaderLogo />
        <HeaderSearch />
      </div>

      <div className="flex items-center gap-3">
        <ThemeSwitcher />
        <LanguageSwitcher />
        <HeaderAvatar />
      </div>
    </header>
  )
}
