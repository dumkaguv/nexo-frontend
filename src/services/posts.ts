import { ApiRoutes } from './apiRoutes'
import { axiosInstance } from './axiosInstance'

import type { ApiResponse, Post } from '@/types'

export const fetchAllPosts = async () =>
  (await axiosInstance.get<ApiResponse<Post[]>>(ApiRoutes.posts.base)).data

export const fetchPostById = async (postId: number) =>
  (await axiosInstance.get<ApiResponse<Post>>(ApiRoutes.posts.byId(postId)))
    .data

type CreatePostPayload = {
  content: string
}

export const createPost = async (payload: CreatePostPayload) =>
  (await axiosInstance.post<ApiResponse<Post>>(ApiRoutes.posts.base, payload))
    .data

type UpdatePostPayload = {
  content: string
}

export const updatePost = async (postId: number, payload: UpdatePostPayload) =>
  (
    await axiosInstance.put<ApiResponse<Post>>(
      ApiRoutes.posts.byId(postId),
      payload
    )
  ).data

export const deletePost = async (postId: number) =>
  (await axiosInstance.delete<ApiResponse>(ApiRoutes.posts.byId(postId))).data
