import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { profileControllerMeDetailedOptions } from '@/api'
import { useAuthStore } from '@/stores'
import { getAccessToken } from '@/utils'

export const useProtectedRoute = () => {
  const { setUser, setIsPendingUser } = useAuthStore()

  const token = getAccessToken()
  const isAuth = !!token

  const { data: user, isPending: isPendingUser } = useQuery({
    ...profileControllerMeDetailedOptions(),
    enabled: isAuth
  })

  useEffect(() => {
    setIsPendingUser(isPendingUser)
  }, [isPendingUser, setIsPendingUser])

  useEffect(() => {
    if (user?.data?.user) {
      setUser(user?.data.user)
    }
  }, [user?.data?.user, setUser])

  return isAuth
}
