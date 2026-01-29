import { toast } from 'sonner'

import { i18n } from '@/shared/config'

import type { AxiosError } from 'axios'

export const showApiErrors = (error: unknown, message?: string) => {
  const axiosError = error as AxiosError<Error>

  toast.error(axiosError.response?.data.message ?? message ?? i18n.t('generic'))
}
