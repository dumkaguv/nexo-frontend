import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import { userControllerFindOneOptions } from '@/api'
import { Card } from '@/components/shared'
import { Separator, Sidebar as SidebarUi } from '@/components/ui'
import { MainInfo, MyPosts, Sidebar } from '@/features/user/components'
import { useAuthStore } from '@/stores'

export const UserPage = () => {
  const { user, isPendingUser } = useAuthStore()
  const { id } = useParams()

  const isMe = Number(user?.id) === Number(id)
  const { data, isLoading } = useQuery({
    ...userControllerFindOneOptions({ path: { id: String(id) } }),
    enabled: !isMe && !!id && !isPendingUser
  })

  const userData = isMe ? user : data?.data

  if (isLoading || isPendingUser) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
      <Card className="flex w-full flex-col gap-5">
        <MainInfo userData={userData} isLoading={isLoading} />

        <div>Stories...</div>

        {isMe && (
          <>
            <Separator />

            <MyPosts />
          </>
        )}
      </Card>

      <SidebarUi className="w-full lg:max-w-85" bodyClassName="items-start">
        <Sidebar userData={userData} />
      </SidebarUi>
    </div>
  )
}
