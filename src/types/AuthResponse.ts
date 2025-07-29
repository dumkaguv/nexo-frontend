import type { Token, Profile, User } from ".";

export type AuthResponse = {
  tokens: Token;
  user: User;
  profile: Profile;
};
