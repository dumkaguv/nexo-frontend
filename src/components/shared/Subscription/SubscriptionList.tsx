import { useQuery } from '@tanstack/react-query'

import { Link, useParams } from 'react-router-dom'

import {
  subscriptionControllerFindAllFollowersOptions,
  subscriptionControllerFindAllFollowingOptions
} from '@/api'

import { Card } from '@/components/shared'
import { paths } from '@/config'
import { useAuthStore } from '@/stores'

import { SubscriptionListEmpty } from './SubscriptionListEmpty'
import { SubscriptionListItem } from './SubscriptionListItem'
import { SubscriptionListSkeleton } from './SubscriptionListSkeleton'

type Props = {
  isFollowersTab?: boolean
}

export const SubscriptionList = ({ isFollowersTab = true }: Props) => {
  const { user } = useAuthStore()

  const { id: userIdParam } = useParams()

  const userId = userIdParam ? String(userIdParam) : String(user?.id)
  const { data: followers, isLoading: isLoadingFollowers } = useQuery({
    ...subscriptionControllerFindAllFollowersOptions({ path: { id: userId } }),
    enabled: isFollowersTab
  })

  const { data: following, isLoading: isLoadingFollowing } = useQuery({
    ...subscriptionControllerFindAllFollowingOptions({ path: { id: userId } }),
    enabled: !isFollowersTab
  })

  if (isLoadingFollowers || isLoadingFollowing) {
    return (
      <Card className="bg-card">
        <SubscriptionListSkeleton />
      </Card>
    )
  }

  if (
    (isFollowersTab && followers?.total === 0) ||
    (!isFollowersTab && following?.total === 0)
  ) {
    return <SubscriptionListEmpty isFollowersTab={isFollowersTab} />
  }

  const data = isFollowersTab ? followers : following
  console.log(data)

  return (
    <Card className="bg-card">
      <ul className="flex flex-col gap-4">
        {data?.data.map((record) => (
          <Link
            to={paths.user.byId(record.user.id)}
            className="hover:cursor-pointer"
          >
            <SubscriptionListItem
              data={record}
              isFollowersTab={isFollowersTab}
            />
          </Link>
        ))}
      </ul>
    </Card>
  )
}
