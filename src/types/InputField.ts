import type { ComponentProps } from 'react'

export type InputField<T> = ComponentProps<'input'> & {
  name: keyof T
  label: string
  type: 'text' | 'password'
  placeholder: string
  id: string
  autoComplete?: ComponentProps<'input'>['autoComplete']
}
