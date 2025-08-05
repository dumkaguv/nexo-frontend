import type { PostFile, PostLike, PostComment, User } from ".";

export type Post = {
  postId: number;
  content: string;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author?: User;
  files?: PostFile[];
  likes?: PostLike[];
  comments?: PostComment[];
};
