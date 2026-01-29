import { Card } from '@/shared/ui'
import { Separator, Sidebar as SidebarUi } from '@/shared/ui/shadcn'

import { MainInfo } from './MainInfo'
import { MyPosts } from './MyPosts'
import { Sidebar } from './Sidebar'

import { UserPageSkeleton } from './UserPageSkeleton'

import type { ResponseUserDto } from '@/shared/api'

type Props = {
  userData?: ResponseUserDto
  isLoading?: boolean
  isMe?: boolean
}

export const UserPageContent = ({ userData, isLoading, isMe }: Props) => {
  if (isLoading) {
    return <UserPageSkeleton showMyPosts={!!isMe} />
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
