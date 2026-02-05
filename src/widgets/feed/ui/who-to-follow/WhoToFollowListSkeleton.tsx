import { Skeleton } from '@/shared/ui/shadcn'

type Props = {
  count?: number
  showLoadMoreButton?: boolean
}

export const WhoToFollowListSkeleton = ({
  count = 5,
  showLoadMoreButton
}: Props) => (
  <div className="flex w-full flex-col gap-3">
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <Skeleton className="size-10 rounded-full" />

          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-32 rounded max-lg:w-28" />
            <Skeleton className="h-3 w-20 rounded max-lg:w-16" />
          </div>
        </div>

        <Skeleton className="size-8 rounded-full" />
      </div>
    ))}

    {showLoadMoreButton && <Skeleton className="h-9 w-full" />}
  </div>
)
