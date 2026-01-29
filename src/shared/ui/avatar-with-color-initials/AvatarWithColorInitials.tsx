import {
  cn,
  getInitials,
  getTextColorForBackground,
  stringToColor
} from '@/shared/lib'
import { Avatar } from '@/shared/ui/shadcn'

import type { AvatarProps } from '@radix-ui/react-avatar'

type Props = {
  name?: string
  size?: number
  id?: number | string | null
  className?: string
} & Omit<AvatarProps, 'id'>

export const AvatarWithColorInitials = ({
  id,
  name,
  size = 36,
  className,
  ...props
}: Props) => {
  const initials = getInitials(name)

  const colorSeed = `${name}-${id}`
  const bgColor = stringToColor(colorSeed)
  const textColor = getTextColorForBackground(bgColor)

  return (
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
      {...props}
    >
      {initials}
    </Avatar>
  )
}
