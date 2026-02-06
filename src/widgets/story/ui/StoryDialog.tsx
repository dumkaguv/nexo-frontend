import { useQuery } from '@tanstack/react-query'
import { Trash, User } from 'lucide-react'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Stories from 'react-insta-stories'
import { Link } from 'react-router-dom'

import { useAuthStore } from '@/entities/session'
import { UserAvatar } from '@/entities/user'
import { useDeleteStory } from '@/features/story'
import { storyControllerFindAllViewersOptions } from '@/shared/api'
import { paths } from '@/shared/config'
import { ModalConfirm, Typography } from '@/shared/ui'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  Button,
  Skeleton
} from '@/shared/ui/shadcn'

import { StoryViewersModal } from './StoryViewersModal'

import type { StoryItem } from '../types'

type Props = {
  isOpen: boolean
  isPaused: boolean
  currentIndex: number
  storyItems: StoryItem[]
  storySize: { width: number; height: number }
  title: string
  description: string
  onOpenChange: (nextOpen: boolean) => void
  onStoryStart: (index: number) => void
  onPointerDown: () => void
  onPointerUp: () => void
}

export const StoryDialog = ({
  isOpen,
  isPaused,
  currentIndex,
  storyItems,
  storySize,
  title,
  description,
  onOpenChange,
  onStoryStart,
  onPointerDown,
  onPointerUp
}: Props) => {
  const { user } = useAuthStore()
  const { t } = useTranslation()
  const [isViewersOpen, setIsViewersOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement | null>(null)

  const currentStory = storyItems[currentIndex]
  const currentStoryId = currentStory?.story.id
  const currentStoryUserId = currentStory?.story.user.id

  const { deleteStory, isPending } = useDeleteStory({
    userId: currentStoryUserId
  })

  const onDelete = async () => {
    if (!currentStoryId) {
      return
    }

    await deleteStory({ path: { id: String(currentStoryId) } })
    onOpenChange(false)
  }

  const isOwner =
    !!currentStoryUserId && Number(user?.id) === Number(currentStoryUserId)

  const viewersQuery = useQuery({
    ...storyControllerFindAllViewersOptions({
      path: { id: String(currentStoryId ?? '') }
    }),
    enabled: !!currentStoryId && isOpen
  })

  const viewersCount = viewersQuery.data?.total ?? 0

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent
          className="overflow-hidden bg-black p-0 max-lg:p-0"
          classNameCloseButton="text-white"
          showCloseButton={false}
          ref={contentRef}
          tabIndex={-1}
          onOpenAutoFocus={(event) => {
            event.preventDefault()
            contentRef.current?.focus()
          }}
          style={{
            width: storySize.width,
            height: storySize.height,
            maxWidth: storySize.width,
            maxHeight: storySize.height
          }}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <DialogTitle className="sr-only">{title}</DialogTitle>
          <DialogDescription className="sr-only">
            {description}
          </DialogDescription>
          {currentStory && (
            <Stories
              stories={[{ url: currentStory.url }]}
              width={storySize.width}
              height={storySize.height}
              currentIndex={0}
              onStoryStart={() => {
                setTimeout(() => onStoryStart(currentIndex), 0)
              }}
              onAllStoriesEnd={() => {
                setTimeout(() => {
                  setIsViewersOpen(false)
                  onOpenChange(false)
                }, 0)
              }}
              keyboardNavigation
              defaultInterval={8000}
              isPaused={isPaused}
              storyInnerContainerStyles={{ position: 'relative', zIndex: 0 }}
              storyStyles={{
                position: 'absolute',
                inset: '20% 0 0 0',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                pointerEvents: 'none'
              }}
            />
          )}

          {currentStory?.header && (
            <div className="absolute top-5 left-3 z-1000 flex items-center justify-between gap-3 text-white">
              <Link
                to={paths.user.byId(currentStory.header.userId)}
                onClick={() => onOpenChange(false)}
                className="flex items-center gap-3"
              >
                <UserAvatar
                  user={currentStory.story.user}
                  size={40}
                  className="size-10"
                />

                <div className="flex flex-col">
                  <Typography.Text className="text-sm font-semibold">
                    {currentStory.header.heading}
                  </Typography.Text>
                  <Typography.Text className="text-xs text-white/70">
                    {currentStory.header.subheading}
                  </Typography.Text>
                </div>
              </Link>

              {isOwner && (
                <ModalConfirm
                  onOk={onDelete}
                  okButtonProps={{ loading: isPending }}
                >
                  <Button
                    variant="text"
                    size="icon"
                    className="text-white hover:text-white/80"
                  >
                    <Trash />
                  </Button>
                </ModalConfirm>
              )}
            </div>
          )}

          <div className="absolute bottom-2 left-2 z-1000">
            <Button
              variant="text"
              size="icon"
              className="text-white hover:text-white/80"
              onClick={() => setIsViewersOpen(true)}
              disabled={!currentStoryId}
            >
              <User className="size-4" />
              {viewersQuery.isLoading ? (
                <Skeleton className="h-4 w-4 rounded-sm" />
              ) : (
                <Typography.Text className="text-sm font-medium">
                  {viewersCount}
                </Typography.Text>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <StoryViewersModal
        open={isViewersOpen}
        onOpenChange={setIsViewersOpen}
        title={t('viewers')}
        storyId={currentStoryId}
      />
    </>
  )
}
