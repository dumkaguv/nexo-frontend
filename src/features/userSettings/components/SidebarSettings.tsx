import { Trash2, UserPen } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

import { Sidebar } from '@/components/ui'
import { Routes } from '@/config'
import { cn } from '@/utils'

export const SidebarSettings = () => {
  const { t } = useTranslation()

  const settings = [
    {
      label: <h2>{t('settings')}</h2>,
      icon: UserPen,
      href: Routes.settings.account
    },
    {
      label: <h2>{t('closeAccount')}</h2>,
      icon: Trash2,
      href: Routes.settings.delete
    }
  ]

  return (
    <Sidebar bodyClassName="items-start justify-start">
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
    </Sidebar>
  )
}
