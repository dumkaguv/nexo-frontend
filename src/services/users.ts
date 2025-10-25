import { ApiRoutes } from './apiRoutes'
import { axiosInstance } from './axiosInstance'

import type { ApiResponse, User } from '@/types'

export const getUserByUserOrFullName = async (name: string) => {
  return (
    await axiosInstance.get<ApiResponse<User[]>>(Apipaths.users.base, {
      params: { name }
    })
  ).data
}

export const getUserById = async (id: number) => {
  return (
    await axiosInstance.get<ApiResponse<User>>(`${Apipaths.users.base}/${id}`)
  ).data
}

type UpdateUserPayload = Partial<Omit<User, 'following' | 'followers'>>

export const updateUser = async (payload: UpdateUserPayload) => {
  return (
    await axiosInstance.patch<ApiResponse<User>>(Apipaths.users.base, payload)
  ).data
}

type ChangePasswordPayload = {
  currentPassword: string
  newPassword: string
}

export const changePassword = async (payload: ChangePasswordPayload) => {
  return (
    await axiosInstance.put<ApiResponse>(Apipaths.users.changePassword, payload)
  ).data
}
