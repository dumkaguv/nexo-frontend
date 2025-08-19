import type { Profile, Token, User } from '.'

export type AuthResponse = {
  tokens: Token
  user: User
  profile: Profile
}
