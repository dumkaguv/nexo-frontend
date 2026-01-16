import { useQuery } from '@tanstack/react-query'
import { SquarePen } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { postControllerFindAllMyOptions } from '@/api'
import { PostList, Typography } from '@/components/shared'
import {
  Button,
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  Skeleton
} from '@/components/ui'
import { paths } from '@/config'

export const MyPosts = () => {
  const { t } = useTranslation()

  const { data, isLoading } = useQuery({
    ...postControllerFindAllMyOptions()
  })

  const myPosts = data?.data
  const totalPosts = data?.total ?? 0
  const showEmptyState = !isLoading && totalPosts === 0

  return (
    <div className="flex flex-col gap-3">
      {isLoading ? (
        <Skeleton className="h-6 w-30" />
      ) : (
        <Typography.Title level={3} className="mb-2">
          {t('myPosts')} ({totalPosts})
        </Typography.Title>
      )}

      {totalPosts > 0 && <PostList posts={myPosts} isLoading={isLoading} />}

      {showEmptyState && (
        <Empty className="p-5 md:p-7">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <SquarePen />
            </EmptyMedia>
            <EmptyTitle>{t('noPostsYet')}</EmptyTitle>
            <EmptyDescription>{t('noPostsYetDescription')}</EmptyDescription>
          </EmptyHeader>
          <Button asChild>
            <Link to={paths.home.root}>{t('addPost')}</Link>
          </Button>
        </Empty>
      )}
    </div>
  )
}
