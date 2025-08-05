import type { User } from "./User";

export type PostComment = {
  commentId: number;
  postId: number;
  userId: number;
  content: string;
  createdAt: string;
  user?: User;
};
