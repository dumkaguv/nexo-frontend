import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { profileControllerMeDetailedOptions } from '@/shared/api'
import { getAccessToken } from '@/shared/lib'

import { useAuthStore } from './authStore'

export const useProtectedRoute = () => {
  const { setUser, setIsUserLoading } = useAuthStore()

  const token = getAccessToken()
  const isAuth = !!token

  const { data: user, isPending: isPendingUser } = useQuery({
    ...profileControllerMeDetailedOptions(),
    enabled: isAuth
  })

  useEffect(() => {
    setIsUserLoading(isPendingUser)
  }, [isPendingUser, setIsUserLoading])

  useEffect(() => {
    if (user?.data?.user) {
      setUser(user?.data.user)
    }
  }, [user?.data?.user, setUser])

  return isAuth
}
