import type { Follower, Following } from '.'

export type User = {
  userId: number
  email: string
  isActivated: boolean
  createdAt: string
  updatedAt: string
  activatedAt: string
  followers?: Follower[]
  following?: Following[]
}
