import type { MessageFile, User } from '.'

export type Message = {
  messageId: number
  senderId: number
  receiverId: number
  content?: string | null
  createdAt: string
  readAt?: string | null
  sender?: User
  receiver?: User
  files?: MessageFile[]
}
