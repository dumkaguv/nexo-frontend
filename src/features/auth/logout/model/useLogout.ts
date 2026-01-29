import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { useAuthStore } from '@/entities/session'
import { authControllerLogoutMutation } from '@/shared/api'
import { paths } from '@/shared/config'
import { useWebSocket } from '@/shared/hooks'
import { showApiErrors, clearAccessToken } from '@/shared/lib'

export const useLogout = () => {
  const { setUser } = useAuthStore()

  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const { disconnect } = useWebSocket()

  return useMutation({
    ...authControllerLogoutMutation(),
    onSuccess: async () => {
      clearAccessToken()
      setUser(undefined)
      await queryClient.cancelQueries()
      disconnect()
      queryClient.clear()
      toast.success(t('logoutSuccess'))
      void navigate(paths.auth.login)
    },
    onError: (e) => showApiErrors(e)
  })
}
