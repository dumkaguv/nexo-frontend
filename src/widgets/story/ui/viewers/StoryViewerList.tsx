import { useTranslation } from 'react-i18next'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Link } from 'react-router-dom'

import { paths } from '@/shared/config'
import { cn } from '@/shared/lib'
import { Card, Typography } from '@/shared/ui'

import { useStoryViewersList } from '@/widgets/story/model'

import { StoryViewerListItem } from './StoryViewerListItem'

import type { DialogProps } from '@radix-ui/react-dialog'

type Props = {
  storyId?: number
  searchValue?: string
  onOpenChange?: DialogProps['onOpenChange']
  className?: string
}

export const StoryViewerList = ({
  storyId,
  searchValue,
  onOpenChange,
  className
}: Props) => {
  const { t } = useTranslation()

  const { data, isLoading, fetchNextPage, hasNextPage } = useStoryViewersList({
    storyId,
    searchValue
  })

  if (isLoading) {
    return <Card className={className} loading rows={5} />
  }

  if (!data.length) {
    return (
      <Card className={cn('flex items-center justify-center py-8', className)}>
        <Typography.Text className="text-muted-foreground text-sm">
          {t('noResultsFound')}
        </Typography.Text>
      </Card>
    )
  }

  return (
    <Card
      id="story-viewers-scrollable-list"
      className={cn('max-h-[60dvh] overflow-y-auto', className)}
    >
      <InfiniteScroll
        dataLength={data.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        scrollableTarget="story-viewers-scrollable-list"
        scrollThreshold={0.65}
        loader={
          <div className="mt-5">
            <Card loading rows={3} />
          </div>
        }
      >
        <ul className="flex flex-col gap-4">
          {data.map((user) => (
            <Link
              key={user.id}
              to={paths.user.byId(user.id)}
              onClick={() => onOpenChange?.(false)}
              className="hover:cursor-pointer"
            >
              <StoryViewerListItem user={user} />
            </Link>
          ))}
        </ul>
      </InfiniteScroll>
    </Card>
  )
}
