import { MessageSquareText, Newspaper } from 'lucide-react'

import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

import { useAuthStore } from '@/entities/session'
import { UserAvatar, UserFullName, UserNickname } from '@/entities/user'
import { paths } from '@/shared/config'

import { cn } from '@/shared/lib'
import { Typography } from '@/shared/ui'
import { Button, Separator, Sidebar as SidebarUi } from '@/shared/ui/shadcn'

import { UserFollowInfo } from '@/widgets/user'

import type { ComponentProps } from 'react'

type Props = ComponentProps<'aside'>

export const Sidebar = ({ className, ...rest }: Props) => {
  const { user, isUserLoading } = useAuthStore()

  const { t } = useTranslation()
  const location = useLocation()

  const navItems = [
    { name: t('feed'), href: paths.home.root, icon: Newspaper },
    {
      name: t('messages'),
      href: paths.conversations.root,
      icon: MessageSquareText
    }
  ]

  return (
    <SidebarUi className={className} {...rest}>
      <UserAvatar
        user={user}
        isLoading={isUserLoading}
        size={64}
        className="size-16"
      />
      <UserFullName
        name={user?.profile.fullName}
        className="text-center"
        isLoading={isUserLoading}
      />
      <UserNickname
        userId={user?.id}
        isLoading={isUserLoading}
        nickname={user?.username}
        asLink
      />

      <UserFollowInfo user={user} isLoading={isUserLoading} className="mt-4" />

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
                    <Typography.Text
                      className={cn(isActiveLink && 'text-primary')}
                    >
                      {name}
                    </Typography.Text>
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
