import { Slot } from '@radix-ui/react-slot'
import { type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/utils'

import { buttonVariants } from './buttonVariants'

type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    loading?: boolean
  }

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      type="button"
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          {children}
          <Loader2 className="h-4 w-4 animate-spin" />
        </>
      ) : (
        children
      )}
    </Comp>
  )
}

export { Button }
