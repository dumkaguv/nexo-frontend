import axios, { type AxiosInstance, type AxiosResponse } from 'axios'

import { paths } from '@/config'
import { getAccessToken, saveAccessToken } from '@/utils'
import { clearAccessToken } from '@/utils/clearAccessToken'

import type { ResponseRefreshDto } from '@/api'

const baseURL = import.meta.env.VITE_PUBLIC_API_URL

if (!baseURL) {
  throw new Error('Missing VITE_PUBLIC_API_URL')
}
const refreshUrl = `${baseURL}/api/auth/refresh`

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
    (response: AxiosResponse<ResponseRefreshDto>) => response,
    async (error) => {
      const originalRequest = error.config

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true

        try {
          const response = await axios.post(
            refreshUrl,
            {},
            { withCredentials: true }
          )

          const newAccessToken = response.data?.data.accessToken

          if (!newAccessToken) {
            clearAccessToken()

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
