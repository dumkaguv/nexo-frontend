import { Avatar } from '@/components/ui'
import {
  cn,
  getInitials,
  getTextColorForBackground,
  stringToColor
} from '@/utils'

import { Image } from './'

type Props = {
  name: string
  size?: number
  id?: number | string
  src?: string | null
  className?: string
}

export const AvatarWithColorInitials = ({
  id,
  name,
  size = 36,
  src,
  className
}: Props) => {
  const initials = getInitials(name)

  const colorSeed = `${name}-${id ?? ''}-${Math.random()}`
  const bgColor = stringToColor(colorSeed)
  const textColor = getTextColorForBackground(bgColor)

  if (src) {
    return (
      <Avatar
        className={cn('rounded-full object-cover', className)}
        style={{ width: size, height: size }}
      >
        <Image src={src} alt={name} className="h-full w-full rounded-full" />
      </Avatar>
    )
  }

  return (
    <Avatar
      className={cn(
        'flex items-center justify-center rounded-full font-medium text-white select-none',
        className
      )}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        width: size,
        height: size,
        fontSize: size / 2.5
      }}
    >
      {initials}
    </Avatar>
  )
}
