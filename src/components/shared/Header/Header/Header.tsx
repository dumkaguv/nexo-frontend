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

    window.addEventListener('resize', defineHeaderHeightCssVar)

    return () => {
      window.removeEventListener('resize', defineHeaderHeightCssVar)
    }
  }, [])

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
