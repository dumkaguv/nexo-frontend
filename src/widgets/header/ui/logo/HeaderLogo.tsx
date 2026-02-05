/* eslint-disable i18next/no-literal-string */

import { LoaderPinwheel } from 'lucide-react'
import { Link } from 'react-router-dom'

import { BreakpointsMax, paths } from '@/shared/config'
import { useMaxWidth } from '@/shared/hooks'
import { Typography } from '@/shared/ui'

export const HeaderLogo = () => {
  const isMobile = useMaxWidth(BreakpointsMax.md)

  return (
    <Link
      to={paths.home.root}
      className="hover:text-primary flex items-center gap-1"
    >
      <LoaderPinwheel size={isMobile ? 32 : 36} className="text-primary" />

      <Typography.Title level={1} className="text-xl font-bold max-lg:text-lg">
        Nexo
      </Typography.Title>
    </Link>
  )
}
