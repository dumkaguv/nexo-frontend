import { type ComponentProps, createElement } from 'react'

import { cn } from '@/shared/lib'

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6
type HeadingTag<L extends HeadingLevel> = `h${L}`
export type TitleProps<L extends HeadingLevel> = {
  level: L
} & ComponentProps<HeadingTag<L>>

const baseClass = 'scroll-m-20 tracking-tight font-semibold text-balance'

const headingLevelClassMap: Record<HeadingLevel, string> = {
  1: 'text-4xl font-extrabold max-lg:text-3xl',
  2: 'text-3xl max-lg:text-2xl',
  3: 'text-2xl max-lg:text-xl',
  4: 'text-xl max-lg:lg',
  5: 'text-lg max-lg:text-base',
  6: 'text-base'
}

export const Title = <L extends HeadingLevel>({
  level,
  children,
  className,
  ...rest
}: TitleProps<L>) =>
  createElement(
    `h${level}`,
    {
      ...rest,
      className: cn(baseClass, headingLevelClassMap[level], className)
    },
    children
  )
