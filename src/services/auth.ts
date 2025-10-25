import { ApiRoutes } from './apiRoutes'
import { axiosInstance } from './axiosInstance'

import type { ApiResponse, AuthResponse } from '@/types'

export type RegistrationPayload = {
  email: string
  password: string
  userName: string
  fullName: string
}

export const register = async (payload: RegistrationPayload) => {
  return (
    await axiosInstance.post<ApiResponse<AuthResponse>>(
      Apipaths.auth.registration,
      payload
    )
  ).data
}

export type LoginPayload = {
  email: string
  password: string
}

export const login = async (payload: LoginPayload) => {
  return (
    await axiosInstance.post<ApiResponse<AuthResponse>>(
      Apipaths.auth.login,
      payload
    )
  ).data
}

export const logout = async () => {
  return (await axiosInstance.post<ApiResponse>(Apipaths.auth.logout)).data
}

export const refresh = async () => {
  return (
    await axiosInstance.get<ApiResponse<AuthResponse>>(Apipaths.auth.logout)
  ).data
}
