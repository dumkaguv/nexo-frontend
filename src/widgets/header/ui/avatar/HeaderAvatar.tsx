import { LogOut, MessageSquareText, Settings, User } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { useAuthStore } from '@/entities/session'
import { UserAvatar } from '@/entities/user'
import { useLogout } from '@/features/auth/logout/model'
import { paths } from '@/shared/config'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/shared/ui/shadcn'

export const HeaderAvatar = () => {
  const { user, isUserLoading } = useAuthStore()

  const [isOpen, setIsOpen] = useState(false)

  const { t } = useTranslation()

  const { mutateAsync: logout, isPending } = useLogout()

  const onCloseMenu = () => setIsOpen(false)

  const menuItems = [
    {
      icon: <User className="text-primary" />,
      label: t('profile'),
      to: paths.user.byId(Number(user?.id))
    },
    {
      icon: <MessageSquareText className="text-primary" />,
      label: t('messages'),
      to: paths.conversations.root
    },
    {
      icon: <Settings className="text-primary" />,
      label: t('settings'),
      to: paths.settings.account
    },
    {
      icon: <LogOut className="text-primary" />,
      label: t('logout'),
      onClick: () => logout({})
    }
  ]

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <Tooltip>
        <TooltipContent>{t('menu')}</TooltipContent>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger>
            <UserAvatar
              user={user}
              size={36}
              isLoading={isUserLoading}
              className="size-9 cursor-pointer"
            />
          </DropdownMenuTrigger>
        </TooltipTrigger>
      </Tooltip>

      <DropdownMenuContent
        align="end"
        side="bottom"
        alignOffset={-8}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        {menuItems.map((item, index) => (
          <DropdownMenuItem key={index} className="p-0" asChild>
            {'to' in item ? (
              <Link to={item.to ?? paths.home.root} onClick={onCloseMenu}>
                <div className="flex items-center gap-2 px-3 py-2">
                  {item.icon}
                  {item.label}
                </div>
              </Link>
            ) : (
              <Button
                onClick={item.onClick}
                className="flex w-full items-center justify-start gap-2 px-3 py-2"
                variant="text"
                loading={isPending}
              >
                {item.icon}
                {item.label}
              </Button>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
