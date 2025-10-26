import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { profileControllerMeOptions } from '@/api'
import { useAuthStore } from '@/stores'
import { getAccessToken } from '@/utils'

export const useProtectedRoute = () => {
  const { setUser, setIsPendingUser } = useAuthStore()

  const token = getAccessToken()
  const isAuth = !!token

  const { data: user, isPending: isPendingUser } = useQuery({
    ...profileControllerMeOptions(),
    enabled: isAuth
  })

  useEffect(() => {
    setIsPendingUser(isPendingUser)
  }, [isPendingUser, setIsPendingUser])

  useEffect(() => {
    if (user?.data) {
      setUser(user.data)
    }
  }, [user?.data, setUser])

  return isAuth
}
