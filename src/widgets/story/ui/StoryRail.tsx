import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useAuthStore } from '@/entities/session'
import { cn } from '@/shared/lib'
import { Typography } from '@/shared/ui'

import { StoryCreateModal } from './StoryCreateModal'
import { StoryDialog } from './StoryDialog'
import { StoryList } from './StoryList'
import { StoryRailSkeletonList } from './StoryRailSkeletonList'

import { useStoryRail } from '../model'

import type { ResponseUserDto, ResponseUserProfileDto } from '@/shared/api'

type Props = {
  user?: ResponseUserProfileDto | ResponseUserDto
  className?: string
  mode?: 'user' | 'all'
  showTitle?: boolean
  showCreate?: boolean
}

export const StoryRail = ({
  user,
  showTitle = true,
  className,
  mode,
  showCreate
}: Props) => {
  const { t } = useTranslation()
  const { user: authUser } = useAuthStore()
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const {
    storyItems,
    storySize,
    isLoading,
    hasStories,
    isOpen,
    isPaused,
    currentIndex,
    onOpen,
    onOpenChange,
    onPointerDown,
    onPointerUp,
    onStoryStart
  } = useStoryRail({ user, mode })

  if (isLoading) {
    return <StoryRailSkeletonList className={className} />
  }

  if (!hasStories && !showCreate) {
    return null
  }

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div className="flex items-center justify-between">
        {showTitle && (
          <Typography.Title level={4}>{t('stories')}</Typography.Title>
        )}
      </div>

      <StoryList
        items={storyItems}
        onOpen={onOpen}
        showCreate={showCreate && !!authUser}
        onCreate={() => setIsCreateOpen(true)}
      />

      <StoryDialog
        isOpen={isOpen}
        isPaused={isPaused}
        currentIndex={currentIndex}
        storyItems={storyItems}
        storySize={storySize}
        title={t('stories')}
        description={t('preview')}
        onOpenChange={onOpenChange}
        onStoryStart={onStoryStart}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      />

      <StoryCreateModal open={isCreateOpen} onOpenChange={setIsCreateOpen} />
    </div>
  )
}
