import toast from 'react-hot-toast'

import { i18n } from '@/config'

import type { ApiResponse } from '@/types'
import type { AxiosError } from 'axios'

export const handleMutationError = (error: unknown, message?: string) => {
  const axiosError = error as AxiosError<ApiResponse>
  toast.error(
    axiosError.response?.data.message ?? message ?? i18n.t('error.generic')
  )

  console.log(error)
}
