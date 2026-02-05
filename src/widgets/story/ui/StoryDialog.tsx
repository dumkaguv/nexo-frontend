import { Trash } from 'lucide-react'
import Stories from 'react-insta-stories'
import { Link } from 'react-router-dom'

import { useAuthStore } from '@/entities/session'
import { useDeleteStory } from '@/features/story'
import { paths } from '@/shared/config'
import { Image, ModalConfirm, Typography } from '@/shared/ui'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  Button
} from '@/shared/ui/shadcn'

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

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="overflow-hidden bg-black p-0 max-lg:p-0"
        classNameCloseButton="text-white"
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
        <DialogDescription className="sr-only">{description}</DialogDescription>
        <Stories
          stories={storyItems.map((item) => ({
            url: item.url,
            header: item.header
          }))}
          width={storySize.width}
          height={storySize.height}
          header={(header: StoryItem['header']) => (
            <div className="z-1000! flex items-center justify-between gap-3 text-white">
              <Link
                to={paths.user.byId(header.userId)}
                onClick={() => onOpenChange(false)}
                className="flex items-center gap-3"
              >
                {header.profileImage ? (
                  <Image
                    src={header.profileImage}
                    alt={header.heading}
                    className="size-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="size-10 rounded-full bg-white/10" />
                )}
                <div className="flex flex-col">
                  <Typography.Text className="text-sm font-semibold">
                    {header.heading}
                  </Typography.Text>
                  <Typography.Text className="text-xs text-white/70">
                    {header.subheading}
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
          currentIndex={currentIndex}
          onStoryStart={onStoryStart}
          onAllStoriesEnd={() => onOpenChange(false)}
          keyboardNavigation
          defaultInterval={8000}
          preventDefault
          isPaused={isPaused}
          storyInnerContainerStyles={{ position: 'relative' }}
          storyStyles={{
            position: 'absolute',
            inset: '20% 0 0 0',
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
