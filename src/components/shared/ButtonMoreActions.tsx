import { Ellipsis } from 'lucide-react'

import { Button } from '@/components/ui'

import type { ComponentProps } from 'react'

export const ButtonMoreActions = (props: ComponentProps<'button'>) => {
  return (
    <Button
      variant="text"
      className="hover:bg-secondary/80 size-7 !p-0"
      {...props}
    >
      <Ellipsis />
    </Button>
  )
}
