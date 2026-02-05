import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { matchPath, useLocation } from 'react-router-dom'

import { paths } from '@/shared/config'

const baseTitle = 'Nexo'
const titleSeparator = ' ● '
const routeTitleKeys = [
  { pattern: paths.auth.login, key: 'signIn', end: true },
  { pattern: paths.auth.register, key: 'signUp', end: true },
  { pattern: paths.settings.account, key: 'accountSettings', end: true },
  { pattern: paths.conversations.root, key: 'messages', end: false },
  { pattern: paths.user.byId(':id'), key: 'profile', end: true },
  { pattern: paths.home.root, key: 'feed', end: true }
]

const getTitleKey = (pathname: string) => {
  for (const route of routeTitleKeys) {
    if (matchPath({ path: route.pattern, end: route.end }, pathname)) {
      return route.key
    }
  }

  return 'pageNotFound'
}

export const usePageTitle = () => {
  const { i18n, t } = useTranslation()
  const { pathname } = useLocation()

  useEffect(() => {
    const titleKey = getTitleKey(pathname)
    const pageTitle = t(titleKey)

    document.title = pageTitle
      ? `${baseTitle}${titleSeparator}${pageTitle}`
      : baseTitle
  }, [i18n.language, pathname, t])
}
