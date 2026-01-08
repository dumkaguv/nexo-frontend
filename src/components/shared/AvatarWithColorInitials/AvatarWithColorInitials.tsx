import { PersonAvatar } from '@/components/shared/Person/PersonAvatar'
import { Avatar, Badge } from '@/components/ui'
import { useOnlineUsersStore } from '@/stores'
import {
  cn,
  getInitials,
  getTextColorForBackground,
  stringToColor
} from '@/utils'

import type { ResponseUserDto, ResponseUserProfileDto } from '@/api'
import type { ReactNode } from 'react'

type Props = {
  user?: ResponseUserProfileDto | ResponseUserDto
  name?: string
  size?: number
  id?: number | string
  src?: string | null
  isOnline?: boolean
  showOnlineBadge?: boolean
  className?: string
}

export const AvatarWithColorInitials = ({
  id: idProp,
  name: nameProp,
  size = 36,
  src: srcProp,
  user,
  isOnline: isOnlineProp = false,
  showOnlineBadge = false,
  className
}: Props) => {
  if (user && (idProp || srcProp || nameProp)) {
    throw new Error(
      'you can not pass user and id or scr or name showOnlineBadge props at the same time'
    )
  }

  if (!user && showOnlineBadge) {
    throw new Error('you can not pass showOnlineBadge prop without user')
  }

  const onlineUserIds = useOnlineUsersStore((state) => state.onlineUserIds)

  const isOnline =
    showOnlineBadge && (isOnlineProp || onlineUserIds.has(user?.id ?? 0))
  const profile = user?.profile

  const renderWithOnlineBadge = (children: ReactNode) => (
    <div className="relative">
      {children}

      {isOnline && (
        <Badge className="absolute right-0 -bottom-px size-3.5 rounded-full border-2 border-white bg-[#1cd14f] p-0 dark:border-[#262626]" />
      )}
    </div>
  )

  if (!profile) {
    return renderWithOnlineBadge(
      <Avatar
        className={cn('rounded-full object-cover', className)}
        style={{ width: size, height: size }}
      />
    )
  }

  const { id, fullName: name } = profile
  const src = profile.avatar?.url

  const initials = getInitials(name)

  const colorSeed = `${name}-${id}`
  const bgColor = stringToColor(colorSeed)
  const textColor = getTextColorForBackground(bgColor)

  if (src) {
    return renderWithOnlineBadge(
      <PersonAvatar src={src} className={cn('size-10', className)} />
    )
  }

  return renderWithOnlineBadge(
    <Avatar
      className={cn(
        'flex items-center justify-center rounded-full font-medium select-none',
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
