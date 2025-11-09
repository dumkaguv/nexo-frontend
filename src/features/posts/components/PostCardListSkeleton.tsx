import { cn } from '@/utils'

import type { ComponentProps } from 'react'

type Props = {
  count?: number
} & ComponentProps<'ul'>

export const PostCardListSkeleton = ({
  count = 4,
  className,
  ...props
}: Props) => {
  return (
    <ul className={cn('flex flex-col gap-8', className)} {...props}>
      {Array.from({ length: count }).map((_, idx) => (
        <li key={idx}>
          <div className="flex animate-pulse flex-col gap-6 rounded-2xl bg-white p-4 shadow-sm dark:bg-neutral-800">
            <div className="flex items-center justify-between gap-8">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-neutral-600" />
                <div className="flex flex-col gap-2">
                  <div className="h-4 w-52 rounded bg-gray-300 dark:bg-neutral-600" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="h-4 w-full rounded bg-gray-300 dark:bg-neutral-600" />
              <div className="h-4 w-full rounded bg-gray-300 dark:bg-neutral-600" />
              <div className="h-64 w-full rounded bg-gray-300 dark:bg-neutral-600" />
            </div>

            <div className="mt-2 flex items-center gap-5">
              <div className="h-4 w-20 rounded bg-gray-300 dark:bg-neutral-600" />
              <div className="h-4 w-20 rounded bg-gray-300 dark:bg-neutral-600" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
