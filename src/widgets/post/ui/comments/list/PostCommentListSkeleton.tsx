import { Card } from '@/shared/ui'
import { Skeleton } from '@/shared/ui/shadcn'

type Props = {
  count?: number
}

export const PostCommentListSkeleton = ({ count = 3 }: Props) => (
  <div className="flex flex-col gap-4">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="flex items-start gap-2">
        <Skeleton className="h-10 w-10 rounded-full" />

        <Card className="bg-input/80 grid w-full gap-1 px-5 py-3">
          <div className="flex items-center justify-between gap-5">
            <Skeleton className="h-4 w-32 rounded-md" />

            <div className="flex items-center gap-2">
              <Skeleton className="h-3 w-16 rounded-md" />
            </div>
          </div>

          <div className="mt-2 flex flex-col gap-2">
            <Skeleton className="h-3 w-full rounded-md" />
            <Skeleton className="h-3 w-3/4 rounded-md" />
          </div>
        </Card>
      </div>
    ))}
  </div>
)
