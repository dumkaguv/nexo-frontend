/* eslint-disable i18next/no-literal-string */

import { useQuery } from '@tanstack/react-query'
import { Navigate, useParams } from 'react-router-dom'

import { userControllerFindOneOptions } from '@/api'
import { Card, Typography } from '@/components/shared'
import { paths } from '@/config'

export const ActivateAccountPage = () => {
  const { userId } = useParams<{ userId?: string }>()

  const { data: user } = useQuery({
    ...userControllerFindOneOptions({ path: { id: String(userId) } }),
    enabled: !!userId,
    refetchInterval: 3000,
    refetchOnWindowFocus: true,
    refetchIntervalInBackground: true,
    staleTime: 0
  })

  if (user?.data.isActivated) {
    return <Navigate to={paths.home.root} />
  }

  return (
    <Card className="max-w-96">
      <Typography.Title level={1}>
        Hey, we've just sent you activation link on your email. Please follow up
        link and activate account.
      </Typography.Title>
    </Card>
  )
}
