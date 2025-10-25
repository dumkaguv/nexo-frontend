import { ApiRoutes } from './apiRoutes'
import { axiosInstance } from './axiosInstance'

import type { ApiResponse, Profile } from '@/types'

export const uploadAvatar = async (file: File) => {
  const formData = new FormData()
  formData.append('avatar', file)

  return (
    await axiosInstance.put<ApiResponse<Profile>>(
      Apipaths.upload.avatar,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
  ).data
}
