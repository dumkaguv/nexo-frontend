import { MessageSquareText, Newspaper } from 'lucide-react'

import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

import { Typography } from '@/components/shared'
import * as PersonInfo from '@/components/shared/Person'
import { Button, Separator, Sidebar as SidebarUi } from '@/components/ui'
import { paths } from '@/config'

import { cn } from '@/utils'

import type { ComponentProps } from 'react'

const { Text } = Typography

type Props = ComponentProps<'aside'>

export const Sidebar = ({ className, ...rest }: Props) => {
  const { t } = useTranslation()
  const location = useLocation()

  const navItems = [
    { name: t('feed'), href: paths.home.root, icon: Newspaper },
    { name: t('messages'), href: paths.messages.root, icon: MessageSquareText }
  ]

  return (
    <SidebarUi className={className} {...rest}>
      <PersonInfo.Avatar />
      <PersonInfo.Name className="text-center" />
      <PersonInfo.Nickname asLink />

      <PersonInfo.FollowInfo className="mt-4" />

      <Separator className="my-4" />

      <ul className="flex w-full flex-col items-start">
        {navItems.map(({ name, href, icon: Icon }) => {
          const isActiveLink = href === location.pathname

          return (
            <li key={name}>
              <nav>
                <Button
                  className={cn(
                    'flex h-fit items-center text-base hover:text-blue-500 hover:no-underline'
                  )}
                  variant="text"
                  asChild
                >
                  <Link to={href}>
                    <Icon className={cn(isActiveLink && 'text-primary')} />
                    <Text className={cn(isActiveLink && 'text-primary')}>
                      {name}
                    </Text>
                  </Link>
                </Button>
              </nav>
            </li>
          )
        })}
      </ul>
    </SidebarUi>
  )
}
