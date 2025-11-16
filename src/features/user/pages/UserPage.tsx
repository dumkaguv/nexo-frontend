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
    <div className="flex gap-10">
      <Card className="flex w-full flex-col gap-8">
        <MainInfo userData={userData} isMe={isMe} />

        <div>Stories...</div>

        <Separator />

        <MyPosts />
      </Card>

      <SidebarUi className="w-full max-w-[310px]" bodyClassName="items-start">
        <Sidebar userData={userData} />
      </SidebarUi>
    </div>
  )
}
