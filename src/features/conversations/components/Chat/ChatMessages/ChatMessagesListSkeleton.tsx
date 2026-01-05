import { Skeleton } from '@/components/ui'
import { cn } from '@/utils'

import type { ComponentProps } from 'react'

type Props = {
  count?: number
} & ComponentProps<'div'>

const bubbleWidths = ['w-56', 'w-48', 'w-40'] as const

export const ChatMessagesListSkeleton = ({
  count = 6,
  className,
  ...props
}: Props) => (
  <div
    className={cn(
      'flex max-h-[50dvh] flex-1 flex-col-reverse gap-6 overflow-y-auto px-6 py-5',
      className
    )}
    {...props}
  >
    {Array.from({ length: count }).map((_, index) => {
      const isMine = index % 2 === 0
      const bubbleWidth = bubbleWidths[index % bubbleWidths.length]

      return (
        <div
          key={index}
          className={cn(
            'flex w-full items-end gap-3',
            isMine ? 'justify-end' : 'justify-start'
          )}
        >
          {!isMine && <Skeleton className="size-8 rounded-full" />}

          <div
            className={cn(
              'flex max-w-[45%] flex-col gap-2',
              isMine ? 'items-end' : 'items-start'
            )}
          >
            <Skeleton className={cn('h-10 rounded-2xl', bubbleWidth)} />
            <Skeleton className="h-3 w-16 rounded-md" />
          </div>
        </div>
      )
    })}
  </div>
)
