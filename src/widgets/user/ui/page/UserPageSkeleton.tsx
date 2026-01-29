import { Card } from '@/shared/ui'
import { Separator, Sidebar, Skeleton } from '@/shared/ui/shadcn'

export const UserPageSkeleton = ({ showMyPosts }: { showMyPosts: boolean }) => {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
      <Card className="flex w-full flex-col gap-5">
        <div className="flex flex-col gap-5">
          <div className="flex w-full items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Skeleton className="size-24 rounded-full" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-28" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-10" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-10" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            </div>
            <Skeleton className="h-9 w-24" />
          </div>

          <Skeleton className="h-20 w-full" />

          {showMyPosts && (
            <>
              <Separator />
              <div className="flex flex-col gap-3">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-24 w-full" />
              </div>
            </>
          )}
        </div>
      </Card>

      <Sidebar className="w-full lg:max-w-85" bodyClassName="items-start">
        <div className="flex w-full flex-col gap-3">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </Sidebar>
    </div>
  )
}
