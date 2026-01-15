import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type AxiosError
} from 'axios'

import { paths } from '@/config'
import { getAccessToken, saveAccessToken, clearAccessToken } from '@/utils'

import type { BaseResponseDto, ResponseRefreshDto } from '@/api'

const baseURL = import.meta.env.VITE_PUBLIC_API_URL as string | undefined

if (!baseURL) {
  throw new Error('Missing VITE_PUBLIC_API_URL')
}

const refreshUrl = `${baseURL}/api/auth/refresh`

type Client = {
  instance: AxiosInstance
}

type RetryConfig = { _retry?: boolean }

export const getConfigInterceptors = (axiosInstance: Client['instance']) => {
  axiosInstance.interceptors.request.use((config) => {
    const accessToken = getAccessToken()

    config.headers.Authorization = `Bearer ${accessToken}`

    return config
  })

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse<ResponseRefreshDto>) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as
        | (typeof error.config & RetryConfig)
        | undefined

      if (
        originalRequest &&
        error.response?.status === 401 &&
        !originalRequest?._retry
      ) {
        originalRequest._retry = true

        try {
          const response = await axios.post<
            BaseResponseDto & ResponseRefreshDto
          >(refreshUrl, {}, { withCredentials: true })

          const newAccessToken = response.data?.data.accessToken as
            | string
            | undefined

          if (!newAccessToken) {
            clearAccessToken()

            return (window.location.href = paths.auth.login)
          }

          saveAccessToken(newAccessToken)

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

          return await axiosInstance(originalRequest)
        } catch (err) {
          if (err instanceof Error) {
            return Promise.reject(err)
          }

          return Promise.reject(new Error(String(err)))
        }
      }

      return Promise.reject(error)
    }
  )
}
