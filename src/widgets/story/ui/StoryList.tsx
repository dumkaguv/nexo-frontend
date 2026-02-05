import { Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { cn } from '@/shared/lib'
import { Image, Typography } from '@/shared/ui'

import type { StoryItem } from '../types'

type Props = {
  items: StoryItem[]
  onOpen: (index: number) => void
  onCreate?: () => void
  showCreate?: boolean
}

export const StoryList = ({ items, onOpen, onCreate, showCreate }: Props) => {
  const { t } = useTranslation()

  return (
    <ul className="flex gap-3 overflow-x-auto p-1">
      {showCreate && (
        <li className="cursor-pointer">
          <button
            type="button"
            className="group flex cursor-pointer flex-col items-center gap-1"
            onClick={onCreate}
          >
            <div className="ring-offset-background bg-muted ring-primary flex size-16 items-center justify-center overflow-hidden rounded-full ring-2 ring-offset-2 transition max-lg:size-14">
              <Plus className="size-5" />
            </div>
            <Typography.Text className="max-w-16 truncate text-xs">
              {t('addStory')}
            </Typography.Text>
          </button>
        </li>
      )}
      {items.map((item, index) => {
        const ringClass = item.isViewed ? 'ring-border' : 'ring-primary'

        return (
          <li key={item.id} className="cursor-pointer">
            <button
              type="button"
              className="group flex cursor-pointer flex-col items-center gap-1"
              onClick={() => onOpen(index)}
            >
              <div
                className={cn(
                  'ring-offset-background size-16 overflow-hidden rounded-full ring-2 ring-offset-2 transition max-lg:size-14',
                  ringClass
                )}
              >
                <Image
                  src={item.url}
                  alt={`${item.story.user.username} story`}
                  className="size-full object-cover transition group-hover:scale-105"
                />
              </div>
              <Typography.Text className="max-w-16 truncate text-xs">
                {item.story.user.username}
              </Typography.Text>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
