import { Avatar } from '@/components/ui'
import {
  cn,
  getInitials,
  getTextColorForBackground,
  stringToColor
} from '@/utils'

import { Image } from './'

import type { ResponseUserDto, ResponseUserProfileDto } from '@/api'

type Props = {
  user?: ResponseUserProfileDto | ResponseUserDto
  name?: string
  size?: number
  id?: number | string
  src?: string | null
  className?: string
}

export const AvatarWithColorInitials = ({
  id: idProp,
  name: nameProp,
  size = 36,
  src: srcProp,
  user,
  className
}: Props) => {
  if (user && (idProp || srcProp || nameProp)) {
    throw new Error('you can not you user and id or scr or name props')
  }

  const profile = user?.profile

  if (!profile) {
    return (
      <Avatar
        className={cn('rounded-full object-cover', className)}
        style={{ width: size, height: size }}
      />
    )
  }

  const { id, fullName: name } = profile
  const src = profile.avatarUrl

  const initials = getInitials(name)

  const colorSeed = `${name}-${id}`
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
