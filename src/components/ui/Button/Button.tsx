import { Slot } from '@radix-ui/react-slot'
import { type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/utils'

import { buttonVariants } from './buttonVariants'

export type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    loading?: boolean
    showChildrenWhenLoading?: boolean
    showLoadingIcon?: boolean
  }

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  children,
  showChildrenWhenLoading = true,
  showLoadingIcon = true,
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
          {showChildrenWhenLoading && children}
          {showLoadingIcon && <Loader2 className="size-4 animate-spin" />}
        </>
      ) : (
        children
      )}
    </Comp>
  )
}

export { Button }
