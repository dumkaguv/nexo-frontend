import type { ComponentProps } from 'react'

type Props = ComponentProps<'p'> & {
  message?: string
}

export const InputFieldErrors = ({ message }: Props) => {
  return <>{Boolean(message) && <p className="text-red-500">{message}</p>}</>
}
