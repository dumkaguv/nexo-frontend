import { Trash2, UserPen } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

import { paths } from '@/shared/config'
import { cn } from '@/shared/lib'
import { Typography } from '@/shared/ui'
import { Sidebar as SidebarUI } from '@/shared/ui/shadcn'

export const SidebarSettings = () => {
  const { t } = useTranslation()

  const settings = [
    {
      label: (
        <Typography.Title level={2} className="text-sm">
          {t('settings')}
        </Typography.Title>
      ),
      icon: UserPen,
      href: paths.settings.account
    },
    {
      label: (
        <Typography.Title level={2} className="text-sm">
          {t('closeAccount')}
        </Typography.Title>
      ),
      icon: Trash2,
      href: paths.settings.delete
    }
  ]

  return (
    <SidebarUI bodyClassName="items-start justify-start">
      <ul>
        {settings.map(({ label, href, icon: Icon }, i) => (
          <li key={i}>
            <NavLink
              to={href}
              className={({ isActive }) =>
                cn(
                  'hover:text-primary/80 flex items-center p-2',
                  isActive && 'text-primary'
                )
              }
            >
              <Icon className="mr-2" size={16} />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </SidebarUI>
  )
}
