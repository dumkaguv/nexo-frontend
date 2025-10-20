import { LoaderPinwheel } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Typography } from '@/components/shared'
import { Routes } from '@/config'

const { Title } = Typography

export const HeaderLogo = () => {
  return (
    <Link
      to={Routes.home}
      className="hover:text-primary flex items-center gap-1"
    >
      <LoaderPinwheel size={36} className="text-primary" />
      <Title level={1} className="text-xl font-bold">
        Nexo
      </Title>
    </Link>
  )
}
