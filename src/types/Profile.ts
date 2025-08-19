export type Profile = {
  profileId: number
  userRef: number
  fullName: string
  userName: string
  avatarUrl?: string
  birthDay?: string | Date | null
  phone?: string
  biography?: string
  updatedAt: string
  createdAt: string
}
