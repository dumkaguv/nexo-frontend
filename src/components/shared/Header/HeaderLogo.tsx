import { LoaderPinwheel } from 'lucide-react'
import { Link } from 'react-router-dom'

import { paths } from '@/config'

export const HeaderLogo = () => {
  return (
    <Link
      to={paths.home}
      className="hover:text-primary flex items-center gap-1"
    >
      <LoaderPinwheel size={36} className="text-primary" />
      <h1 className="text-xl font-bold">Nexo</h1>
    </Link>
  )
}
