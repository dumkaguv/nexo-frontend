import { ApiRoutes } from "./apiRoutes";
import { axiosInstance } from "./axiosInstance";

export const fetchAllPosts = async () =>
  (await axiosInstance.get(ApiRoutes.posts.base)).data;

export const fetchPostById = async (postId: number) =>
  (await axiosInstance.get(ApiRoutes.posts.byId(postId))).data;

type CreatePostPayload = {
  content: string;
};

export const createPost = async (payload: CreatePostPayload) =>
  (await axiosInstance.post(ApiRoutes.posts.base, payload)).data;

type UpdatePostPayload = {
  content: string;
};

export const updatePost = async (postId: number, payload: UpdatePostPayload) =>
  (await axiosInstance.put(ApiRoutes.posts.byId(postId), payload)).data;

export const deletePost = async (postId: number) =>
  (await axiosInstance.delete(ApiRoutes.posts.byId(postId))).data;
