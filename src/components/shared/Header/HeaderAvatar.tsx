import { useMutation, useQueryClient } from '@tanstack/react-query'
import { LogOut, MessageSquareText, Settings } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { authControllerLogoutMutation } from '@/api'
import * as PersonInfo from '@/components/shared/Person'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui'
import { LocalStorage, paths } from '@/config'
import { useAuthStore } from '@/stores'
import { showApiErrors } from '@/utils'

export const HeaderAvatar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const { setUser } = useAuthStore()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const { mutateAsync: logout, isPending } = useMutation({
    ...authControllerLogoutMutation(),
    onSuccess: () => {
      localStorage.removeItem(LocalStorage.token)
      setUser(undefined)
      setIsOpen(false)
      queryClient.cancelQueries()
      queryClient.clear()
      toast.success(t('auth.logoutSuccess'))
      navigate(paths.auth.login)
    },
    onError: (error) => showApiErrors(error)
  })

  const onCloseMenu = () => setIsOpen(false)

  const menuItems = [
    {
      icon: <MessageSquareText className="text-primary" />,
      label: t('messages'),
      to: paths.messages.root
    },
    {
      icon: <Settings className="text-primary" />,
      label: t('settings'),
      to: paths.settings.account
    },
    {
      icon: <LogOut className="text-primary" />,
      label: t('auth.logout'),
      onClick: () => logout({})
    }
  ]

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger>
        <PersonInfo.Avatar className="size-10 cursor-pointer" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" side="bottom" alignOffset={-8}>
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
