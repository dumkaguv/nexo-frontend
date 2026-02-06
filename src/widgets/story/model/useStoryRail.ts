import { useQuery, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'

import { useAuthStore } from '@/entities/session'
import {
  storyControllerFindAllOptions,
  storyControllerFindAllQueryKey,
  storyControllerFindAllByUserIdOptions,
  storyControllerFindAllByUserIdQueryKey,
  storyControllerFindOneOptions,
  type ResponseStoryDto,
  type ResponseUserDto,
  type ResponseUserProfileDto,
  type StoryControllerFindAllResponse,
  type StoryControllerFindAllByUserIdResponse
} from '@/shared/api'

import type { StoryItem } from '../types'

type Props = {
  user?: ResponseUserProfileDto | ResponseUserDto
  mode?: 'user' | 'all'
}

const defaultStorySize = {
  width: 360,
  height: 640
}

const storyAspectRatio = defaultStorySize.width / defaultStorySize.height

const getViewportSize = () => ({
  width: window.innerWidth,
  height: window.innerHeight
})

const getStoryUrl = (story: ResponseStoryDto) =>
  story.previewUrl || story.files?.[0]?.url || ''

export const useStoryRail = ({ user, mode: modeProp }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [locallyViewedIds, setLocallyViewedIds] = useState<Set<number>>(
    () => new Set()
  )

  const [viewportSize, setViewportSize] = useState(() => {
    if (typeof window === 'undefined') {
      return defaultStorySize
    }

    return getViewportSize()
  })

  const queryClient = useQueryClient()

  const { user: authUser } = useAuthStore()

  useEffect(() => {
    const onResize = () => setViewportSize(getViewportSize())

    window.addEventListener('resize', onResize)

    return () => window.removeEventListener('resize', onResize)
  }, [])

  const userId = user?.id
  const mode: Props['mode'] = modeProp ?? (userId ? 'user' : 'all')

  const allStoriesQuery = useQuery({
    ...storyControllerFindAllOptions({ query: { ordering: '-createdAt' } }),
    enabled: mode === 'all'
  })

  const userStoriesQuery = useQuery({
    ...storyControllerFindAllByUserIdOptions({
      path: { userId: String(userId ?? '') },
      query: { ordering: '-createdAt' }
    }),
    enabled: mode === 'user' && !!userId
  })

  const data = mode === 'all' ? allStoriesQuery.data : userStoriesQuery.data
  const isLoading =
    mode === 'all' ? allStoriesQuery.isLoading : userStoriesQuery.isLoading

  const storyItems = useMemo<StoryItem[]>(() => {
    const stories = data?.data ?? []

    return stories
      .map((story) => ({
        id: story.id,
        url: getStoryUrl(story),
        header: {
          heading: story.user.username,
          subheading: dayjs(story.createdAt).format('MMM D, HH:mm'),
          profileImage: story.user.profile.avatar?.url ?? '',
          userId: story.user.id
        },
        story,
        isViewed:
          story.user.id === authUser?.id ||
          story.isViewed ||
          locallyViewedIds.has(story.id)
      }))
      .filter((item) => item.url)
  }, [authUser?.id, data?.data, locallyViewedIds])

  const storySize = useMemo(() => {
    const maxHeight = Math.min(
      defaultStorySize.height,
      Math.floor(viewportSize.height * 0.9)
    )
    const maxWidth = Math.min(
      defaultStorySize.width,
      Math.floor(viewportSize.width * 0.9)
    )
    let height = maxHeight
    let width = Math.round(height * storyAspectRatio)

    if (width > maxWidth) {
      width = maxWidth
      height = Math.round(width / storyAspectRatio)
    }

    return { width, height }
  }, [viewportSize.height, viewportSize.width])

  const hasStories = storyItems.length > 0

  const onOpen = (index: number) => {
    setCurrentIndex(index)
    setIsOpen(true)
  }

  const onOpenChange = (nextOpen: boolean) => {
    setIsOpen(nextOpen)
    if (!nextOpen) {
      setIsPaused(false)
    }
  }

  const onPointerDown = () => setIsPaused(true)
  const onPointerUp = () => setIsPaused(false)

  const markStoryViewed = (storyId: number) => {
    setLocallyViewedIds((prev) => {
      const next = new Set(prev)

      next.add(storyId)

      return next
    })

    if (mode === 'all') {
      const queryKey = storyControllerFindAllQueryKey({
        query: { ordering: '-createdAt' }
      })

      queryClient.setQueryData(
        queryKey,
        (old?: StoryControllerFindAllResponse) => {
          if (!old?.data) {
            return old
          }

          return {
            ...old,
            data: old.data.map((story) =>
              story.id === storyId ? { ...story, isViewed: true } : story
            )
          }
        }
      )

      return
    }

    const queryKey = storyControllerFindAllByUserIdQueryKey({
      path: { userId: String(userId) },
      query: { ordering: '-createdAt' }
    })

    queryClient.setQueryData(
      queryKey,
      (old?: StoryControllerFindAllByUserIdResponse) => {
        if (!old?.data) {
          return old
        }

        return {
          ...old,
          data: old.data.map((story) =>
            story.id === storyId ? { ...story, isViewed: true } : story
          )
        }
      }
    )
  }

  const onStoryStart = (index: number) => {
    const storyItem = storyItems[index]

    if (!storyItem) {
      return
    }

    const storyId = storyItem.id

    setTimeout(() => {
      markStoryViewed(storyId)

      void queryClient
        .fetchQuery({
          ...storyControllerFindOneOptions({
            path: { id: String(storyId) }
          })
        })
        .catch(() => undefined)
    }, 0)
  }

  return {
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
  }
}
