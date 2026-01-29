import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import { useAuthStore } from '@/entities/session'
import { userControllerFindOneOptions } from '@/shared/api'
import { UserPageContent } from '@/widgets/user'

export const UserPage = () => {
  const { user, isUserLoading } = useAuthStore()
  const { id } = useParams()

  const isMe = Number(user?.id) === Number(id)
  const { data, isLoading } = useQuery({
    ...userControllerFindOneOptions({ path: { id: String(id) } }),
    enabled: !isMe && !!id && !isUserLoading
  })

  const userData = isMe ? user : data?.data

  return (
    <UserPageContent
      userData={userData}
      isLoading={isLoading || isUserLoading}
      isMe={isMe}
    />
  )
}
