import type { StoryHeader } from './StoryHeader'
import type { ResponseStoryDto } from '@/shared/api'

export type StoryItem = {
  id: number
  url: string
  header: StoryHeader
  story: ResponseStoryDto
  isViewed: boolean
}
