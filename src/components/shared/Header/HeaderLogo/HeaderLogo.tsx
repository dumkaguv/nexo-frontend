/* eslint-disable i18next/no-literal-string */

import { LoaderPinwheel } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Typography } from '@/components/shared'
import { paths } from '@/config'

export const HeaderLogo = () => (
  <Link
    to={paths.home.root}
    className="hover:text-primary flex items-center gap-1"
  >
    <LoaderPinwheel size={36} className="text-primary" />
    <Typography.Title level={1} className="text-xl font-bold">
      Nexo
    </Typography.Title>
  </Link>
)
