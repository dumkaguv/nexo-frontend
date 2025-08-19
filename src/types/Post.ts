import type { PostComment, PostFile, PostLike, Profile } from '.'

export type Post = {
  postId: number
  content: string
  authorId: number
  createdAt: string
  updatedAt: string
  author?: { profile: Profile }
  files?: PostFile[]
  likes?: PostLike[]
  comments?: PostComment[]
}
