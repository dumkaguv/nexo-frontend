import { useQuery } from '@tanstack/react-query'
import { Navigate, useParams } from 'react-router-dom'

import { Card, Typography } from '@/components/shared'
import { QueryKeys, Routes } from '@/config'
import { Api } from '@/services/apiClient'

const { Title } = Typography

export const ActivateAccountPage = () => {
  const { userId } = useParams<{ userId?: string }>()

  const { data: user } = useQuery({
    queryKey: [QueryKeys.Users.byId, userId],
    queryFn: () => Api.users.getUserById(Number(userId)),
    enabled: !!userId,
    refetchInterval: 3000,
    refetchOnWindowFocus: true,
    refetchIntervalInBackground: true,
    staleTime: 0
  })

  const isActivated = user?.data?.isActivated
  if (isActivated) {
    return <Navigate to={paths.home} />
  }

  return (
    <Card className="max-w-96">
      <Title level={1}>
        Hey, we've just sent you activation link on your email. Please follow up
        link and activate account.
      </Title>
    </Card>
  )
}
