import { cn } from '@/shared/lib'
import { Separator, Skeleton } from '@/shared/ui/shadcn'

import { ChatMessagesListSkeleton } from './messages/ChatMessagesListSkeleton'

import type { ComponentProps } from 'react'

type Props = {
  messagesCount?: number
} & ComponentProps<'section'>

export const ChatSkeleton = ({
  messagesCount = 6,
  className,
  ...props
}: Props) => (
  <section
    className={cn(
      'bg-card flex min-h-[70vh] flex-1 flex-col rounded-md border',
      className
    )}
    {...props}
  >
    <header className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-3">
        <Skeleton className="size-12 rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-40 rounded" />
          <Skeleton className="h-3 w-24 rounded" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Skeleton className="size-9 rounded-md" />
      </div>
    </header>

    <Separator />

    <ChatMessagesListSkeleton count={messagesCount} />

    <Separator />

    <footer className="flex items-end gap-3 px-4 py-3">
      <Skeleton className="h-12 w-full rounded-md" />

      <div className="flex items-center gap-2">
        <Skeleton className="size-9 rounded-md" />
        <Skeleton className="size-9 rounded-md" />
        <Skeleton className="size-9 rounded-md" />
      </div>
    </footer>
  </section>
)
