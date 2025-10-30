import type { ComponentProps } from 'react'

type Props = ComponentProps<'img'>

export const Image = ({ ...props }: Props) => {
  return <img alt="" {...props} />
}
