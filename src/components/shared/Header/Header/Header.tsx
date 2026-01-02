import { useEffect, type ComponentProps } from 'react'

import { LanguageSwitcher, ThemeSwitcher } from '@/components/shared'

import { HeaderAvatar } from '@/components/shared/Header/HeaderAvatar'
import { HeaderLogo } from '@/components/shared/Header/HeaderLogo'
import { HeaderSearch } from '@/components/shared/Header/HeaderSearch'
import { cn } from '@/utils'

type Props = ComponentProps<'header'>

export const Header = ({ className, ...rest }: Props) => {
  useEffect(() => {
    const defineHeaderHeightCssVar = () => {
      const header = document.querySelector<HTMLElement>('header')

      if (!header) {
        return
      }

      const height = header.offsetHeight

      document.documentElement.style.setProperty(
        '--header-height',
        `${height}px`
      )
    }

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
