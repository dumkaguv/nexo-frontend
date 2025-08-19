import { ApiRoutes } from './apiRoutes'
import { axiosInstance } from './axiosInstance'

import type { ApiResponse, Profile } from '@/types'

export const getProfile = async () => {
  return (await axiosInstance.get<ApiResponse<Profile>>(ApiRoutes.profile.base))
    .data
}

type UpdateProfilePayload = Partial<Profile>

export const updateProfile = async (payload: UpdateProfilePayload) => {
  return (
    await axiosInstance.patch<ApiResponse<Profile>>(
      ApiRoutes.profile.base,
      payload
    )
  ).data
}
