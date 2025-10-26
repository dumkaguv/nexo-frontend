import axios, { type AxiosInstance } from 'axios'

import { LocalStorage, paths } from '@/config'
import { getAccessToken, saveAccessToken } from '@/utils'

import type { RefreshResponseDto } from '@/api'
import type { AxiosResponse } from 'axios'

const baseURL = import.meta.env.VITE_PUBLIC_API_URL

type Client = {
  instance: AxiosInstance
}

export const getConfigInterceptors = (axiosInstance: Client['instance']) => {
  axiosInstance.interceptors.request.use((config) => {
    const accessToken = getAccessToken()
    config.headers.Authorization = `Bearer ${accessToken}`

    return config
  })

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse<RefreshResponseDto>) => response,
    async (error) => {
      const originalRequest = error.config

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true

        try {
          const response = await axios.post(
            baseURL + '/api/auth/refresh',
            {},
            { withCredentials: true }
          )

          const newAccessToken = response.data?.data.accessToken
          if (!newAccessToken) {
            localStorage.removeItem(LocalStorage.token)
            return (window.location.href = paths.auth.login)
          }
          saveAccessToken(newAccessToken)

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
          return axiosInstance(originalRequest)
        } catch (err) {
          return Promise.reject(err)
        }
      }

      return Promise.reject(error)
    }
  )
}
