import { type ComponentProps, useEffect } from 'react'

import { LanguageSwitcher, ThemeSwitcher } from '@/components/shared'
import { HeaderLogo } from '@/components/shared/Header/HeaderLogo'
import { cn } from '@/utils'

type Props = ComponentProps<'header'>

export const HeaderUnAuthorized = ({ className, ...rest }: Props) => {
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
